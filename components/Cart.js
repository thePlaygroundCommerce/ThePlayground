import React, { useContext, useRef, useState } from "react";
import { Badge, Overlay, OverlayTrigger } from "react-bootstrap";
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
  const ref = useRef();
  const { cart } = useContext(CartContext);

  return (
    <>
      <div
        ref={ref}
        // {...triggerHandler}
        onMouseOver={() => setShow(true)}
        // onMouseOver={e => {console.log("Over"); return triggerHandler.onMouseOver(e)}}
        // onFocus={null}
        // onBlur={null}
        // onMouseEnter={(e) => {
        //   console.log("Enter");
        //   return triggerHandler.onMouseOver(e);
        // }}
        // onMouseEnter={null}
        className="p-2 position-relative"
      >
        <BsCart/>
        <Badge className="rounded-circle position-absolute top-0 end-0">
          {cart?.itemVariationsIDs.length > 0 && cart?.itemVariationsIDs.length}
        </Badge>
      </div>
      <Overlay target={ref?.current} show={show} placement="bottom-end">
        {(props) => {
          return (
            <div
              {...props}
              className="bg-white p-3 border border-dark"
              style={{
                width: "30rem",
                borderRadius: 3,
                ...props.style,
              }}
              onMouseLeave={() => setShow(false)}
              // onMouseOut={() => setShow(false)}
            >
              <CartSummary cart={cart.order}/>
            </div>
          );
        }}
      </Overlay>
    </>
  );
};

export default Cart;
