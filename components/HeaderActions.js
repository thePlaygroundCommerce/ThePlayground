"use client";
import { Person } from "react-bootstrap-icons";
import { Menu, Popover } from "@headlessui/react";
import Cart from "./Cart";
import Link from "next/link";
import Button from "./Button";
import { useContext, useEffect, useState } from "react";
import { useCart } from "context/cartContext";
import CartOverlay from "./CartOverlay.tsx";
import { CheckoutContext } from "context/checkoutContext";
import { Drawer } from "rsuite";
import { createPortal } from "react-dom";
import { useUIKit } from "context/UIKitContext";
import Portal from "./Portal";
import { usePathname } from "next/navigation";

function HeaderActions() {
  const path = usePathname();
  const {
    drawerKit: { open, ref },
    handleUIChange,
  } = useUIKit();
  const { getCheckoutUrl } = useContext(CheckoutContext);
  const [show, setShow] = useState(false);

  const handleCartOnClick = () => {
    setShow(!show);
    if(!open)
      handleUIChange({ open: !open });
  };

  useEffect(() => {
    if(show) setShow(false)
  }, [path])

  return (
    <div className="flex justify-center">
      <button onClick={handleCartOnClick} className="p-1">
        <Cart />
      </button>
        <Portal rootId="drawerContainer">
          <Drawer
            placement="right"
            closeButton={false}
            size={325}
            open={open && show}
            // onClose={handleCartOnClick}
            onExited={() => handleUIChange({open: !open})}
          >
            <Drawer.Body className="py-2 p-0">
              <div className="bg-white h-screen">
                <CartOverlay
                  handleCartToggle={handleCartOnClick}
                  // getCheckoutUrl={getCheckoutUrl}
                />
              </div>
            </Drawer.Body>
          </Drawer>
        </Portal>
    </div>
  );
}

export default HeaderActions;
