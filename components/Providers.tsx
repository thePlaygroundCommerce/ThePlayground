"use client";
import React, { useEffect, useState } from "react";
import CartProvider from "context/cartContext";
import { CookiesProvider } from "react-cookie";
import NavigationProvider from "context/navigationContext";
import CheckoutProvider from "context/checkoutContext";
import InventoryProvider from "../context/inventoryContext";
import { AppProps } from "index";
import UIKitProvider from "context/UIKitContext";
import { CatalogObject, Order } from "square";
import { Placeholder, Button } from "rsuite";
import Portal from "./Portal";
import { Simplify } from "prismicio-types";
import TagManagerProvider from "context/TagManager";
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import img from 'public/comingsoon.jpeg'
import Modal from "./Modal";


type Props = AppProps & {
  cartImageMap: any
  data: any,
  cartData?: { _cart: Order, _options: Simplify<CatalogObject[]> }
};

// if (typeof window !== 'undefined') {
//   posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY ?? "", {
//     api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
//     person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
//   })
// }

const Providers = ({ cartImageMap, data, cartData, children }: Props) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true)
  }, [])

  return (
    <UIKitProvider>
      <PostHogProvider client={posthog}>
        <NavigationProvider apparelCategories={data.categories}>
          <CookiesProvider>
            <InventoryProvider
              _itemOptions={data.item_options}
              apparelData={{ apparelItems: data.items, apparelImages: data.images }}
            // handleCategoryChange={handleCategoryChange}
            >
              <CartProvider data={cartData} images={cartImageMap}>
                <CheckoutProvider>{children}</CheckoutProvider>
              </CartProvider>
            </InventoryProvider>
          </CookiesProvider>
        </NavigationProvider>
      </PostHogProvider>
      {/* <Portal rootId="modalContainer"> */}
      {/* </Portal> */}
    </UIKitProvider>
  );
};

export default Providers;
