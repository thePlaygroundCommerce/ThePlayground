"use client";

import React, { useContext, useRef, useState } from "react";
import { BsCart } from "react-icons/bs";
import CartSummary from "./CartSummary";
import { useCart } from "context/cartContext";

const Cart = () => {
  const [show, setShow] = useState(false);
  const ref = useRef();
  const { cart: { lineItems } } = useCart();
  const cartSize = lineItems?.length;

  return (
    <>
      <div
        onMouseOver={() => setShow(true)}
        className="relative"
      >
        {cartSize > 0 && <Badge num={cartSize} />}
        <BsCart />
      </div>
    </>
  );
};

const Badge = ({ num = 1 }) => (
  <div className="absolute text-xs left-full top-0 bg-white p-2 badge">
    {num}
  </div>
)

export default Cart;
