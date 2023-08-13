import React from "react";
import OrderList from "./OrderList";
import Button from "./Button";

const CartOverlay = ({ handleCartToggle, getCheckoutUrl }) => {
  const handleCheckoutClick = async () => {
    const url = await getCheckoutUrl();
    window.location.assign(url)
  };
  return (
    <div>
      <Button onClick={() => handleCartToggle(null, false)}>Close</Button>

      <OrderList />

      <div>
        <p>Subtotal</p>
        <Button onClick={handleCheckoutClick}>Checkout Now</Button>
      </div>
    </div>
  );
};

export default CartOverlay;
