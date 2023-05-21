import { CartContext } from "context/cartContext";
import React, { useContext } from "react";
import { ListGroup } from "react-bootstrap";
import { IconContext } from "react-icons";
import { IoClose } from "react-icons/io5";

const CartList = (...rest) => {
  const {
    cart: { order, itemVariationsIDs },
  } = useContext(CartContext);
  if (!itemVariationsIDs.length > 0)
    return <p className="text-center">There are no items in the cart.</p>;

  return (
    <ListGroup variant="flush" {...rest}>
      {order.lineItems.map(item => (
        <ListGroup.Item key={item.uid} className="d-flex row">
          <div className="col-2">
            {/* <div
              className="w-100 bg-secondary"
              style={{ height: 130.33 }}
            ></div> */}
          </div>
          <div className="col-6 d-flex align-items-center">
            <p>{item.name}</p>
          </div>
          <div className="col-3 d-flex flex-column justify-content-center">
            <p className="m-0">SIZE : {item.variationName[0].toUpperCase()}</p>
            <p className="m-0">QTY : {item.quantity}</p>
            <p className="m-0">$ {item.basePriceMoney.amount}</p>
          </div>
          <div className="col-1  d-flex align-items-center justify-content-end">
            <IconContext.Provider value={{ size: "2em" }}>
              <IoClose onClick={() => console.log("Hello")}/>
            </IconContext.Provider>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default CartList;
