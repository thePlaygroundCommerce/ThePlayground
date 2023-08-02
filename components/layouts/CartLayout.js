import CartSummary from "components/CartSummary";
import React from "react";

const CartLayout = ({ children }) => {
  return (
    <div fluid>
      <div>
        <p>Shopping Cart</p>
      </div>
      <div>
        <div xs={8}>
          {children}
        </div>
        <div xs={4}>
          <CartSummary />
        </div>
      </div>
    </div>
  );
};

export default CartLayout;
