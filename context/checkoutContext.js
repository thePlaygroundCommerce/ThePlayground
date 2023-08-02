'use client'


import { createContext, useState, useEffect, useContext } from "react";
import { CartContext } from "./cartContext";

export const CheckoutContext = createContext();

const CheckoutProvider = ({ children }) => {
  const { createCart } = useContext(CartContext);
  const [cart, setCheckout] = useState({
    itemVariationsIDs: [],
    order: {},
  });
  const init = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    if (cookies.cartID) {
      fetch("/api/carts")
        .then((res) => res.json())
        .then(({ order }) => {
          const parsedOrder = JSON.parse(order);
          !order ? null : populateCheckout(parsedOrder);
        });
    }
  }, []);


  return (
    <CheckoutContext.Provider value={{ checkoutOrder }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutProvider;
