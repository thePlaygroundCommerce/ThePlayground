"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { CartContext } from "./cartContext";
import { getCheckoutUrl } from "api/checkoutApi";
import { AppProps } from "types";

export const CheckoutContext = createContext({});

const CheckoutProvider = ({ children }: AppProps) => {
  const {
    cart: { lineItems },
  } = useContext(CartContext);

  const _getCheckoutUrl = (lineItems: any) => {
    // lineItems
    //   ? getCheckoutUrl(lineItems)
    //   : getCheckoutUrl(
    //       lineItems.map(({ catalogObjectId }) => ({
    //         catalogObjectId,
    //         quantity: "1",
    //       }))
  };

  return (
    <CheckoutContext.Provider value={{ getCheckoutUrl: _getCheckoutUrl }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutProvider;
