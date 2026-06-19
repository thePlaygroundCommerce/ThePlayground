import Footer from '@/components/Footer'
import Header from '@/components/Header'
import HeaderWrapper from '@/components/HeaderWrapper'
import { Layout } from '@/components/Layouts'
import LogoComponent from '@/components/LogoComponent'
import SocialMediaButtons from '@/components/SocialMediaButtons'
import CartProvider from '@/context/cartContext'
import CheckoutProvider from '@/context/checkoutContext'
import Link from 'next/link'


const layout = ({ children }: LayoutProps<"/landing/[uid]">) => {
    return (
        <CartProvider data={{ _cart: { locationId: '' }, _options: [] }} images={{}}>
            <CheckoutProvider>
                <Layout
                    header={
                        null
                        // <HeaderWrapper>
                        //     <Header>
                        //         <div className="py-3 px-8">
                        //             <div className="flex">
                        //                 <div className="flex-2 items-center justify-between flex">
                        //                     <Link
                        //                         href="#"
                        //                         aria-current="page"
                        //                         className="k-nav-logo w-inline-block w--current"
                        //                     >
                        //                         <div>play.</div>
                        //                     </Link>

                        //                     {/* <Hamburger /> */}

                        //                 </div>
                        //                 <div className="flex-5 flex justify-between items-center">

                        //                     <Link href="#about" className="hidden sm:block k-nav-link">
                        //                         Does It Fit?
                        //                     </Link>
                        //                     <Link href="#about" className="hidden sm:block k-nav-link">
                        //                         What's The Playground
                        //                     </Link>
                        //                     <Link href="#reviews" className="hidden sm:block k-nav-link">
                        //                         Reviews
                        //                     </Link>
                        //                     <Link href="#faqs" className="hidden sm:block k-nav-link">
                        //                         Frequently Asked Questions
                        //                     </Link>

                        //                 </div>
                        //             </div>
                        //         </div>
                        //     </Header>
                        // </HeaderWrapper>
                    }
                    footer={
                        <footer className="k-footer">
                            <div className="k-container-1">
                                <div className="k-footer-bottom">
                                    <div className="p-4 w-full">
                                        <div className="flex justify-center">
                                            <div className="min-w-1 min-h-6 relative">
                                                <Link href="#">
                                                    <LogoComponent />
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="w-48 m-auto mt-4">
                                            <SocialMediaButtons align="around" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </footer>
                    }
                >
                    {children}
                </Layout>
            </CheckoutProvider>
        </CartProvider>
    )
}

export default layout