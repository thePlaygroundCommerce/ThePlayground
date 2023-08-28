"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { CartContext } from "./cartContext";
import { getCheckoutUrl } from "api/checkoutApi";

export const CheckoutContext = createContext();

const CheckoutProvider = ({ children }) => {
  const {
    cart: { order },
  } = useContext(CartContext);

  const _getCheckoutUrl = (lineItems) =>
    lineItems
      ? getCheckoutUrl(lineItems)
      : getCheckoutUrl(
          order.lineItems.map(({ catalogObjectId }) => ({
            catalogObjectId,
            quantity: "1",
          }))
        );

  return (
    <CheckoutContext.Provider value={{ getCheckoutUrl: _getCheckoutUrl }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutProvider;
