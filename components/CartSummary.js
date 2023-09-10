import React from "react";
import OrderList from "./OrderList";

const CartSummary = ({ order }) => {
  return (
    <>
      <div
        style={{ minHeight: 100, maxHeight: 200, overflowX: "hidden" }}
        className="p-2 border-bottom"
      >
        <OrderList orders={order?.lineItems} />
      </div>
      <div>
        <CartFooter />
      </div>
    </>
  );
};

const CartFooter = () => (
  <>
    <div className=" mt-1">
      <div className="">
        <div className="flex justify-content-between">
          <p>Subtotal</p>
          <p>$30</p>
        </div>
        {/* <div className="flex justify-content-between">
            <p>Discounts</p>
            <p>$30</p>
          </div>
          <div className="flex justify-content-between">
            <p>Shipping</p>
            <p>$30</p>
          </div>
          <div className="flex justify-content-between">
            <p>Order Total</p>
            <p>$30</p>
          </div> */}
      </div>
    </div>
    {/* <div className="border  p-2">
        <div className="">
          <InputGroup>
            <FloatingLabel label="Enter Promotional Code">
              <div
                className="border-0 border-bottom rounded-0"
                placeholder="Enter Promotional Code"
              />
            </FloatingLabel>
            <button variant="dark">Apply</button>
          </InputGroup>
        </div>
      </div> */}
    <div className="text-center flex">
      {/* <button className=" mx-2" variant="dark">
        View Cart
      </button> */}
      <button className=" mx-2" variant="dark">
        Checkout Now
      </button>
    </div>
  </>
);

export default CartSummary;
