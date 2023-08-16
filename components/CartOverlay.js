import React from "react";
import OrderList from "./OrderList";
import Button from "./Button";
import { IoClose } from "react-icons/io5";

const CartOverlay = ({ handleCartToggle, getCheckoutUrl }) => {
  const handleCheckoutClick = async () => {
    const url = await getCheckoutUrl();
    window.location.assign(url);
  };
  return (
    <div>
      <div>
        <Button onClick={() => handleCartToggle(null, false)}><IoClose /></Button>
      </div>

      <div className="py-3 border-b">
        <OrderList />
      </div>

      <div className="px-3">
        <div className="py-5 flex justify-between">
          <p>Subtotal</p>
          <p>$ 0.00</p>
        </div>
        <Button className="w-full" onClick={handleCheckoutClick}>
          Checkout Now
        </Button>
      </div>
    </div>
  );
};

export default CartOverlay;
