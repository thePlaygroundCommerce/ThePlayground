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
import { Modal, Placeholder, Button } from "rsuite";
import Portal from "./Portal";
import { Simplify } from "prismicio-types";

type Props = AppProps & {
  cartImageMap: any
  data: any,
  cartData?: {_cart: Order, _options: Simplify<CatalogObject[]>}
};

const Providers = ({ cartImageMap, data, cartData, children }: Props) => {
  const [show, setShow] =  useState(false);

  useEffect(() => {
    // setShow(true)
  }, [])

  return (
    <UIKitProvider>
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
      {/* <Portal rootId="modalContainer"> */}
        <Modal id="aasdaassd" open={show} autoFocus className="a" onClose={() => { }}>
          <Modal.Header>
            <Modal.Title>Discounts Promotion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Placeholder.Paragraph />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => null} appearance="primary">
              Ok
            </Button>
            <Button onClick={() => null} appearance="subtle">
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      {/* </Portal> */}
    </UIKitProvider>
  );
};

export default Providers;
