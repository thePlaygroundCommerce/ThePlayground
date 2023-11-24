"use client";

import { callCreateCart, callGetCart, callUpdateCart } from "api/cartApi";
import { createContext, useState, useEffect, useMemo, useContext } from "react";
import { useCookies } from "react-cookie";
import { CatalogImage, Order, OrderLineItem } from "square";

export const CartContext = createContext({ cart: { lineItems: [] } });

interface CartOrder extends Order {
  lineItems: CartOrderItem[];
}
interface CartOrderItem extends OrderLineItem {
  displayImage: CatalogImage;
}

const CartProvider = ({ apparelData, children }: any) => {
  const [cookies, setCookie] = useCookies();
  const toggleCartOverlay = useState(false);
  const [itemVariationIds, setItemVariationIds] = useState<
    (string | null | undefined)[] | undefined
  >([]);
  const [cart, setCart] = useState<CartOrder>({
    id: cookies.cartID,
    lineItems: [],
    locationId: "",
  });

  useEffect(() => {
    if (cookies.cartID) {
      getCart();
    }
  }, []);

  const getCart = async () => {
    const order: CartOrder = await callGetCart(cookies.cartID);
    if (order) populateCart(order);
  };

  const updateCart = async (
    lineItems?: CartOrderItem[],
    fieldsToClear?: string[]
  ) => {
    if (cart.id) {
      const body = {
        orderID: cart.id,
        order: {
          version: cart.version,
          lineItems: lineItems,
        },
        fieldsToClear,
      };
      const order = await callUpdateCart(body, new Headers({ method: "PUT" }));
      populateCart(order);
    } else {
      createCart(lineItems, undefined);
    }
  };

  const createCart = async (catalogOrder: any, checkout?: boolean) => {
    const state = checkout ? "OPEN" : "DRAFT";
    const { order } = await callCreateCart({
      order: { state, lineItems: catalogOrder },
    });

    setCookie("cartID", order.id, {
      path: "/",
    });
    populateCart(order);
  };

  const addCartItem = (lineItem: CartOrderItem) => {
    if (!cart.lineItems) {
      updateCart([lineItem], undefined);
    } else {
      updateCart(cart.lineItems.concat(lineItem), undefined);
    }
  };

  const deleteCartItem = (lineItemUid: string) => {
    updateCart(undefined, [`line_items[${lineItemUid}]`]);
  };

  const modifyCartItem = (itemVariationId: string) => {};

  const populateCart = (order: CartOrder) => {
    setCart({
      ...order,
      id: cookies.cartID,
    });
    const ids = cart.lineItems?.map(({ catalogObjectId }) => catalogObjectId);
    setItemVariationIds(ids);
  };

  return (
    <CartContext.Provider
      // @ts-ignore
      value={useMemo(
        () => ({
          cart,
          updateCart,
          createCart,
          addCartItem,
          deleteCartItem,
          toggleCartOverlay,
        }),
        [cart, toggleCartOverlay]
      )}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
