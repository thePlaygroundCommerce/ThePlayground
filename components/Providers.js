"use client";
import React from "react";
import CartProvider from "context/cartContext";
import { CookiesProvider } from "react-cookie";

const Providers = ({ children }) => {
  return (
      <CookiesProvider>
        <CartProvider>{children}</CartProvider>
      </CookiesProvider>
  );
};

export default Providers;
