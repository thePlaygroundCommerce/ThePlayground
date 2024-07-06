"use client";
import { BsCart } from "react-icons/bs";
import { useCart } from "context/cartContext";

const Cart = () => {
  const {
    cart: { lineItems } = { lineItems: [] },
  } = useCart();
  const cartSize = lineItems?.length ?? 0;

  return (
    <div className="relative">
      {cartSize > 0 && <Badge num={cartSize} />}
      <BsCart />
    </div>
  );
};

const Badge = ({ num = 1 }) => (
  <div className="absolute text-xs left-full top-0 bg-white p-2 badge">
    {num}
  </div>
);

export default Cart;
