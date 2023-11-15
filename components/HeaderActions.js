"use client";
import { Person } from "react-bootstrap-icons";
import { Menu, Popover } from "@headlessui/react";
import Cart from "./Cart";
import Link from "next/link";
import Button from "./Button";
import { useContext } from "react";
import { CartContext } from "context/cartContext";
import CartOverlay from "./CartOverlay";
import { CheckoutContext } from "context/checkoutContext";

function HeaderActions() {
  const {
    toggleCartOverlay: [toggleCartOverlay, setToggleCartOverlay],
  } = useContext(CartContext);
    const { getCheckoutUrl } = useContext(CheckoutContext)
  const handleCartToggle = (e, bool = !toggleCartOverlay) => setToggleCartOverlay(bool);

  return (
    <div className="">
      <button onClick={handleCartToggle} className="p-1">
        <Cart />
      </button>
      <Popover>
        {toggleCartOverlay && (
          <div className="absolute border bg-white z-20 p-2 top-full right-0 w-1/3 h-screen">
            <Popover.Overlay className="fixed inset-0 bg-black opacity-30" />
            <Popover.Panel static>
              <CartOverlay handleCartToggle={handleCartToggle} getCheckoutUrl={getCheckoutUrl} />
            </Popover.Panel>
          </div>
        )}
      </Popover>
      {/* <Menu>
        <Menu.Button>
          <Person fontSize={18} />
        </Menu.Button>
        <Menu.Items>
          <Menu.Item as={Link} href="/account">
            My Account
          </Menu.Item>
        </Menu.Items>
      </Menu> */}
    </div>
  );
}

export default HeaderActions;
