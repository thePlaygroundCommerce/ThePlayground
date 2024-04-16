import OrderList from "components/OrderList";

const Cart = () => {
  return false ? <EmptyCart /> : <OrderList></OrderList>;
};

const EmptyCart = () => (
  <div className="text-center">
    <p>You dont have any items in your cart.</p>
  </div>
);


export default Cart;
