"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext } from "react";
import { AppProps, CheckoutContextType } from "types";
import { doesContextExist } from "util/";
import { useCart } from "./cartContext";

export const CheckoutContext = createContext<CheckoutContextType | null>(null);

const CheckoutProvider = ({ children }: AppProps) => {
  const { cart } = useCart()
  const { push } = useRouter()

  const checkout = () => {
    push("/checkout/" + cart.id)
  }
  
  return (
    <CheckoutContext.Provider value={{ checkout }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  const currentContent = doesContextExist(useContext(CheckoutContext));

  return currentContent;
};

export default CheckoutProvider;
