import Link from 'next/link'
import Hamburger from './Hamburger'
import CartButton from './CartButton'
import Cart from './Cart'
import { Suspense } from 'react'

type Props = {}

const Navbar = (props: Props) => {
    return (
        <div className="py-3 px-8">
            <div className="flex">
                <div className="flex-3 items-center justify-between flex">
                    <Link
                        href="/"
                        aria-current="page"
                        className="k-nav-logo w-inline-block w--current"
                    >
                        <div>play.</div>
                    </Link>
                    
                    <Hamburger />

                </div>
                <div className="flex-5 flex justify-end items-center">
                    <div className="flex justify-end sm:justify-between items-center w-3/4">
                        <Link href="/shop" className="hidden sm:block k-nav-link">
                            shop
                        </Link>
                        <Link href="/shop" className="hidden sm:block k-nav-link">
                            <strong>🔥</strong> sale
                        </Link>

                        <div
                            data-node-type="commerce-cart-wrapper"
                            data-open-product=""
                            data-wf-cart-type="modal"
                            data-wf-cart-query=""
                            data-wf-page-link-href-prefix=""
                            className="w-commerce-commercecartwrapper  k-cart-mobile"
                        >
                            <CartButton overlay={
                                // <Suspense fallback={<div>Hello</div>} name="cartOverlay">
                                    <Cart />
                                // </Suspense>
                            } />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar