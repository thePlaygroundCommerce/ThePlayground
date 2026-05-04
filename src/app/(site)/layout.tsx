import { callGetCart } from '@/api/cartApi'
import { getCatalogObjects } from '@/api/catalogApi'
import { getMainNavigation, Nav } from '@/app/layout'
import FacebookPixel from '@/components/FacebookPixel'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { renderLogo } from '@/components/LogoComponent'
import Providers from '@/components/Providers'
import { AppProps } from 'index'
import clsx from 'clsx'
import _ from 'lodash'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { cookies } from 'next/headers'
import { mapArrayToMap } from '@/util/index'
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'

const Layout = async ({ children }: AppProps) => {
    const { order: cart, options, imageMap, relatedObjects } = await getInitialItems(await cookies())

    const { objects: apparelObjects = [] } = await getCatalogObjects(
        "ITEM,IMAGE,CATEGORY,ITEM_OPTION"
    );

    const { headerNavs, footerNavs } = await getMainNavigation();
    const mappedCatalogObjects = mapArrayToMap([...apparelObjects, ...relatedObjects]);
    return (
        <div className={clsx(false && "grid grid-rows-[min-content_1fr]")} suppressHydrationWarning>

            {/* <!-- This spacer provides the height we want --> */}
            {/* <div className="h-screen col-span-full row-start-1 row-end-[span_2]" /> */}

            <Providers data={mappedCatalogObjects} cartData={{ _cart: cart, _options: options }} cartImageMap={imageMap}>
                <LayoutComponent navs={{ headerNavs, footerNavs }}>
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


const getInitialItems = async (cookies: ReadonlyRequestCookies) => {
    const id = cookies.get("cartId")?.value;

    let init = {
        order: {
            locationId: ""
        }, imageMap: {}, options: [], relatedObjects: []
    }

    if (id) {
        init = _.defaults(await callGetCart(id), init);
    }

    return init
}


type LayoutProps = AppProps & {
    navs: {
        headerNavs: Nav[];
        footerNavs: Nav[];
    };
};

const LayoutComponent = ({ children, navs, navs: { footerNavs } }: LayoutProps) => {
    return (
        <div className="h-screen flex flex-col">
            <Header navs={navs} logo={renderLogo({ className: "w-full" })} />
            <main className={clsx(" flex-1 min-h-0 overflow-auto", false && "col-start-1 row-start-2 overflow-x-hidden")}>
                {children}
                <Footer navs={footerNavs} />
            </main>
        </div>
    );

}