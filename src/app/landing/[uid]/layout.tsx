import CartProvider from '@/context/cartContext'
import CheckoutProvider from '@/context/checkoutContext'


const layout = ({ children }: LayoutProps<"/landing/[uid]">) => {
    return (
        <CartProvider data={{ _cart: { locationId: '' }, _options: [] }} images={{}}>
            <CheckoutProvider>{children}</CheckoutProvider>
        </CartProvider>
    )
}

export default layout