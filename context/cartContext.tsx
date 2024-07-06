"use client";
import { apiRouteHandlerAdapter } from "apiRouteHandler";
import Counter from "components/Counter";
import _ from "lodash";
import React, { createContext, useState, useEffect, useMemo, useContext, useRef } from "react";
import { useCookies } from "react-cookie";
import { CatalogApi, CatalogImage, Order, OrderLineItem } from "square";
import { CartContextType } from "types";
import { useDebounce, useDebouncedCallback } from "use-debounce";
import { getCatalogItemsAndImages } from "api/catalogApi";
import { doesContextExist } from "util/";
import { usePathname } from "next/navigation";


type CartState = {
  order: Order
  errors: Error[]
}

type ModifiedCartData = {
  lineItems: OrderLineItem[],
  fieldsToClear?: string[],
  lineItemImageData?: { [id: string]: CatalogImage }
}
type OrUndefined<T> = T | undefined

export const CartContext = createContext<CartContextType | null>(null);

const CartProvider = ({ _cart, children }: { children: any, _cart?: Order }) => {
  const [cookies, setCookie] = useCookies();
  const [openCart, setOpenCart] = useState<boolean>(false);
  const [cartItemImages, setCartItemImages] = useState<{
    [catalogObjectId: string]: CatalogImage;
  }>({});
  const initialCart = {
    id: cookies.cartId,
    lineItems: [],
    locationId: "",
  }
  const [{ order: cart, errors }, setCart] = useState<CartState>({
    order: _cart || initialCart,
    errors: []
  });

  useEffect(() => {
    if (cart) {
      getCatalogItemsAndImages(cart.lineItems?.map((item) => item.catalogObjectId ?? "") ?? [])
      .then(data => populateCartAndImages({ order: cart, errors: [] }, data));
    }
  }, []);

  const drawerRef = useRef(null);
  const handleDrawerToggle = (e: any, bool = !openCart) => {
    setOpenCart(bool);
  }

  const updateCart = ({
    lineItems,
    fieldsToClear,
    lineItemImageData
  }: ModifiedCartData) => {
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
        payload: body
      }).then(data => {
        populateCartAndImages(data, lineItemImageData);
      })
    } else {
      createCart(lineItems, lineItemImageData, false);
    }
  };

  const createCart = (catalogOrder: any, lineItemImageData?: { [id: string]: CatalogImage }, checkout?: boolean) => {
    const state = checkout ? "OPEN" : "DRAFT";
    apiRouteHandlerAdapter({
      method: "POST",
      url: `/api/cart`,
      payload: { order: { state, lineItems: catalogOrder } }
    }).then(data => {
      if (data.order) {
        setCookie("cartId", data.order.id, {
          path: "/",
        });
      }
      populateCartAndImages(data, lineItemImageData)
    })
  };

  const populateCartAndImages = ({ order, errors = [] }: { order: Order, errors: Error[] }, lineItemImageData: { [id: string]: CatalogImage } = {}) => {
    setCart({ order, errors });
    setCartItemImages(lineItemImageData);
  };

  return (
    <CartContext.Provider

      //@ts-ignore
      value={useMemo(
        () => ({
          cart, cartItemImages,
          drawerRef,
          handleDrawerToggle,
          updateCart,
          createCart,
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
  const { cart, updateCart, cartItemImages } = doesContextExist<CartContextType>(useContext(CartContext));
  const debounced = useDebouncedCallback((quantity: number, lineItem: OrderLineItem, lineItemImageData?: CatalogImage) => {
    modifyCart({ ...lineItem, quantity: quantity.toString() }, lineItemImageData, quantity === 0)
  }, 1500)
  const convertData = ([lineItems, fieldsToClear, lineItemImageData]: [OrUndefined<OrderLineItem[]>, OrUndefined<string[]>, OrUndefined<CatalogImage>]): ModifiedCartData => ({
    lineItems: lineItems as OrderLineItem[],
    fieldsToClear: fieldsToClear as string[],
    lineItemImageData: lineItemImageData as { [id: string]: CatalogImage }
  })

  const addCartItem = (
    lineItem: OrderLineItem,
    lineItemImageData?: CatalogImage
  ): [OrderLineItem[] | undefined, string[] | undefined, CatalogImage | undefined] => {
    const lineItems = cart.lineItems ?? [];
    return [lineItems.concat(lineItem), undefined, { ...cartItemImages, [lineItem.catalogObjectId ?? ""]: lineItemImageData }];
  };

  const deleteCartItem = (lineItemUid: string): [undefined, string[] | undefined, CatalogImage | undefined] => {
    const lineItems = undefined;
    const fieldsToClear = [`line_items[${lineItemUid}]`];
    const key = cart.lineItems?.find((item) => item.uid == lineItemUid)?.catalogObjectId ?? "";
    const lineItemImageData = {
      ...cartItemImages
    };

    delete lineItemImageData[key]
    return [lineItems, fieldsToClear, lineItemImageData]
  };

  const modifyCartItem = (
    existingCartItemIndex: number,
    newCartItem: OrderLineItem
  ): [OrderLineItem[] | undefined, string[] | undefined, CatalogImage | undefined] | any => {
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

    return [lineItems, undefined, cartItemImages];
  };

  const modifyCart = (lineItem: OrderLineItem, lineItemImageData: CatalogImage = {}, deletion: boolean = false) => {
    let modifiedCartItemData: ModifiedCartData;
    const isExistingItemIndex = cart.lineItems?.findIndex((item) => item.uid === lineItem.uid) ?? -1;

    if (deletion)
      modifiedCartItemData = convertData(deleteCartItem(lineItem.uid ?? ""))
    else if (isExistingItemIndex > -1)
      modifiedCartItemData = convertData(modifyCartItem(isExistingItemIndex, lineItem))
    else
      modifiedCartItemData = convertData(addCartItem(lineItem, lineItemImageData))
    //@ts-ignore
    updateCart(modifiedCartItemData)
  }

  return {
    cart,
    cartItemImages,
    addCartItem,
    deleteCartItem,
    modifyCartItem,
    modifyCart,
    CartQuantityCounter: (lineItem: OrderLineItem, lineItemImageData?: CatalogImage) => <Counter allowDeletion={true} onCountChange={(quantity: number) => debounced(quantity, lineItem, lineItemImageData)} count={Number.parseInt(lineItem.quantity)} />,
  }
}

export const useCart = () => {
  const currentCart = useContext(CartContext);
  if (!currentCart) {
    throw new Error("Hooks have to be used within Providers");
  }

  return currentCart;
};

export default CartProvider;