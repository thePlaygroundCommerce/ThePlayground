import React from "react";
import OrderList from "./OrderList";
import Button from "./Button";
import { IoClose } from "react-icons/io5";
import Link from "next/link";
import { AppProps } from "types";
import { boolean } from "square/dist/types/schema";

type Props = AppProps & {
  handleCartToggle: (e: any, bool: boolean) => void;
  getCheckoutUrl: () => string;
};

const CartOverlay = ({ handleCartToggle, getCheckoutUrl }: Props) => {
  const handleCheckoutClick = async () => {
    const url = getCheckoutUrl();
    window.location.assign(url);
  };

  return (
    <div>
      <div>
        <Button onClick={() => handleCartToggle(null, false)}>
          <IoClose />
        </Button>
      </div>

      <div className="py-3 border-b">
        <OrderList orders={undefined} />
      </div>

      <div className="px-3">
        <div className="py-5 flex justify-between">
          <p>Subtotal</p>
          <p>$ 0.00</p>
        </div>
        <Button className="w-full" onClick={handleCheckoutClick}>
          Checkout Now
        </Button>
        <Button className="w-full">
          <Link href="/cart">Go to Cart</Link>
        </Button>
      </div>
    </div>
  );
};

export default CartOverlay;
