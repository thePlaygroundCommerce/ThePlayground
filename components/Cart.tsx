"use client";
import { BsCart } from "react-icons/bs";
import { useCart } from "context/cartContext";
import { IconContext } from "react-icons";

const Cart = () => {
  const {
    cart: { lineItems } = { lineItems: [] },
  } = useCart();
  const cartSize = lineItems?.length ?? 0;

  return (
    <div className="relative flex">
      <IconContext.Provider value={{ className: 'text-inherit' }}>
        <BsCart />
      </IconContext.Provider>
      {cartSize > 0 && <Badge num={cartSize} />}
    </div>
  );
};

const Badge = ({ num = 1 }) => (
  <div className="text-xs left-full top-0 bg-white p-2 badge">
    {num}
  </div>
);

export default Cart;
