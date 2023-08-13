"use client";

import { callCreateCart, callGetCart, callUpdateCart } from "api/cartApi";
import { createContext, useState, useEffect, useMemo } from "react";
import { useCookies } from "react-cookie";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cookies, setCookie] = useCookies();
  const [cart, setCart] = useState({
    id: cookies.cartID,
    itemVariationsIDs: [],
    order: {},
  });

  useEffect(() => {
    if (cookies.cartID) {
      getCart();
    }
  }, []);

  const toggleCartOverlay = useState(false);

  const getCart = async () => {
    const order = await callGetCart(cookies.cartID);
    order ? populateCart(order) : null;
  };

  const updateCart = async (lineItem) => {
    if (cart.order) {
      const body = {
        orderID: cart.order.id,
        order: {
          version: cart.order.version,
          lineItems: [lineItem],
        },
      };
      const order = await callUpdateCart(body, { method: "PUT" });
      populateCart(order);
    } else {
      createCart(lineItem);
    }
  };

  const createCart = async (catalogOrder, checkout) => {
    const state = checkout ? "OPEN" : "DRAFT";
    const { order } = await callCreateCart({
      order: { state, lineItems: [catalogOrder] },
    });

    setCookie("cartID", order.id, {
      path: "/",
    });
    populateCart(order);
  };

  const populateCart = (order) => {
    setCart({
      id: cookies.cartID,
      order: order,
      itemVariationsIDs: order.lineItems.map(
        ({ catalogObjectId }) => catalogObjectId
      ),
    });
  };


  return (
    <CartContext.Provider
      value={useMemo(
        () => ({ cart, updateCart, createCart, toggleCartOverlay }),
        [cart, toggleCartOverlay]
      )}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
