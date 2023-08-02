"use client";

import React, { useContext, useRef, useState } from "react";
import { BsCart } from "react-icons/bs";
import CartSummary from "./CartSummary";
import { CartContext } from "context/cartContext";

const Cart = () => {
  const [show, setShow] = useState(false);
  const ref = useRef();
  // const { cart } = useContext(CartContext);

  return (
    <>
      <div
        ref={ref}
        onMouseOver={() => setShow(true)}
        className="p-2 position-relative"
      >
        <BsCart />
        {/* {cart?.itemVariationsIDs.length > 0 && cart?.itemVariationsIDs.length} */}
      </div>
      {/* <Overlay target={ref.current} show={show} placement="bottom-end">
        {(props) => {
          console.log(props.style);
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
            >
              <CartSummary cart={cart.order} />
            </div>
          );
        }}
      </Overlay> */}
    </>
  );
};

export default Cart;
