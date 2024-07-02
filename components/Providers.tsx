"use client";
import React from "react";
import CartProvider from "context/cartContext";
import { CookiesProvider } from "react-cookie";
import NavigationProvider from "context/navigationContext";
import CheckoutProvider from "context/checkoutContext";
import InventoryProvider from "../context/inventoryContext";
import { AppProps } from "types";
import UIKitProvider from "context/UIKitContext";
import { Order } from "square";

type Props = AppProps & {
  data: any,
  cart?: Order
};

const Providers = ({ data, cart, children }: Props) => {
  return (
    <UIKitProvider>
      <NavigationProvider apparelCategories={data.categories}>
        <CookiesProvider>
          <InventoryProvider
            apparelData={{ apparelItems: data.items, apparelImages: data.images }}
          // handleCategoryChange={handleCategoryChange}
          >
            <CartProvider _cart={cart}>
              <CheckoutProvider>{children}</CheckoutProvider>
            </CartProvider>
          </InventoryProvider>
        </CookiesProvider>
      </NavigationProvider>
    </UIKitProvider>
  );
};

export default Providers;
