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