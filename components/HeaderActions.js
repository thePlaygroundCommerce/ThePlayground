'use client';
import { Person } from "react-bootstrap-icons";
import { Menu } from "@headlessui/react";
import Cart from "./Cart";
import Link from "next/link";
import Button from "./Button";

function HeaderActions() {
  return (
    <div className="flex items-center justify-end">
      <button variant="" className="p-1">
        <Cart />
      </button>
      <Menu>
        <Menu.Button>
          <Person fontSize={18} />
        </Menu.Button>
        <Menu.Items>
          <Menu.Item as={Button}>
            My Account
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </div>
  );
}

export default HeaderActions;
