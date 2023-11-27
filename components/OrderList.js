"use client";
import { useCart } from "context/cartContext";
import { IconContext } from "react-icons";
import { AiOutlineMinusCircle } from "react-icons/ai";


const OrderList = ({ orders, allowOrderItemDeletion = true, ...rest }) => {
  const {
    cart: {
      lineItems = []
    },
    cartItemImages,
    deleteCartItem,
  } = useCart();

  if (!lineItems.length > 0)
    return <p className="text-center">There are no items in the cart.</p>;

    console.log(cartItemImages)
  return (
    <div {...rest}>
      {lineItems?.map((item) => (
        <div key={item.uid} className="grid grid-cols-8">
          <div className="col-span-2">
            {/* <div
              className=" bg-secondary"
              style={{ height: 130.33 }}
            ></div> */}
          </div>

          <div className="col-span-4">
            <p>{item.name}</p>
          </div>

          <div className="col-span-1">
            <p className="m-0">SIZE : {item.variationName[0].toUpperCase()}</p>
            <p className="m-0">QTY : {item.quantity}</p>
            <p className="m-0">$ {item.basePriceMoney.amount}</p>
          </div>

          <div className="flex justify-around">
            {allowOrderItemDeletion && (
              <div className="ml-5">
                <IconContext.Provider value={{ size: "1.5em" }}>
                  <AiOutlineMinusCircle onClick={() => deleteCartItem(item.uid)} />
                </IconContext.Provider>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderList;
