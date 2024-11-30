"use client";
import { apiRouteHandlerAdapter } from "apiRouteHandler";
import Counter from "components/Counter";
import _ from "lodash";
import React, {
  createContext,
  useState,
  useMemo,
  useContext,
  useRef,
} from "react";
import { useCookies } from "react-cookie";
import {
  CalculateOrderRequest,
  CatalogImage,
  Error as SquareError,
  Order,
  OrderLineItem,
  CatalogObject,
} from "square";
import { CartContextType } from "index";
import { useDebouncedCallback } from "use-debounce";
import { doesContextExist } from "util/";
import { Simplify } from "prismicio-types";

type CartState = {
  order: Order;
  options?: CatalogObject[];
  errors: SquareError[];
};

type ModifiedCartData = {
  lineItems?: OrderLineItem[];
  fieldsToClear?: string[];
  lineItemImageData?: { [id: string]: CatalogImage };
};
type OrUndefined<T> = T | undefined;

export const CartContext = createContext<CartContextType | null>(null);

const CartProvider = ({
  data: { _cart, _options } = { _cart: { locationId: "" }, _options: [] },
  images: cartImageMap,
  children,
}: {
  children: any;
  images: Simplify<CatalogImage>;
  data?: {
    _options: CatalogObject[];
    _cart?: Order;
  }
}) => {
  const [cookies, setCookie] = useCookies();
  const [openCart, setOpenCart] = useState<boolean>(false);
  const [cartItemImages, setCartItemImages] =
    useState<Simplify<CatalogImage>>(cartImageMap);
  const initialCart = {
    id: cookies.cartId,
    lineItems: [],
    locationId: "",
  };
  const [{ order: cart, options, errors }, setCart] = useState<CartState>({
    order: _cart || initialCart,
    options: _options,
    errors: [],
  });

  const drawerRef = useRef(null);
  const handleDrawerToggle = (e: any, bool = !openCart) => {
    setOpenCart(bool);
  };

  const calculateCart = (req: CalculateOrderRequest) => {
    if (cart?.id) {
      apiRouteHandlerAdapter({
        method: "POST",
        url: `/api/cart/calculate`,
        payload: req,
      }).then((data) => {
        populateCartAndImages(data, cartItemImages);
      });
    }
  };

  const updateCart = ({
    lineItems,
    fieldsToClear,
    lineItemImageData,
  }: ModifiedCartData = {}) => {
    if (cart.id) {
      const body = {
        orderId: cart.id,
        order: {
          version: cart.version,
          lineItems: lineItems,
        },
        fieldsToClear,
      };
      apiRouteHandlerAdapter({
        method: "PUT",
        url: `/api/cart`,
        payload: body,
      }).then((data) => {
        populateCartAndImages(data, lineItemImageData);
      });
    } else {
      createCart(lineItems, lineItemImageData, false);
    }
  };

  const createCart = (
    catalogOrder: any,
    lineItemImageData?: { [id: string]: CatalogImage },
    checkout?: boolean
  ) => {
    const state = checkout ? "OPEN" : "DRAFT";
    apiRouteHandlerAdapter({
      method: "POST",
      url: `/api/cart`,
      payload: { order: { state, lineItems: catalogOrder } },
    }).then((data) => {
      if (data.order) {
        setCookie("cartId", data.order.id, {
          path: "/",
        });
      }
      populateCartAndImages(data, lineItemImageData);
    });
  };

  const populateCartAndImages = (
    { order, options, errors = [] }: { order: Order; options: CatalogObject[], errors: SquareError[] },
    lineItemImageData: Simplify<CatalogImage> = {}
  ): void => {
    setCart({ order, options, errors });
    setCartItemImages(lineItemImageData);
  };

  return (
    <CartContext.Provider
      //@ts-ignore
      value={useMemo(
        () => ({
          cart,
          options,
          cartItemImages,
          drawerRef,
          handleDrawerToggle,
          updateCart,
          createCart,
          calculateCart,
          toggleCartOverlay: [openCart, setOpenCart],
        }),
        [cart, cartItemImages, openCart]
      )}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartModifier = () => {
  const { cart, updateCart, cartItemImages } =
    doesContextExist<CartContextType>(useContext(CartContext));
  const debounced = useDebouncedCallback(
    (
      quantity: number,
      lineItem: OrderLineItem,
      lineItemImageData?: CatalogImage
    ) => {
      modifyCart(
        { ...lineItem, quantity: quantity.toString() },
        lineItemImageData,
        quantity === 0
      );
    },
    1500
  );

  const addCartItem = (
    lineItem: OrderLineItem,
    lineItemImageData?: CatalogImage
  ): {
    lineItems: OrderLineItem[];
    fieldsToClear?: undefined;
    lineItemImageData?: { [id: string]: CatalogImage };
  } => {
    const lineItems = cart.lineItems ?? [];
    return {
      lineItems: lineItems.concat(lineItem),
      fieldsToClear: undefined,
      lineItemImageData: {
        ...cartItemImages,
        [lineItem.catalogObjectId ?? ""]: lineItemImageData ?? {},
      },
    }
  };

  const deleteCartItem = (
    lineItemUid: string
  ): {
    lineItems: undefined;
    fieldsToClear?: string[];
    lineItemImageData?: { [id: string]: CatalogImage };
  } => {
    const lineItems = undefined;
    const fieldsToClear = [`line_items[${lineItemUid}]`];
    const key =
      cart.lineItems?.find((item) => item.uid == lineItemUid)
        ?.catalogObjectId ?? "";
    const lineItemImageData = {
      ...cartItemImages,
    };

    delete lineItemImageData[key];
    return { lineItems, fieldsToClear, lineItemImageData };
  };

  const modifyCartItem = (
    existingCartItemIndex: number,
    newCartItem: OrderLineItem
  ): {
    lineItems: OrderLineItem[];
    fieldsToClear?: string[];
    lineItemImageData?: { [id: string]: CatalogImage };
  } | undefined => {
    if (!Array.isArray(cart.lineItems)) {
      throw new Error("Cart line items must be an Array!");
    }

    const lineItems = [...cart.lineItems];
    const existingCartItem = lineItems[existingCartItemIndex];

    const mergedCartItem = {
      ...existingCartItem,
      ...newCartItem,
    };

    if (_.isEqual(mergedCartItem, existingCartItem)) {
      console.log("No changes in merged cart item!");
      return;
    }

    lineItems[existingCartItemIndex] = mergedCartItem;

    return { lineItems, fieldsToClear: undefined, lineItemImageData: cartItemImages };
  };

  const modifyCart = (
    lineItem: OrderLineItem,
    lineItemImageData: CatalogImage = {},
    deletion: boolean = false
  ) => {
    let modifiedCartItemData: OrUndefined<ModifiedCartData>;
    const isExistingItemIndex =
      (cart.lineItems?.findIndex((item) => item.uid === lineItem.uid) ?? -1);

    if (deletion)
      modifiedCartItemData = deleteCartItem(lineItem.uid ?? "");
    else if (isExistingItemIndex > -1) {
      modifiedCartItemData = modifyCartItem(isExistingItemIndex, lineItem) ?? undefined;
    } else
      modifiedCartItemData = addCartItem(lineItem, lineItemImageData);

    if (modifiedCartItemData === undefined) return false

    updateCart(modifiedCartItemData);
  };

  return {
    cart,
    cartItemImages,
    addCartItem,
    deleteCartItem,
    modifyCartItem,
    modifyCart,
    CartQuantityCounter: (
      lineItem: OrderLineItem,
      lineItemImageData?: CatalogImage
    ) => (
      <Counter
        className="p-1 mx-auto"
        allowDeletion={true}
        onCountChange={(quantity: number) =>
          debounced(quantity, lineItem, lineItemImageData)
        }
        count={Number.parseInt(lineItem.quantity)}
      />
    ),
  };
};

export const useCart = () => {
  const currentCart = useContext(CartContext);
  if (!currentCart) {
    throw new Error("Hooks have to be used within Providers");
  }

  return currentCart;
};

export default CartProvider;
