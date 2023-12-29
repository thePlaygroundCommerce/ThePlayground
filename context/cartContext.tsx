"use client";

import { callCreateCart, callGetCart, callUpdateCart } from "api/cartApi";
import _ from "lodash";
import { createContext, useState, useEffect, useMemo, useContext } from "react";
import { useCookies } from "react-cookie";
import { CatalogImage, Order, OrderLineItem } from "square";
import { CartContextType } from "types";

export const CartContext = createContext<CartContextType | null>(null);

const CartProvider = ({ children }: any) => {
  const [cookies, setCookie] = useCookies();
  const toggleCartOverlay = useState<boolean>(false);
  const [cartItemImages, setCartItemImages] = useState<{
    [catalogObjectId: string]: CatalogImage;
  }>({});
  const [cart, setCart] = useState<Order>({
    id: cookies.cartID,
    lineItems: [],
    locationId: "",
  });

  useEffect(() => {
    if (cookies.cartID) {
      getCart();
    }
  }, []);

  const getCart = async () => {
    const order: Order = await callGetCart(cookies.cartID);
    console.log(order)
    if (order) populateCart(order);
  };

  const updateCart = async (
    lineItems?: OrderLineItem[],
    fieldsToClear?: string[]
  ) => {
    if (cart.id) {
      const body = {
        orderID: cart.id,
        order: {
          version: cart.version,
          lineItems: lineItems,
        },
        fieldsToClear,
      };
      const order = await callUpdateCart(body, { method: "PUT" });
      console.log(order)
      populateCart(order);
    } else {
      createCart(lineItems, undefined);
    }
  };

  const createCart = async (catalogOrder: any, checkout?: boolean) => {
    const state = checkout ? "OPEN" : "DRAFT";
    const { order } = await callCreateCart({
      order: { state, lineItems: catalogOrder },
    });

    console.log(order)

    setCookie("cartID", order.id, {
      path: "/",
    });
    populateCart(order);
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
    
    setCart({
      ...order,
      id: cookies.cartID,
    });
  };

  return (
    <CartContext.Provider
      // @ts-ignore
      value={useMemo(
        () => ({
          cart, cartItemImages,
          updateCart,
          createCart,
          addCartItem,
          deleteCartItem,
          toggleCartOverlay,
        }),
        [cart, toggleCartOverlay]
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
