/* eslint-disable react/react-in-jsx-scope */
"use client";
import { useCartModifier } from "context/cartContext";
import Image from "next/image";
import { OrderLineItem } from "square";
import Money from "./Money";
import clsx from "clsx";
import { Divider } from "rsuite";
import Heading from "./typography/Heading";
import { Fragment } from "react";

// type Props = AppProps & {
//   params: { slug: string };
// };

const OrderList = ({ allowOrderItemDeletion = true, allowOrderModify = false, lineItems, lineItemImages, options, ...rest }: any) => {
  const isEnvProd = process.env.NODE_ENV !== 'development'
  const SIZE_ITEM_OPTION = isEnvProd ? "TJKR2ZFECR3FKAEFBKWZTGDT" : "HIIUIQFG2DNYNZAPP5ULBHVF";
  const COLOR_ITEM_OPTION = isEnvProd ? "YX56PMWCLQTWXRB3TRZWZGRT" : "IUGCLICCHV4GAWV2KD5C2NF7";
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
        const sizeOpt = (options[item.catalogObjectId as string][SIZE_ITEM_OPTION] ?? [])[0]?.itemOptionValueData.name
        const colorOpt = (options[item.catalogObjectId as string][COLOR_ITEM_OPTION] ?? [])[0]?.itemOptionValueData.name

        return (
          <Fragment key={item.uid}>
            <div key={item.uid} className={clsx("min-h-48 grid grid-cols-5 py-4")}>
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

              <div className="col-span-3 p-4">
                <div className="">
                  <Heading level={6}>{item.name}</Heading>
                </div>

                <div className="">
                  <div>
                    <div className="flex gap-3">
                      <p className="m-0">
                        {sizeOpt && `SIZE : ${sizeOpt.split("#").shift()!.slice(0, 1).toUpperCase()}`}
                      </p>
                      <p className="m-0">
                        {colorOpt && `COLOR : ${colorOpt.split("#").shift()!.toUpperCase()}`}

                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center gap-4">
                    {allowOrderModify && (
                      <div className="my-3">
                        {CartQuantityCounter(item)}
                      </div>
                    )}
                    <div className="grow">
                      <Money className="m-0" number={item.basePriceMoney?.amount ?? 0} />
                    </div>

                  </div>
                </div>
              </div>
            </div>
            {i != items.length - 1 && <Divider />}
          </Fragment>
        );
      })}
    </div>
  );
};

export default OrderList;
