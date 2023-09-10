"use client";

import { callCreateCart, callGetCart, callUpdateCart } from "api/cartApi";
import { createContext, useState, useEffect, useMemo, useContext } from "react";
import { useCookies } from "react-cookie";
import { Order } from "square";

export const CartContext = createContext(null);

const CartProvider = ({ apparelData, children }) => {
  const [cookies, setCookie] = useCookies();
  const toggleCartOverlay = useState(false);
  const [cart, setCart] = useState({
    id: cookies.cartID,
    itemVariationsIDs: [],
    order: { lineItems: [] },
  });

  useEffect(() => {
    if (cookies.cartID) {
      getCart();
    }
  }, []);

  const getCart = async () => {
    const order = await callGetCart(cookies.cartID);
    if (order) populateCart(order);
  };

  const updateCart = async (lineItems, fieldsToClear) => {
    if (cart.order.id) {
      const body = {
        orderID: cart.order.id,
        order: {
          version: cart.order.version,
          lineItems: lineItems,
        },
        fieldsToClear,
      };
      const order = await callUpdateCart(body, { method: "PUT" });
      populateCart(order);
    } else {
      createCart(lineItems, null)
    }
  };

  const createCart = async (catalogOrder, checkout) => {
    const state = checkout ? "OPEN" : "DRAFT";
    const { order } = await callCreateCart({
      order: { state, lineItems: catalogOrder },
    });

    setCookie("cartID", order.id, {
      path: "/",
    });
    populateCart(order);
  };

  const addCartItem = (lineItem) => {
    if (!cart.order.lineItems) {
      updateCart([lineItem], null);
    } else {
      updateCart(cart.order.lineItems.concat(lineItem), null);
    }
  };

  const deleteCartItem = (lineItemUid) => {
    updateCart(null, [`line_items[${lineItemUid}]`]);
  };

  const modifyCartItem = (itemVariationId) => {};

  const populateCart = (order) => {
    setCart({
      id: cookies.cartID,
      order: order,
      itemVariationsIDs: order.lineItems?.map(
        ({ catalogObjectId }) => catalogObjectId
      ),
    });
  };

  return (
    <CartContext.Provider
      value={useMemo(
        () => ({
          cart,
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

export default CartProvider;
