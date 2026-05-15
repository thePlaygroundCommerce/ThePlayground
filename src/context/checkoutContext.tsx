"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext } from "react";
import { AppProps, CheckoutContextType } from "index";
import { doesContextExist } from "@/util/";
import { useCart } from "./cartContext";
import { getCheckoutItemUrl } from "@/api/checkoutApi";

export const CheckoutContext = createContext<CheckoutContextType | null>(null);

const CheckoutProvider = ({ children }: AppProps) => {
  const { cart } = useCart()
  const { push } = useRouter()

  const checkoutOrder = () => {
    push("/checkout/" + cart.id)
  }

  const checkoutItem = async (catalogObjectId: string, quantity: string) => {
    const { paymentLink } = await
      getCheckoutItemUrl([{
        catalogObjectId,
        quantity
      }])

    push(paymentLink.url)
  }

  return (
    <CheckoutContext.Provider value={{ checkout: checkoutOrder, checkoutItem }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  const currentContent = doesContextExist(useContext(CheckoutContext));

  return currentContent;
};

export default CheckoutProvider;
