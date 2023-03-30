import CartList from "components/CartList";
import CartLayout from "layouts/CartLayout";
import React from "react";
import { Container } from "react-bootstrap";

const Cart = () => {
  return false ? <EmptyCart /> : <CartList></CartList>;
};

const EmptyCart = () => (
  <div className="text-center">
    <p>You dont have any items in your cart.</p>
  </div>
);

Cart.Layout = CartLayout;

export default Cart;
