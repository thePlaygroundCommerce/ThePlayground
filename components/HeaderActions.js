"use client";
import Cart from "./Cart";
import React, { useEffect, useState } from "react";
import CartOverlay from "./CartOverlay.tsx";
import { Drawer } from "rsuite";
import { useUIKit } from "context/UIKitContext";
import Portal from "./Portal";
import { usePathname } from "next/navigation";

function HeaderActions() {
  const path = usePathname();
  const {
    drawerKit: { open },
    handleUIChange,
  } = useUIKit();
  // const { getCheckoutUrl } = useContext(CheckoutContext);
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
            className="h-full overflow-hidden"
            // onClose={handleCartOnClick}
            enforceFocus
            onExited={() => handleUIChange({open: !open})}
          >
            <Drawer.Body className="py-2 p-0 h-full overflow-hidden" style={{ maxHeight: undefined }}>
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
