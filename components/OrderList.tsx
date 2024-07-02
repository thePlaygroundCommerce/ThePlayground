/* eslint-disable react/react-in-jsx-scope */
"use client";
import { useCartModifier } from "context/cartContext";
import Image from "next/image";
import { IconContext } from "react-icons";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { AppProps } from "types";
import Counter from "./Counter";

// type Props = AppProps & {
//   params: { slug: string };
// };

const OrderList = ({ allowOrderItemDeletion = true, ...rest }) => {
  const {
    cart: { lineItems = [] },
    cartItemImages,
    CartQuantityCounter,
  } = useCartModifier();

  if (lineItems && lineItems.length === 0)
    return <p className="text-center">There are no items in the cart.</p>;

  return (
    <div {...rest}>
      {lineItems?.map((item) => {
        const catalogObjectId = item.catalogObjectId as string
        const lineItemImage = cartItemImages[catalogObjectId];

        return (
          <div key={item.uid} className="grid grid-cols-5">
            <div className="col-span-2 relative">
              {lineItemImage?.url && (
                <Image
                  src={lineItemImage.url}
                  alt={lineItemImage.caption ?? ""}
                  objectFit="contain"
                  fill
                />
              )}
            </div>

            <div className="col-span-3">
              <div className="text-center">
                <p>{item.name}</p>
              </div>

              <div className="text-center">
                <div>
                  <p className="m-0">
                    SIZE : {item.variationName && item.variationName[0].toUpperCase()}
                  </p>
                  <p className="m-0">$ {item.basePriceMoney && item.basePriceMoney.amount}</p>
                </div>
                <div className="m-3">
                  {CartQuantityCounter(item)}
                </div>
              </div>

              {/* <div className="flex justify-around">
                {allowOrderItemDeletion && (
                  <div className="ml-5">
                    <IconContext.Provider value={{ size: "1.5em" }}>
                      <AiOutlineMinusCircle
                        onClick={() => deleteCartItem(item.uid)}
                      />
                    </IconContext.Provider>
                  </div>
                )}
              </div> */}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderList;
