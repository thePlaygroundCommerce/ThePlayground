"use client";
import Cart from "./Cart";
import { VscAccount } from "react-icons/vsc";
import { useEffect, useState } from "react";
import { useUIKit } from "context/UIKitContext";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import Button from "./Button";
import useBreakpoint from "hooks/useBreakpoints.tsx";
import { useCart } from "context/cartContext.tsx";

const initialShowState = {
  cart: { active: false, id: "cart" },
  auth: { active: false, id: "account" },
};

function HeaderActions() {
  const size = useBreakpoint();
  const path = usePathname();
  const { cart: { lineItems = [] } } = useCart()
  const {
    drawerKit: { open },
    handleUIChange,
  } = useUIKit();

  const accountHref = !useAuth().isSignedIn ? "/account/sign-in" : "/account";

  const [show, setShow] = useState(initialShowState);

  const handleCartOnClick = () => {
    setShow({
      ...initialShowState,
      cart: { ...show.cart, active: !show.cart.active },
    });
    if (!open) handleUIChange({ open: !open });
  };

  const closeDrawer = () => {
    setShow(initialShowState);
    handleUIChange({ open: false });
  };

  useEffect(() => {
    if (show.auth.active || show.cart.active) setShow(initialShowState);
  }, [path]);

  return (
    <div className="flex h-full justify-end md:mr-4">
      <Button>
        <Link href={accountHref}>
          <VscAccount />
        </Link>
      </Button>
      <Button onClick={handleCartOnClick} className="cursor-pointer text-inherit">
        <Cart />
      </Button>
      {/* <Portal rootId="drawerContainer">
        <Drawer
          placement="right"
          closeButton={false}
          size={size == "sm" ? "full" : "30%"}
          open={open && (show.auth.active || show.cart.active)}
          className="h-full overflow-hidden p-0"
          enforceFocus
        >
          <Drawer.Body
            className="py-2 p-0 h-full overflow-hidden"
            style={{ maxHeight: undefined }}
          >
            <div className="bg-white h-full flex flex-col">
              <div className="overflow-hidden flex justify-between items-center px-4 border-b">
                <div className="py-2">
                  <Heading level={6}>You have {lineItems.length} items in your cart.</Heading>
                  <p className="italic text-sm">Free Shipping</p>
                </div>
                <Button className="p-3" onClick={closeDrawer}>
                  <IoClose />
                </Button>
              </div>
              <div className="h-full overflow-hidden">
                {show.cart.active && <CartOverlay />}
              </div>
            </div>
          </Drawer.Body>
        </Drawer>
      </Portal> */}
    </div>
  );
}

export default HeaderActions;
