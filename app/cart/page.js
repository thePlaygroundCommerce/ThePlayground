import OrderList from "components/OrderList";
import CartLayout from "layouts/CartLayout";
import React from "react";

const Cart = () => {
  return false ? <EmptyCart /> : <OrderList></OrderList>;
};

const EmptyCart = () => (
  <div className="text-center">
    <p>You dont have any items in your cart.</p>
  </div>
);

Cart.Layout = CartLayout;

export default Cart;
