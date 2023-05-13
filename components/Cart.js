import React, { useContext, useState } from "react";
import { Badge, OverlayTrigger } from "react-bootstrap";
import { BsCart } from "react-icons/bs";
import CartSummary from "./CartSummary";
import { CartContext } from "context/cartContext";

const CartOverlay = (props) => {
  return (
    <div
      {...props}
      id="cartOverlay"
      style={{
        ...props.style,
        width: "30rem",
      }}
      className={`bg-white p-3 border border-dark popover-arrow ${props.className}`}
    >
      <CartSummary />
    </div>
  );
};

const Cart = () => {
  const [show, setShow] = useState(false);
  const { cart } = useContext(CartContext);

  return (
    <OverlayTrigger
      placement="bottom-end"
      overlay={CartOverlay}
    >
      {({ ref, ...triggerHandler }) => (
        <div
          ref={ref}
          {...triggerHandler}
          onMouseOut={null}
          onMouseOver={null}
          onFocus={null}
          onBlur={null}
          onMouseEnter={triggerHandler.onMouseOver}
          className="p-2"
        >
          <BsCart />
          <Badge>{cart?.itemVariationsIDs.length > 0 && cart?.itemVariationsIDs.length}</Badge>
        </div>
      )}
    </OverlayTrigger>
  );
};

export default Cart;
