import Button from '@/components/Button'
import Form from 'next/form'
import React, { ReactNode } from 'react'

type Props = {
    inputs?: ReactNode
    children?: ReactNode
    action: NonNullable<string | ((formData: FormData) => void | Promise<void>) | undefined>
}

const AddToCart = ({
    inputs,
    action,
    children,
}: Props) => {
    return (
        <Form
            action={action}
            data-node-type="commerce-add-to-cart-form"
            data-commerce-sku-id="6084f36628908f57871aa8fe"
            data-loading-text="Adding to cart..."
            data-commerce-product-id="6084f3654a978ce1fb06ead6"
            className="w-commerce-commerceaddtocartform"
        >
            {inputs}
            <div className="block sm:flex lg:block justify-between">
                <div className="btn-wrap-1">
                    <Button
                        type='submit'
                        // loading={isCartLoading}
                        data-node-type="commerce-add-to-cart-button"
                        data-loading-text="Adding to cart..."
                        aria-busy="false"
                        aria-haspopup="dialog"
                        className="w-commerce-commerceaddtocartbutton k-btn w-full justify-center"
                    // onClick={isProductInCart ? cartModifiers.handleRemoveFromCart : cartModifiers.handleAddToCart}
                    >
                        {children}
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
        </Form>
    )
}

export default AddToCart