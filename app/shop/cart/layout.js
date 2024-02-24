import Button from "components/Button";
import CartPricing from "components/CartPricing";
import CartSummary from "components/CartSummary";
import React from "react";

const CartLayout = ({ children }) => {
  return (
    <div>
      <div className="grid grid-cols-3">
        <div className="col-span-2">
          {children}
        </div>
        <div className="col-span-1">
          <CartPricing />
        <div>
          <Button>Checkout Now</Button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default CartLayout;
