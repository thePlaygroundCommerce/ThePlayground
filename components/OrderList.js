"use client";
import { useCart } from "context/cartContext";
import Image from "next/image";
import { IconContext } from "react-icons";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { AppProps } from "types";

// type Props = AppProps & {
//   params: { slug: string };
// };

const OrderList = ({ orders, allowOrderItemDeletion = true, ...rest }) => {
  const {
    cart: { lineItems = [] },
    cartItemImages,
    deleteCartItem,
  } = useCart();

  if (!lineItems.length > 0)
    return <p className="text-center">There are no items in the cart.</p>;

  return (
    <div {...rest}>
      {lineItems?.map((item) => {
        console.log(cartItemImages);
        const lineItemImage = cartItemImages[item.catalogObjectId];
        console.log(lineItemImage);
        return (
          <div key={item.uid} className="grid grid-cols-8">
            <div className="col-span-2">
              {lineItemImage && (
                <Image
                  src={cartItemImages[item.catalogObjectId].url}
                  alt={cartItemImages[item.catalogObjectId].caption}
                  height={250}
                  width={250}
                />
              )}
            </div>

            <div className="col-span-4">
              <p>{item.name}</p>
            </div>

            <div className="col-span-1">
              <p className="m-0">
                SIZE : {item.variationName[0].toUpperCase()}
              </p>
              <p className="m-0">QTY : {item.quantity}</p>
              <p className="m-0">$ {item.basePriceMoney.amount}</p>
            </div>

            <div className="flex justify-around">
              {allowOrderItemDeletion && (
                <div className="ml-5">
                  <IconContext.Provider value={{ size: "1.5em" }}>
                    <AiOutlineMinusCircle
                      onClick={() => deleteCartItem(item.uid)}
                    />
                  </IconContext.Provider>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderList;
