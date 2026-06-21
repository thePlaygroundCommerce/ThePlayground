"use client";
import _ from "lodash";
import Money from "./Money";
import withProductModifiers, {
  CartModifiers,
  Selectors,
  WithProductModifiersProps,
} from "@/hocs/withProductModifiers";
import { ReactNode } from "react";
import Selector from "./ColorSelector";

export type ProductDetailsProps = {
  price: number
  name: string
  description: string
  selectors: Selectors
  cartModifiers: CartModifiers
  productImageGallery: ReactNode
} & WithProductModifiersProps

const ProductDetails = ({
  productImageGallery,
  isCartLoading,
  isCheckoutLoading,
  isProductInCart: _isProductInCart,
  description,
  name,
  price,
  selectors,
  cartModifiers,
  addToCart,
  buyNow
}: ProductDetailsProps) => {
  // const productDesc = itemData.descriptionHtml ? (
  //   ReactHtmlParser(itemData.descriptionHtml)
  // ) : (
  //   <p>{itemData.description || "No Details Available!"}</p>
  // );

  const isProductInCart = _isProductInCart()

  const nameAndPrice = (
    <div className="">
      <div
        data-wf-sku-bindings="%5B%7B%22from%22%3A%22f_price_%22%2C%22to%22%3A%22innerHTML%22%7D%5D"
        className="k-product-price"
      >
        <Money className="font-medium text-xl " number={price} />
      </div>
      <h1 className="mb-4 p-0 font-bold text-4xl md:text-6xl">{name}</h1>
    </div>
  )

  return (
    <div className="flex flex-col relative h-full">
      {/* <div
        data-wf-sku-bindings="%5B%7B%22from%22%3A%22f_sku_%22%2C%22to%22%3A%22innerHTML%22%7D%5D"
        className="k-product-sku"
      >
        REF. 87035655-ALOHA-LO
      </div> */}
      <div className="mb-6 md:flex gap-4 md:min-h-[75vh] md:m-24">
        <div className="flex-1 h-[45vh] md:h-auto overflow-hidden">
          {productImageGallery}
        </div>
        <div className="h-full flex-1 flex flex-col gap-2 md:gap-12 justify-center p-8 md:p-0">
          <div className="md:justify-center">
            <div>
              {nameAndPrice}
            </div>
            <p className="k-product-main-desc">
              {description}
            </p>
            <div className="mt-4 flex flex-row justify-around gap-4 p-4">
              {Object.entries(selectors).map(([k, v]) => (
                <div key={k}>
                  <p className="font-semibold uppercase mb-4">{_.capitalize(k)}</p>
                  <Selector {...v} />
                </div>
              ))}
            </div>
            <div className=" flex flex-col gap-2 items-center mt-8 ">
              {/* <div className="text-xs uppercase">
                <p>use code HG25 for 20% off</p>
              </div> */}
              {buyNow}
              <div className="k-add-to-cart-widget m-0 p-4">
                {addToCart}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default withProductModifiers(ProductDetails);
