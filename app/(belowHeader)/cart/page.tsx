'use client'

import Money from 'components/Money';
import OrderList from 'components/OrderList';
import { useCart, useCartModifier } from 'context/cartContext';
import { useCheckout } from 'context/checkoutContext';
import Link from 'next/link';
import React from 'react'

type Props = {}

const page = (props: Props) => {
    const { cart, options, calculation: { subtotal, taxes } } = useCart()
    const { checkout } = useCheckout()
    return (
        <div className="k-hero-content">
            <div className="k-container-1">
                <div className="k-add-space-top-1">
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
                            <div className="k-cart-list-wrapper">
                                {/* <div className="k-cart-header">
                                    <div className="text-uppercase">Product</div>
                                    <div className="text-uppercase">description</div>
                                    <div className="text-uppercase">price</div>
                                    <div className="text-uppercase">units</div>
                                    <div className="text-uppercase">TOTAL</div>
                                    <div className="text-uppercase"></div>
                                </div> */}
                                <OrderList options={options} />
                                {/* <div className="w-dyn-list">
                                    <div role="list" className="w-dyn-items">
                                        <div role="listitem" className="k-cart-cl-item w-dyn-item">
                                            <div className="k-cart-item">
                                                <img
                                                    alt=""
                                                    loading="lazy"
                                                    data-wf-sku-bindings="%5B%7B%22from%22%3A%22f_main_image_4dr%22%2C%22to%22%3A%22src%22%7D%5D"
                                                    src="https://cdn.prod.website-files.com/67f9692e7e88b9a05d707cb1/68059d1135ad71863b396529_4.jpg"
                                                    sizes="(max-width: 479px) 59.65625px, (max-width: 991px) 14vw, (max-width: 1439px) 110px, 100vw"
                                                    srcSet="https://cdn.prod.website-files.com/67f9692e7e88b9a05d707cb1/68059d1135ad71863b396529_4-p-500.jpg 500w, https://cdn.prod.website-files.com/67f9692e7e88b9a05d707cb1/68059d1135ad71863b396529_4-p-800.jpg 800w, https://cdn.prod.website-files.com/67f9692e7e88b9a05d707cb1/68059d1135ad71863b396529_4-p-1080.jpg 1080w, https://cdn.prod.website-files.com/67f9692e7e88b9a05d707cb1/68059d1135ad71863b396529_4-p-1600.jpg 1600w, https://cdn.prod.website-files.com/67f9692e7e88b9a05d707cb1/68059d1135ad71863b396529_4.jpg 1728w"
                                                    className="k-cart-p-image"
                                                />
                                                <div className="k-cart-block">
                                                    <div className="k-cart-p-name">
                                                        Gray Water Resistant Utility Backpack
                                                    </div>
                                                    <div
                                                        data-wf-sku-bindings="%5B%7B%22from%22%3A%22f_sku_%22%2C%22to%22%3A%22innerHTML%22%7D%5D"
                                                        className="k-product-sku k-sku--margin-2 w-dyn-bind-empty"
                                                    />
                                                </div>
                                                <div className="k-cart-block">
                                                    <div
                                                        data-wf-sku-bindings="%5B%7B%22from%22%3A%22f_price_%22%2C%22to%22%3A%22innerHTML%22%7D%5D"
                                                        className="k-cart-p-name"
                                                    >
                                                        $&nbsp;49.99&nbsp;USD
                                                    </div>
                                                </div>
                                                <div className="k-cart-block">
                                                    <div className="k-cart-p-name">1</div>
                                                </div>
                                                <div className="k-cart-block">
                                                    <div
                                                        data-wf-sku-bindings="%5B%7B%22from%22%3A%22f_price_%22%2C%22to%22%3A%22innerHTML%22%7D%5D"
                                                        className="k-cart-p-name"
                                                    >
                                                        $&nbsp;49.99&nbsp;USD
                                                    </div>
                                                </div>
                                                <div className="k-cart-block">
                                                    <a href="#" className="w-inline-block">
                                                        <div className="k-cross-link w-embed">
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
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div role="listitem" className="k-cart-cl-item w-dyn-item">
                                            <div className="k-cart-item">
                                                <img
                                                    alt=""
                                                    loading="lazy"
                                                    data-wf-sku-bindings="%5B%7B%22from%22%3A%22f_main_image_4dr%22%2C%22to%22%3A%22src%22%7D%5D"
                                                    src="https://cdn.prod.website-files.com/67f9692e7e88b9a05d707cb1/68059d621e8f68613b0d4042_2.jpg"
                                                    sizes="(max-width: 479px) 59.65625px, (max-width: 991px) 14vw, (max-width: 1439px) 110px, 100vw"
                                                    srcSet="https://cdn.prod.website-files.com/67f9692e7e88b9a05d707cb1/68059d621e8f68613b0d4042_2-p-500.jpg 500w, https://cdn.prod.website-files.com/67f9692e7e88b9a05d707cb1/68059d621e8f68613b0d4042_2-p-800.jpg 800w, https://cdn.prod.website-files.com/67f9692e7e88b9a05d707cb1/68059d621e8f68613b0d4042_2-p-1080.jpg 1080w, https://cdn.prod.website-files.com/67f9692e7e88b9a05d707cb1/68059d621e8f68613b0d4042_2-p-1600.jpg 1600w, https://cdn.prod.website-files.com/67f9692e7e88b9a05d707cb1/68059d621e8f68613b0d4042_2.jpg 1728w"
                                                    className="k-cart-p-image"
                                                />
                                                <div className="k-cart-block">
                                                    <div className="k-cart-p-name">
                                                        Messenger CrossBody Shoulder Bag
                                                    </div>
                                                    <div
                                                        data-wf-sku-bindings="%5B%7B%22from%22%3A%22f_sku_%22%2C%22to%22%3A%22innerHTML%22%7D%5D"
                                                        className="k-product-sku k-sku--margin-2 w-dyn-bind-empty"
                                                    />
                                                </div>
                                                <div className="k-cart-block">
                                                    <div
                                                        data-wf-sku-bindings="%5B%7B%22from%22%3A%22f_price_%22%2C%22to%22%3A%22innerHTML%22%7D%5D"
                                                        className="k-cart-p-name"
                                                    >
                                                        $&nbsp;25.99&nbsp;USD
                                                    </div>
                                                </div>
                                                <div className="k-cart-block">
                                                    <div className="k-cart-p-name">1</div>
                                                </div>
                                                <div className="k-cart-block">
                                                    <div
                                                        data-wf-sku-bindings="%5B%7B%22from%22%3A%22f_price_%22%2C%22to%22%3A%22innerHTML%22%7D%5D"
                                                        className="k-cart-p-name"
                                                    >
                                                        $&nbsp;25.99&nbsp;USD
                                                    </div>
                                                </div>
                                                <div className="k-cart-block">
                                                    <a href="#" className="w-inline-block">
                                                        <div className="k-cross-link w-embed">
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
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div role="listitem" className="k-cart-cl-item w-dyn-item">
                                            <div className="k-cart-item">
                                                <img
                                                    alt=""
                                                    loading="lazy"
                                                    data-wf-sku-bindings="%5B%7B%22from%22%3A%22f_main_image_4dr%22%2C%22to%22%3A%22src%22%7D%5D"
                                                    src="https://cdn.prod.website-files.com/67f9692e7e88b9a05d707cb1/67f9692e7e88b9a05d707d45_87045130_99_D7.jpeg"
                                                    className="k-cart-p-image"
                                                />
                                                <div className="k-cart-block">
                                                    <div className="k-cart-p-name">
                                                        Organic printed cotton double t-shirt{" "}
                                                    </div>
                                                    <div
                                                        data-wf-sku-bindings="%5B%7B%22from%22%3A%22f_sku_%22%2C%22to%22%3A%22innerHTML%22%7D%5D"
                                                        className="k-product-sku k-sku--margin-2"
                                                    >
                                                        REF. 87045130-DOUBLE-LO
                                                    </div>
                                                </div>
                                                <div className="k-cart-block">
                                                    <div
                                                        data-wf-sku-bindings="%5B%7B%22from%22%3A%22f_price_%22%2C%22to%22%3A%22innerHTML%22%7D%5D"
                                                        className="k-cart-p-name"
                                                    >
                                                        $&nbsp;24.99&nbsp;USD
                                                    </div>
                                                </div>
                                                <div className="k-cart-block">
                                                    <div className="k-cart-p-name">1</div>
                                                </div>
                                                <div className="k-cart-block">
                                                    <div
                                                        data-wf-sku-bindings="%5B%7B%22from%22%3A%22f_price_%22%2C%22to%22%3A%22innerHTML%22%7D%5D"
                                                        className="k-cart-p-name"
                                                    >
                                                        $&nbsp;24.99&nbsp;USD
                                                    </div>
                                                </div>
                                                <div className="k-cart-block">
                                                    <a href="#" className="w-inline-block">
                                                        <div className="k-cross-link w-embed">
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
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div role="listitem" className="k-cart-cl-item w-dyn-item">
                                            <div className="k-cart-item">
                                                <img
                                                    alt=""
                                                    loading="lazy"
                                                    data-wf-sku-bindings="%5B%7B%22from%22%3A%22f_main_image_4dr%22%2C%22to%22%3A%22src%22%7D%5D"
                                                    src="https://cdn.prod.website-files.com/67f9692e7e88b9a05d707cb1/67f9692e7e88b9a05d707d40_87035655_94.jpeg"
                                                    sizes="(max-width: 479px) 59.65625px, (max-width: 991px) 14vw, (max-width: 1439px) 110px, 100vw"
                                                    srcSet="https://cdn.prod.website-files.com/67f9692e7e88b9a05d707cb1/67f9692e7e88b9a05d707d40_87035655_94-p-500.jpeg 500w, https://cdn.prod.website-files.com/67f9692e7e88b9a05d707cb1/67f9692e7e88b9a05d707d40_87035655_94.jpeg 640w"
                                                    className="k-cart-p-image"
                                                />
                                                <div className="k-cart-block">
                                                    <div className="k-cart-p-name">
                                                        Organic printed cotton Aloha t-shirt{" "}
                                                    </div>
                                                    <div
                                                        data-wf-sku-bindings="%5B%7B%22from%22%3A%22f_sku_%22%2C%22to%22%3A%22innerHTML%22%7D%5D"
                                                        className="k-product-sku k-sku--margin-2"
                                                    >
                                                        REF. 87035655-ALOHA-LO
                                                    </div>
                                                </div>
                                                <div className="k-cart-block">
                                                    <div
                                                        data-wf-sku-bindings="%5B%7B%22from%22%3A%22f_price_%22%2C%22to%22%3A%22innerHTML%22%7D%5D"
                                                        className="k-cart-p-name"
                                                    >
                                                        $&nbsp;12.99&nbsp;USD
                                                    </div>
                                                </div>
                                                <div className="k-cart-block">
                                                    <div className="k-cart-p-name">1</div>
                                                </div>
                                                <div className="k-cart-block">
                                                    <div
                                                        data-wf-sku-bindings="%5B%7B%22from%22%3A%22f_price_%22%2C%22to%22%3A%22innerHTML%22%7D%5D"
                                                        className="k-cart-p-name"
                                                    >
                                                        $&nbsp;12.99&nbsp;USD
                                                    </div>
                                                </div>
                                                <div className="k-cart-block">
                                                    <a href="#" className="w-inline-block">
                                                        <div className="k-cross-link w-embed">
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
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                            <div className="k-cart-details">
                                <div className="k-cart-info-wrap">
                                    <div className="k-2col">
                                        {/* <div className="k-cart-deck-row">
                                            <div className="k-text-gray-1">Total Products:</div>
                                            <div className="text-uppercase text--big">$ 10.99 USD</div>
                                        </div> */}
                                        <div className="k-cart-deck-row">
                                            <div className="k-text-gray-1">Estimated shipping costs:</div>
                                            <div className="text-uppercase text--big">Free</div>
                                        </div>
                                        <div className="k-cart-deck-row">
                                            <div className="k-text-gray-1">Taxes:</div>
                                            <div className="text-uppercase text--big"><Money number={taxes} /></div>
                                        </div>
                                        <div className="k-cart-deck-row">
                                            <div className="k-text-gray-1">Total:</div>
                                            <div className="text-uppercase text--big"><Money number={subtotal} /></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="k-cart-menu">
                                    <Link href="/shop" className="k-btn w-button">
                                        continue shopping
                                    </Link>
                                    <Link href={"/checkout/" + cart.id} className="k-btn k-btn--solid w-button">
                                        checkout
                                    </Link>
                                </div>
                            </div>
                        </form>

                        <div className="w-form-done">
                            <div>Thank you! Your submission has been received!</div>
                        </div>
                        <div className="w-form-fail">
                            <div>Oops! Something went wrong while submitting the form.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page;