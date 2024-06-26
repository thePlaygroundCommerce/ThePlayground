"use client";
import { apiRouteHandlerAdapter } from "apiRouteHandler";
import CartOverlay from "components/CartOverlay";
import Counter from "components/Counter";
import _ from "lodash";
import { createContext, useState, useEffect, useMemo, useContext, useRef } from "react";
import { useCookies } from "react-cookie";
import { Button, Drawer } from "rsuite";
import { CatalogImage, Order, OrderLineItem } from "square";
import { CartContextType } from "types";
import { useDebouncedCallback } from "use-debounce";

export interface AuthState {
  cart: Order;
  cartImages: {
    [catalogObjectId: string]: CatalogImage;
  };

}

export const CartContext = createContext<CartContextType | null>(null);

const CartProvider = ({ children }: any) => {
  const [cookies, setCookie] = useCookies();
  const [openCart, setOpenCart] = useState<boolean>(false);
  const [cartItemImages, setCartItemImages] = useState<{
    [catalogObjectId: string]: CatalogImage;
  }>({});
  const [cart, setCart] = useState<Order>({
    id: cookies.cartId,
    lineItems: [],
    locationId: "",
  });

  const drawerRef = useRef(null);
  const handleDrawerToggle = (e: any, bool = !openCart) => {
    setOpenCart(bool);
  }
  useEffect(() => {
    if (cookies.cartId) {
      getCart();
    }
  }, []);

  const getCart = () => {
    apiRouteHandlerAdapter({
      method: "GET",
      url: `/api/cart/${cookies.cartId}`
    }).then(data => populateCart(data))
  };

  const updateCart = (
    lineItems?: OrderLineItem[],
    fieldsToClear?: string[]
  ) => {
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
      }).then(data => populateCart(data))
    } else {
      createCart(lineItems, false);
    }
  };

  const createCart = (catalogOrder: any, checkout?: boolean) => {
    const state = checkout ? "OPEN" : "DRAFT";
    apiRouteHandlerAdapter({
      method: "POST",
      url: `/api/cart`,
      payload: { order: { state, lineItems: catalogOrder } }
    }).then(data => {
      setCookie("cartId", data.id, {
        path: "/",
      });
      populateCart(data)
    })
  };

  const addCartItem = (
    lineItem: OrderLineItem,
    lineItemImageData?: CatalogImage
  ) => {
    const lineItems = cart.lineItems ?? [];
    const existingItemIndex = lineItems.findIndex(
      ({ uid }) => lineItem.uid == uid
    );
    const isExistingItem = existingItemIndex != -1;
    if (isExistingItem) modifyCartItem(existingItemIndex, lineItem);
    else updateCart(lineItems.concat(lineItem));

    const objId = lineItem.catalogObjectId ?? "";
    setCartItemImages({
      ...cartItemImages,
      [objId]: lineItemImageData ?? {},
    });
  };

  const deleteCartItem = (lineItemUid: string) => {
    updateCart(undefined, [`line_items[${lineItemUid}]`]);
  };

  const modifyCartItem = (
    existingCartItemIndex: number,
    newCartItem: OrderLineItem
  ) => {
    if (!Array.isArray(cart.lineItems)) {
      throw new Error("Cart line items must be an Array!");
    }

    const lineItems = [...cart.lineItems];
    let existingCartItem = lineItems[existingCartItemIndex];

    const mergedCartItem = {
      ...existingCartItem,
      ...newCartItem,
    };

    if (_.isEqual(mergedCartItem, existingCartItem)) {
      console.log("No changes in merged cart item!");
      return;
    }

    lineItems[existingCartItemIndex] = mergedCartItem;

    updateCart(lineItems);
  };

  const populateCart = (order: Order) => {
    setCart(order);
  };

  return (
    <CartContext.Provider
      // @ts-ignore
      value={useMemo(
        () => ({
          cart, cartItemImages,
          drawerRef,
          handleDrawerToggle,
          updateCart,
          createCart,
          addCartItem,
          deleteCartItem,
          CartQuantityCounter: (lineItem: OrderLineItem) => <Counter allowDeletion={true} onCountChange={useDebouncedCallback((quantity) => {
            if(quantity === 0 )
              return deleteCartItem(lineItem.uid as string)
            lineItem = {...lineItem}
            const item = cart.lineItems?.findIndex((item) => item.uid === lineItem.uid) ?? -1;

            if (!(item < 0)) {
              lineItem.quantity = quantity.toString();
              modifyCartItem(item, lineItem)
            } else {
              console.error("Item should be found in the cart!")
            }
          }, 1000 )} count={Number.parseInt(lineItem.quantity)} />,
          toggleCartOverlay: [openCart, setOpenCart],
        }),
        [cart, openCart]
      )}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const currentCart = useContext(CartContext);
  if (!currentCart) {
    throw new Error("Hooks have to be used within Providers");
  }

  return currentCart;
};

export default CartProvider;

type Action =
  | 'ADD_ITEM'
  | 'DELETE_ITEM'
  | 'MODIFY_ITEM'

export interface IAction {
  type: Action
  state?: { [key in keyof AuthState]?: any }
}

export interface ReducerController {
  acceptableActions: Array<Action>
  execute: (
    state: AuthState,
    changes?: { [key in keyof AuthState]?: any },
  ) => AuthState
}

export const setStateHelper = (
  state: AuthState,
  params: { [key in keyof AuthState]?: any },
): AuthState => {
  return { ...state, ...params }
}

const reducer = () => {

}