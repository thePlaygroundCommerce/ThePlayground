/* eslint-disable react/react-in-jsx-scope */
"use client";
import { useCartModifier } from "context/cartContext";
import Image from "next/image";
import { OrderLineItem } from "square";
import Money from "./Money";
import clsx from "clsx";

// type Props = AppProps & {
//   params: { slug: string };
// };

const OrderList = ({ allowOrderItemDeletion = true, allowOrderModify = false, lineItems, lineItemImages, ...rest }: any) => {
  const {
    cart: { lineItems: _lineItems = [] },
    cartItemImages,
    CartQuantityCounter,
  } = useCartModifier();

  const items = lineItems ?? _lineItems
  const images = lineItemImages ?? cartItemImages

  if (items.length === 0)
    return <p className="text-center">There are no items in the cart.</p>;

  return (
    <div {...rest}>
      {items?.map((item: OrderLineItem, i: number) => {
        const catalogObjectId = item.catalogObjectId as string
        const lineItemImage = images[catalogObjectId];
        const optionInitial = item.variationName?.split(", ").pop()!.slice(0,1).toUpperCase()

        return (
          <div key={item.uid} className={clsx("min-h-48 grid grid-cols-5 py-4", i > 0 && "border-t")}>
            <div className="col-span-2 relative border-r">
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
                    SIZE : {optionInitial}
                  </p>
                  <Money className="m-0" number={item.basePriceMoney?.amount ?? 0} />
                </div>
                {allowOrderModify && (
                  <div className="m-3">
                    {CartQuantityCounter(item)}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderList;
