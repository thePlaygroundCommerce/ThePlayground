"use client";
import React from "react";
import CartProvider from "context/cartContext";
import { CookiesProvider } from "react-cookie";
import NavigationProvider from "context/navigationContext";
import CheckoutProvider from "context/checkoutContext";
import InventoryProvider from "../context/inventoryContext";
import { AppProps } from "types";

type Props = AppProps & {
  data: any
};

const Providers = ({ data, children }: Props) => {
  return (
    <NavigationProvider apparelCategories={data.categories}>
      <CookiesProvider>
        <InventoryProvider
          apparelData={{ apparelItems: data.items, apparelImages: data.images }}
          // handleCategoryChange={handleCategoryChange}
        >
          <CartProvider apparelData={data.items}>
            <CheckoutProvider>{children}</CheckoutProvider>
          </CartProvider>
        </InventoryProvider>
      </CookiesProvider>
    </NavigationProvider>
  );
};

export default Providers;
