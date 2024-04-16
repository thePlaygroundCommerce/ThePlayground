"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { useCart } from "./cartContext";
import { getCheckoutUrl } from "api/checkoutApi";
import { AppProps } from "types";
import { OrderLineItem } from "square";

export const CheckoutContext = createContext({});

const CheckoutProvider = ({ children }: AppProps) => {
  const {
    cart: { lineItems },
  } = useCart();

  const _getCheckoutUrl = (lineItems: OrderLineItem[]) => {
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
