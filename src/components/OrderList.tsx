
"use client";
import { useCartModifier } from "@/context/cartContext";
import Image from "@/components/Image";
import { CatalogImage, CatalogObject, OrderLineItem } from "square";
import Money from "./Money";
import clsx from "clsx";
import Heading from "./typography/Heading";
import { Fragment } from "react";

import { HiXMark } from "react-icons/hi2";
import Button from "./Button";
import Divider from "./Divider";
import { AppProps } from "index";
import { useInventory } from "@/context/inventoryContext";

const OrderList = ({ children, allowOrderItemDeletion = true, allowOrderModify = false, lineItems, lineItemImages, options: opts, ...rest }: {
  lineItems?: OrderLineItem[]
  lineItemImages?: Record<string, CatalogImage>
  options?: Record<string, [string | null | undefined, (CatalogObject | undefined)[]]>
  allowOrderItemDeletion?: boolean,
  allowOrderModify?: boolean
} & AppProps) => {
  const isEnvProd = process.env.NODE_ENV !== 'development'
  const SIZE_ITEM_OPTION = isEnvProd ? "TJKR2ZFECR3FKAEFBKWZTGDT" : "HIIUIQFG2DNYNZAPP5ULBHVF";
  const COLOR_ITEM_OPTION = isEnvProd ? "YX56PMWCLQTWXRB3TRZWZGRT" : "IUGCLICCHV4GAWV2KD5C2NF7";
  const {
    cart: { lineItems: _lineItems = [] },
    cartItemImages,
    modifyCart,
    CartQuantityCounter,
  } = useCartModifier();

  const { itemOptions } = useInventory()

  const options = opts;
  const items = lineItems ?? _lineItems
  const images = lineItemImages ?? cartItemImages

  const render = (
    <div className="k-cart-list-wrapper">
      {/* <div className="k-cart-header">
        <div className="text-uppercase">Product</div>
        <div className="text-uppercase">description</div>
        <div className="text-uppercase">price</div>
        <div className="text-uppercase">quanity</div>
        <div className="text-uppercase">TOTAL</div>
        <div className="text-uppercase" />
      </div> */}
      <div className="w-dyn-list"  {...rest}>
        <div role="list" className="w-dyn-items">
          {items?.map((item: OrderLineItem, i: number) => {
            const catalogObjectId = item.catalogObjectId as string
            const lineItemImage = images[catalogObjectId];


            let sizeOpt: string = "";
            let colorOpt: string = "";

            if (options) {
              // sizeOpt = (options[item.catalogObjectId as string][SIZE_ITEM_OPTION] ?? [])[0]?.itemOptionValueData.name
              // colorOpt = (options[item.catalogObjectId as string][COLOR_ITEM_OPTION] ?? [])[0]?.itemOptionValueData.name
            }

            return (
              <div key={item.uid} role="listitem" className="k-cart-cl-item w-dyn-item">
                {/* <div className="w-fit ml-auto text-xs mr-8"><Button className="underline text-gray-700">MODIFY</Button></div> */}
                <div className="k-cart-item justify-center min-h-30">
                  <div className="k-cart-block relative">
                    {lineItemImage?.url && (
                      <Image
                        src={lineItemImage.url}
                        alt={lineItemImage.caption ?? ""}
                        className="k-cart-p-image"
                        width={1080}
                        height={1080}
                      />
                    )}
                  </div>
                  <div className="k-cart-block">
                    <div className="k-cart-p-name mx-auto">
                      {item.name}
                    </div>
                    <div
                      data-wf-sku-bindings="%5B%7B%22from%22%3A%22f_sku_%22%2C%22to%22%3A%22innerHTML%22%7D%5D"
                      className="k-product-sku k-sku--margin-2 w-dyn-bind-empty"
                    />
                  </div>
                  <div className="k-cart-block">
                    <div className="k-cart-p-name mx-auto">
                      {item.quantity}
                    </div>
                  </div>
                  <div className="k-cart-block">
                    <div
                      data-wf-sku-bindings="%5B%7B%22from%22%3A%22f_price_%22%2C%22to%22%3A%22innerHTML%22%7D%5D"
                      className="k-cart-p-name mx-auto"
                    >
                      <Money className="m-0" number={item.basePriceMoney?.amount ?? 0} />
                    </div>
                  </div>
                  {allowOrderItemDeletion && (
                    <div className="k-cart-block">
                      <a href="#" className="w-inline-block mx-auto">
                        <Button onClick={() => modifyCart(item, undefined, true)} className="k-cross-link w-embed">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1={18} y1={6} x2={6} y2={18} />
                            <line x1={6} y1={6} x2={18} y2={18} />
                          </svg>
                        </Button>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )

  if (items?.length === 0)
    return <p className=" m-4 text-center">There are no items in the cart.</p>;

  return render;
};

export default OrderList;
