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
}: ProductDetailsProps) => {
  // const productDesc = itemData.descriptionHtml ? (
  //   ReactHtmlParser(itemData.descriptionHtml)
  // ) : (
  //   <p>{itemData.description || "No Details Available!"}</p>
  // );

  const isProductInCart = _isProductInCart()

  return (
    <div className="k-product-details relative">
      {/* <div
        data-wf-sku-bindings="%5B%7B%22from%22%3A%22f_sku_%22%2C%22to%22%3A%22innerHTML%22%7D%5D"
        className="k-product-sku"
      >
        REF. 87035655-ALOHA-LO
      </div> */}
      {/* <div className="k-heading-line k-line-space-around" /> */}
      <div className="min-h-[50vh] flex flex-col">
        {productImageGallery}
      </div>
      <div className="flex justify-between mb-2 mt-6">
        <div
          data-wf-sku-bindings="%5B%7B%22from%22%3A%22f_price_%22%2C%22to%22%3A%22innerHTML%22%7D%5D"
          className="k-product-price"
        >
          <Money className="font-bold text-xl" number={price} />
        </div>
        <Rating amount={5} />
      </div>
      <h2>{name}</h2>
      {/* <p className="k-product-main-desc">
        {description}
      </p> */}
      <div className="mt-4 flex flex-col gap-4">
        {Object.entries(selectors).map(([k, v]) => (
          <div key={k}>
            <p>{_.capitalize(k)}</p>
            <Selector {...v} />
          </div>
        ))}
      </div>
      <div className="k-add-to-cart-widget">
        <form
          data-node-type="commerce-add-to-cart-form"
          data-commerce-sku-id="6084f36628908f57871aa8fe"
          data-loading-text="Adding to cart..."
          data-commerce-product-id="6084f3654a978ce1fb06ead6"
          className="w-commerce-commerceaddtocartform"
        >
          <div className="block sm:flex lg:block justify-between">
            <div className="btn-wrap-1">
              <Button
                loading={isCartLoading}
                data-node-type="commerce-add-to-cart-button"
                data-loading-text="Adding to cart..."
                aria-busy="false"
                aria-haspopup="dialog"
                className="w-commerce-commerceaddtocartbutton k-btn w-full justify-center"
                onClick={isProductInCart ? cartModifiers.handleRemoveFromCart : cartModifiers.handleAddToCart}
              >
                {isProductInCart ? "Remove from Cart" : "Add To Cart"}
              </Button>
            </div>
            {/* <div className="btn-wrap-1">
              <Button
                loading={isCheckoutLoading}
                data-node-type="commerce-buy-now-button"
                data-default-text="Buy now"
                data-subscription-text="Subscribe now"
                aria-busy="false"
                aria-haspopup="false"
                // style={{ display: "none" }}
                onClick={cartModifiers.handleBuyNow}
                className="w-commerce-commercebuynowbutton mt-2 sm:mt-0 lg:mt-2 k-btn bg-black"
              // href="/checkout"
              >
                Buy now
              </Button>
            </div> */}
          </div>
          {/* <div className="grid grid-cols-1 gap-1 justify-around w-full">
            {cartModifiers}
            <div className="p-2">
              <p className="text-xs text-zinc-600 text-center">🇺🇸 Ships within <span className="text-mintcream-600">3 business days.</span></p>
            </div>
          </div> */}
        </form>
        <div
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
        </div>
      </div>
      {/* <div className="absolute h-screen bg-white top-0 left-0 w-full">
            Hello
      </div> */}
    </div>
  )
};

export default withProductModifiers(ProductDetails);
