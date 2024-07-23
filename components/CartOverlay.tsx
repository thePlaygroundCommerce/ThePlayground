import React from "react";
import OrderList from "./OrderList";
import Button from "./Button";
import { IoClose } from "react-icons/io5";
import Link from "next/link";
import { AppProps } from "types";
import { useCheckout } from "context/checkoutContext";
import { useCart } from "context/cartContext";
import Money from "./Money";
import Heading from "./typography/Heading";

type Props = AppProps & {
  handleCartToggle: (e: any, bool: boolean) => void;
  getCheckoutUrl: () => string;
};

const CartOverlay = ({ handleCartToggle }: Props) => {
  const { cart } = useCart();
  const { checkout } = useCheckout();

  const handleCheckoutClick = () => {
    checkout()
  }

  const subtotal = cart.lineItems?.reduce((acc, cur) => acc + (Number(cur.basePriceMoney?.amount ?? 0)), 0) ?? 0

  return (
    <div>
      <div className="flex justify-between items-center px-4 border-b">
        <Heading level={5}>Cart</Heading>
        <button className="p-3" onClick={() => handleCartToggle(null, false)}>
          <IoClose />
        </button>
      </div>

      <div className="py-3 border-b">
        <OrderList allowOrderModify />
      </div>

      <div className="px-3">
        <div className="py-5 flex justify-between">
          <p>Subtotal</p>
          <Money number={subtotal} />
        </div>
        <Button className="w-full" disabled={cart.lineItems?.length === 0} onClick={handleCheckoutClick}>
          Checkout Now
        </Button>
      </div>
    </div>
  );
};

export default CartOverlay;
