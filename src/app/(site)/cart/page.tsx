import Money from '@/components/Money';
import OrderList from '@/components/OrderList';
import OrderSummary from '@/components/OrderSummary';
import { useCart, useCartModifier } from '@/context/cartContext';
import { useCheckout } from '@/context/checkoutContext';
import Link from 'next/link';
import React from 'react'

type Props = {}

const page = (props: Props) => {
    // const { cart, options, calculation: { subtotal, taxes } } = useCart()
    // const { checkout } = useCheckout()
    return (
        <div className="k-hero-content">
            <div className="k-container-1">
                <div className="k-add-space-top-1 mb-4">
                    <div className="heading-2-wrapper heading-space-2">
                        <h2 className="k-h2">Shopping Cart</h2>
                    </div>
                    <div className="k-heading-line" />
                </div>
                <div className="k-cart-wrapper">
                    <div className="k-cart-form-block w-form">
                        <form
                            id="email-form"
                            name="email-form"
                            data-name="Email Form"
                            method="get"
                            className="k-cart-form"
                            data-wf-page-id="67f9692e7e88b9a05d707c93"
                            data-wf-element-id="f667c2f0-f0ea-aec5-2ea8-f0e2c5c208bd"
                            aria-label="Email Form"
                        >
                            <OrderList />
                            <OrderSummary />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page;