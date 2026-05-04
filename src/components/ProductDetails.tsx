"use client";
import _ from "lodash";
import Money from "./Money";
import withProductModifiers, {
  CartModifiers,
  Selectors,
  WithProductModifiersProps,
} from "@/hocs/withProductModifiers";
import Button from "./Button";
import { ReactNode } from "react";
import Rating from "./Rating";
import Modal from "./Modal";
import Selector from "./ColorSelector";
import { BsArrowDownLeftCircle } from "react-icons/bs";
import AddToCart from "./forms/AddToCart";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";

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
  addToCart
}: ProductDetailsProps) => {
  // const productDesc = itemData.descriptionHtml ? (
  //   ReactHtmlParser(itemData.descriptionHtml)
  // ) : (
  //   <p>{itemData.description || "No Details Available!"}</p>
  // );

  const isProductInCart = _isProductInCart()

  const nameAndPrice = (
    <div className="p-4">
      <div
        data-wf-sku-bindings="%5B%7B%22from%22%3A%22f_price_%22%2C%22to%22%3A%22innerHTML%22%7D%5D"
        className="k-product-price"
      >
        <Money className="font-medium text-lg " number={price} />
      </div>
      <h1 className="mb-4 p-0 font-bold">{name}</h1>
    </div>
  )

  const headAndCaption = (
    <div className="p-4">
      <h1 className="mb-2 p-0 font-black text-3xl">The Best Bone Broth For All-In-One Nutrition</h1>
      <p className="text-lg">Kettle & Fire is the only bone broth that's delicious, nutritious, and ready to eat in seconds.</p>
    </div>
  )

  return (
    <div className="flex flex-col relative h-full">
      <div className="hidden md:block">
        {nameAndPrice}
      </div>
      {/* <div
        data-wf-sku-bindings="%5B%7B%22from%22%3A%22f_sku_%22%2C%22to%22%3A%22innerHTML%22%7D%5D"
        className="k-product-sku"
      >
        REF. 87035655-ALOHA-LO
      </div> */}
      {/* <div className="k-heading-line k-line-space-around" /> */}
      <div className="flex-1 flex flex-col h-full">
        <div className="overflow-hidden min-h-0 h-1/3">
          {productImageGallery}
        </div>
        <div>
          {headAndCaption}
        </div>
        {/* <div className="flex justify-between mb-2 mt-6 flex-1">
        <div
          data-wf-sku-bindings="%5B%7B%22from%22%3A%22f_price_%22%2C%22to%22%3A%22innerHTML%22%7D%5D"
          className="k-product-price"
        >
          <Money className="font-bold text-xl" number={price} />
        </div>
        <Rating amount={5} />
      </div> */}
        {/* <h2>{name}</h2> */}
        {/* <p className="k-product-main-desc">
        {description}
      </p> */}
        <A items={[
          "All-in-one nutrition your body needs to thrive",
          "Quick and easy snack that's high protein and low carb",
          "Clean ingredients to support your gut and immunity",
          "Delicious flavors that won't sacrifice your health goals"
        ]} />
        {/* <div className="mt-4 flex flex-col gap-4 p-4">
          {Object.entries(selectors).map(([k, v]) => (
            <div key={k}>
              <p className="font-semibold uppercase mb-4">{_.capitalize(k)}</p>
              <Selector {...v} />
            </div>
          ))}
        </div> */}
        {/* <div className="bg-linear-to-t from-black to-[#2D3436]"> */}
        {/* <div className="bg-[linear-gradient(to_bottom,#434343,#000000)]"> */}
        <div className="gradient_mesh flex flex-col justify-center">
          <div className="p-4 uppercase">
            <p>use code HG25 for 20% off</p>
          </div>
          <div className="k-add-to-cart-widget text-white border-white p-4">
            {addToCart}
          </div>
        </div>

        <div className="flex">
          <div>
            <div>x</div>
            <p>Mouthwatering Flavors</p>
          </div>
          <div>
            <div>x</div>
            <p>Mouthwatering Flavors</p>
          </div>
          <div>
            <div>x</div>
            <p>Mouthwatering Flavors</p>
          </div>
        </div>

      </div>
    </div>
  )
};

export default withProductModifiers(ProductDetails);


const A = ({ items }: { items: string[] }) => {
  return (
    <ul className="m-0 p-4">
      {items.map((item) => (
        <li key={item} className="text-xs mb-2 flex gap-2 items-center">
          <FaCircleCheck className="text-green-500 size-5" />
          {/* <div className="size-2 animate-ping bg-black rounded-full" /> */}
          <p>{item}</p>
        </li>
      ))}
    </ul>
  )
}