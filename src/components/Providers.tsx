"use client";
import { useEffect, useState } from "react";
import CartProvider from "@/context/cartContext";
import { CookiesProvider, useCookies } from "react-cookie";
import CheckoutProvider from "@/context/checkoutContext";
import InventoryProvider from "../context/inventoryContext";
import { AppProps } from "index";
import UIKitProvider from "@/context/UIKitContext";
import { CatalogObject, Order } from "square";
import { Simplify } from "prismicio-types";
import { callGetCart } from "@/api/cartApi";
import { mapArrayToMap } from "@/util";


type Props = AppProps & {
  cartImageMap: any
  data: any,
  cartData?: { _cart: Order, _options: Simplify<CatalogObject[]> }
};

const Providers = ({ cartImageMap, data, cartData, children }: Props) => {
  const [cookies] = useCookies(["cartId"]);
  const [{ imageMap, options, relatedObjects = [], order }, setInit] = useState<Awaited<ReturnType<typeof callGetCart>>>({})

  useEffect(() => {
    async function fetchCartAndItems(id: string) {
      try {
        const res = await callGetCart(id);
        setInit(res);
      } catch (error) {
        console.error('Failed to load cart', error);
      }
    }
    const id = cookies.cartId
    id && fetchCartAndItems(id);
  }, []);

  const { item_options } = mapArrayToMap([...data, ...relatedObjects])

  return (
    < CookiesProvider >
      <InventoryProvider
        itemOptions={item_options}
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
