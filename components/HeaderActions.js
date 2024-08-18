"use client";
import Cart from "./Cart";
import Heading from "./typography/Heading";
import { VscAccount } from "react-icons/vsc";
import React, { useEffect, useState } from "react";
import CartOverlay from "./CartOverlay.tsx";
import { Drawer } from "rsuite";
import { useUIKit } from "context/UIKitContext";
import { IoClose } from "react-icons/io5";
import Portal from "./Portal";
import { usePathname } from "next/navigation";
import Auth from "./Auth";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

const intialShowState = {
  cart: { active: false, id: "cart" },
  auth: { active: false, id: "account" },
};

function HeaderActions() {
  const path = usePathname();
  const {
    drawerKit: { open },
    handleUIChange,
  } = useUIKit();

  const accountHref = !useAuth().isSignedIn ? "/account/sign-in" : "/account";

  const [show, setShow] = useState(intialShowState);

  const handleCartOnClick = () => {
    setShow({
      ...intialShowState,
      cart: { ...show.cart, active: !show.cart.active },
    });
    if (!open) handleUIChange({ open: !open });
  };

  const closeDrawer = () => {
    setShow(intialShowState);
    handleUIChange({ open: false });
  };

  useEffect(() => {
    if (show.auth.active || show.cart.active) setShow(intialShowState);
  }, [path]);

  const title = _.capitalize(
    Object.values(show).find((showing) => showing.active)?.id ?? ""
  );

  return (
    <div className="flex justify-end md:mr-4 gap-5">
      <button>
        <Link href={accountHref}>
          <VscAccount />
        </Link>
      </button>
      <button onClick={handleCartOnClick} className="">
        <Cart />
      </button>
      <Portal rootId="drawerContainer">
        <Drawer
          placement="right"
          closeButton={false}
          size={325}
          open={open && (show.auth.active || show.cart.active)}
          className="h-full overflow-hidden"
          enforceFocus
        >
          <Drawer.Body
            className="py-2 p-0 h-full overflow-hidden"
            style={{ maxHeight: undefined }}
          >
            <div className="bg-white">
              <div className="flex justify-between items-center px-4 border-b">
                <Heading level={5}>{title}</Heading>
                <button className="p-3" onClick={closeDrawer}>
                  <IoClose />
                </button>
              </div>
              {show.cart.active && <CartOverlay />}
            </div>
          </Drawer.Body>
        </Drawer>
      </Portal>
    </div>
  );
}

export default HeaderActions;
