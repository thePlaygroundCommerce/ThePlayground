
"use client";
import { useCartModifier } from "context/cartContext";
import Image from "components/Image";
import { OrderLineItem } from "square";
import Money from "./Money";
import clsx from "clsx";
import Heading from "./typography/Heading";
import { Fragment } from "react";

import { HiXMark } from "react-icons/hi2";
import Button from "./Button";
import Divider from "./Divider";

const OrderList = ({ children, allowOrderItemDeletion = true, allowOrderModify = false, lineItems, lineItemImages, options, ...rest }: any) => {
  const isEnvProd = process.env.NODE_ENV !== 'development'
  const SIZE_ITEM_OPTION = isEnvProd ? "TJKR2ZFECR3FKAEFBKWZTGDT" : "HIIUIQFG2DNYNZAPP5ULBHVF";
  const COLOR_ITEM_OPTION = isEnvProd ? "YX56PMWCLQTWXRB3TRZWZGRT" : "IUGCLICCHV4GAWV2KD5C2NF7";
  const {
    cart,
    cart: { lineItems: _lineItems = [] },
    cartItemImages,
    modifyCart,
    CartQuantityCounter,
  } = useCartModifier();

  const items = lineItems ?? _lineItems
  const images = lineItemImages ?? cartItemImages

  const render = (
    <div {...rest}>
      {items?.map((item: OrderLineItem, i: number) => {
        const catalogObjectId = item.catalogObjectId as string
        const lineItemImage = images[catalogObjectId];
        const sizeOpt = (options[item.catalogObjectId as string][SIZE_ITEM_OPTION] ?? [])[0]?.itemOptionValueData.name
        const colorOpt = (options[item.catalogObjectId as string][COLOR_ITEM_OPTION] ?? [])[0]?.itemOptionValueData.name

        return (
          <Fragment key={item.uid}>
            <div className={clsx("min-h-48 grid grid-cols-5 py-4")}>
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
                
                <div className="flex justify-between">
                  <Heading level={6}>{item.name}</Heading>
                  <Button onClick={() => modifyCart(item, undefined, true)}><HiXMark size={24} /></Button>
                </div>

                <div className="">
                  <div>
                    <div className="flex gap-3">
                      <p className="m-0">
                        {sizeOpt && `SIZE : ${sizeOpt.split("#" ).shift()!.slice(0, 1).toUpperCase()}`}
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
      { }
    </div>
  )

  if (items.length === 0)
    return <p className=" m-4 text-center">There are no items in the cart.</p>;
  if (typeof children === 'function')
    return children(cart, render)

  return render;
};

export default OrderList;
