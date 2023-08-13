"use client";
import React from "react";
import CartProvider from "context/cartContext";
import { CookiesProvider } from "react-cookie";
import NavigationProvider from "context/navigationContext";
import CheckoutProvider from "context/checkoutContext";

const Providers = ({ children, apparelCategories }) => {
  return (
    <NavigationProvider apparelCategories={apparelCategories}>
      <CookiesProvider>
        <CartProvider>
          <CheckoutProvider>{children}</CheckoutProvider>
        </CartProvider>
      </CookiesProvider>
    </NavigationProvider>
  );
};

export default Providers;
