import FacebookPixel from '@/components/FacebookPixel'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
// import { renderLogo } from '@/components/LogoComponent'
import Providers from '@/components/Providers'
import { AppProps } from 'index'
import clsx from 'clsx'
import _ from 'lodash'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import HeaderWrapper from '@/components/HeaderWrapper'

const Layout = ({ children }: AppProps) => {
    // const { order: cart, options, imageMap, relatedObjects } = await getInitialItems(await cookies())

    // const { objects: apparelObjects = [] } = await getCatalogObjects(
    //     "ITEM,IMAGE,CATEGORY,ITEM_OPTION"
    // );

    // const { headerNavs, footerNavs } = await getMainNavigation();

    // const mappedCatalogObjects = mapArrayToMap([...apparelObjects, ...relatedObjects]);
    return (
        <div className={clsx(false && "grid grid-rows-[min-content_1fr]")} suppressHydrationWarning>

            {/* <!-- This spacer provides the height we want --> */}
            {/* <div className="h-screen col-span-full row-start-1 row-end-[span_2]" /> */}

            <Providers data={{}} cartData={{ _cart: { locationId: ""}, _options: [] }} cartImageMap={{}}>
                <LayoutComponent navs={{ headerNavs: [], footerNavs: [] }}>
                    {children}
                </LayoutComponent>
            </Providers>
            <SpeedInsights />
            <Analytics />
            <noscript>
                <img
                    height="1"
                    width="1"
                    style={{ display: "none" }}
                    src="https://www.facebook.com/tr?id=1052870693055851&ev=PageView&noscript=1"
                />
            </noscript>
            <FacebookPixel />
        </div>
    )
}

export default Layout


const LayoutComponent = ({ children, navs, navs: { footerNavs } }: any) => {
    return (
        <div className="h-screen flex flex-col">
            <HeaderWrapper>
                <Header />
            </HeaderWrapper>
            <main className={clsx(" flex-1 min-h-0 overflow-auto", false && "col-start-1 row-start-2 overflow-x-hidden")}>
                {children}
                <Footer navs={footerNavs} />
            </main>
        </div>
    );

}