"use client";
import { useEffect, useState } from "react";
import CartProvider from "@/context/cartContext";
import { CookiesProvider } from "react-cookie";
import CheckoutProvider from "@/context/checkoutContext";
import InventoryProvider from "../context/inventoryContext";
import { AppProps } from "index";
import UIKitProvider from "@/context/UIKitContext";
import { CatalogObject, Order } from "square";
import { Simplify } from "prismicio-types";


type Props = AppProps & {
  cartImageMap: any
  data: any,
  cartData?: { _cart: Order, _options: Simplify<CatalogObject[]> }
};

const Providers = ({ cartImageMap, data, cartData, children }: Props) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true)
  }, [])

  return (
    < CookiesProvider >
      <InventoryProvider
        _itemOptions={data.item_options}
        apparelData={{ apparelItems: data.items, apparelImages: data.images }}
      >
        <CartProvider data={cartData} images={cartImageMap}>
          <UIKitProvider>
            <CheckoutProvider>{children}</CheckoutProvider>
          </UIKitProvider>
        </CartProvider>
      </InventoryProvider>
    </CookiesProvider >
  );
};

export default Providers;
