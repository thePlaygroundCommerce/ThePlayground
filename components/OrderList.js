'use client'
import { CartContext } from "context/cartContext";
import React, { useContext } from "react";
import { IconContext } from "react-icons";
import { IoClose } from "react-icons/io5";

const OrderList = ({ orders, showCrossIcon, ...rest }) => {
  const {
    cart: { order, itemVariationsIDs },
  } = useContext(CartContext);
  if (!itemVariationsIDs.length > 0)
    return <p className="text-center">There are no items in the cart.</p>;

  console.log(orders);
  return (
    <div variant="" {...rest}>
      {orders?.map((item) => (
        <div key={item.uid} className="flex div">
          <div className="div-2">
            {/* <div
              className="w-100 bg-secondary"
              style={{ height: 130.33 }}
            ></div> */}
          </div>
          <div className="div-6 flex items-center">
            <p>{item.name}</p>
          </div>
          <div className="div flex flex-divumn justify-content-center">
            <p className="m-0">SIZE : {item.variationName[0].toUpperCase()}</p>
            <p className="m-0">QTY : {item.quantity}</p>
            <p className="m-0">$ {item.basePriceMoney.amount}</p>
          </div>
          {showCrossIcon && (
            <div className="div-1  flex items-center justify-end">
              <IconContext.Provider value={{ size: "2em" }}>
                <IoClose onClick={() => console.log("Hello")} />
              </IconContext.Provider>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default OrderList;
