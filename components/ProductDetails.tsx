"use client";
import _ from "lodash";
import Money from "./Money";
import withProductModifiers, {
  CartModifiers,
  Selectors,
  WithProductModifiersProps,
} from "hocs/withProductModifiers";
import Button from "./Button";
import { ReactNode } from "react";
import Rating from "./Rating";
import Modal from "./Modal";
import Selector from "./ColorSelector";
import { BsArrowDownLeftCircle } from "react-icons/bs";
import AddToCart from "./forms/AddToCart";

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

  return (
    <div className="flex flex-col relative">
      <div className="p-4">
        <div
          data-wf-sku-bindings="%5B%7B%22from%22%3A%22f_price_%22%2C%22to%22%3A%22innerHTML%22%7D%5D"
          className="k-product-price"
        >
          <Money className="font-medium text-lg " number={price} />
        </div>
        <h1 className="mb-4 p-0 font-bold">{name}</h1>
      </div>
      {/* <div
        data-wf-sku-bindings="%5B%7B%22from%22%3A%22f_sku_%22%2C%22to%22%3A%22innerHTML%22%7D%5D"
        className="k-product-sku"
      >
        REF. 87035655-ALOHA-LO
      </div> */}
      {/* <div className="k-heading-line k-line-space-around" /> */}
      <div className="flex flex-col flex-1 overflow-hidden min-h-0">
        {productImageGallery}
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
      <div className="mt-4 flex flex-col gap-4 p-4">
        {Object.entries(selectors).map(([k, v]) => (
          <div key={k}>
            <p className="font-semibold uppercase mb-4">{_.capitalize(k)}</p>
            <Selector {...v} />
          </div>
        ))}
      </div>
      <div className="k-add-to-cart-widget p-4">
        {addToCart}
        {/* <div
          style={{ display: "none" }}
          className="w-commerce-commerceaddtocartoutofstock"
          tabIndex={0}
        >
          <div>This product is out of stock.</div>
        </div>
        <div
          aria-live="off"
          data-node-type="commerce-add-to-cart-error"
          style={{ display: "none" }}
          className="w-commerce-commerceaddtocarterror"
        >
          <div
            data-node-type="commerce-add-to-cart-error"
            data-w-add-to-cart-quantity-error="Product is not available in this quantity."
            data-w-add-to-cart-general-error="Something went wrong when adding this item to the cart."
            data-w-add-to-cart-mixed-cart-error="You can't purchase another product with a subscription."
            data-w-add-to-cart-buy-now-error="Something went wrong when trying to purchase this item."
            data-w-add-to-cart-checkout-disabled-error="Checkout is disabled on this site."
            data-w-add-to-cart-select-all-options-error="Please select an option in each set."
          >
            Product is not available in this quantity.
          </div>
        </div> */}
      </div>
    </div>
  )
};

export default withProductModifiers(ProductDetails);
