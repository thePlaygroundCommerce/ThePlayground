import Footer from '@/components/Footer'
import Header from '@/components/Header'
// import { renderLogo } from '@/components/LogoComponent'
import Providers from '@/components/Providers'
import clsx from 'clsx'
import _ from 'lodash'
import { Layout as LayoutComponent } from '@/components/Layouts'
import HeaderWrapper from '@/components/HeaderWrapper'
import { getCatalogObjects } from '@/api/catalogApi'
import Link from 'next/link'
import Hamburger from '@/components/Hamburger'
import Cart from '@/components/Cart'
import CartButton from '@/components/CartButton'

const Layout = async ({ children }: LayoutProps<"/">) => {
    // const { order: cart, options, imageMap, relatedObjects } = await getInitialItems(await cookies())

    const { objects: apparelObjects = [] } = await getCatalogObjects(
        "ITEM,IMAGE,CATEGORY,ITEM_OPTION"
    );

    const footerNavs = [
        {
            id: "about",
            link: "/about",
            title: "About"
        },
        {
            id: "contact",
            link: "/contact",
            title: "Contact Us"
        },
        {
            id: "blog",
            link: "/log",
            title: "News & Stories"
        },
    ]

    // const { headerNavs, footerNavs } = await getMainNavigation();

    // const mappedCatalogObjects = mapArrayToMap([...apparelObjects, ...relatedObjects]);
    return (
        <div className={clsx(false && "grid grid-rows-[min-content_1fr]")} suppressHydrationWarning>

            {/* <!-- This spacer provides the height we want --> */}
            {/* <div className="h-screen col-span-full row-start-1 row-end-[span_2]" /> */}

            <Providers data={apparelObjects} cartData={{ _cart: { locationId: "" }, _options: [] }} cartImageMap={{}}>
                <LayoutComponent
                    header={
                        <HeaderWrapper>
                            <Header>
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
                            </Header>
                        </HeaderWrapper>
                    }
                    footer={<Footer navs={[]} />}
                >
                    {children}
                </LayoutComponent>
            </Providers>
        </div>
    )
}

export default Layout