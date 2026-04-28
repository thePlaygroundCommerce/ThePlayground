
import { getCatalogItemsAndImages, getCatalogObjects } from "api/catalogApi";
import Footer from "components/Footer";
import Header from "components/Header";
import Providers from "components/Providers";
import { mapArrayToMap } from "../util";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react";

import { PrismicPreview } from "@prismicio/next";
import { Prismic, client, repositoryName } from "api/clients";
import { AppProps } from "index";
import { Content } from "@prismicio/client";
import { cookies } from "next/headers";
import { callGetCart } from "api/cartApi";
// import { ClerkProvider } from "@clerk/nextjs";
import { FooterNavigationDocumentDataNavsItem } from "prismicio-types";
import FacebookPixel from "components/FacebookPixel";
import TagManagerProvider from "context/TagManager";
import { Metadata } from "next";
import { CatalogObject } from "square";

import { config } from '@fortawesome/fontawesome-svg-core'
// import '@fortawesome/fontawesome-svg-core/styles.css'
import { renderLogo } from "components/LogoComponent";
import { ReactElement } from "react";
import "../styles/globals.css";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import _ from "lodash";
import clsx from "clsx";
// import "lib/js/webflow.js"
// import "styles/webflow.css";
// import "styles/webflowA.css";
config.autoAddCss = false

export const metadata: Metadata = {
  title: "The Playground | Home",
};

type Navs = {
  navs: {
    data: {
      nav: Nav;
    }[];
  };
};

export type Nav = {
  id: string,
  link: string;
  title?: string;
}

export const getMainNavigation: () => Promise<{
  headerNavs: Nav[];
  footerNavs: Nav[];
}> = async () => {
  const FOOTER_NAVIGATION = "footer_navigation";
  const HEADER_NAVIGATION = "header";

  let headerNavs: Nav[] = [];

  const crLinks = [".title", ".link"].map((link) => "categorylink" + link);
  const {
    results: [{ data: footerNavs }],
  } = await client.getByType<Content.FooterNavigationDocument>(
    FOOTER_NAVIGATION,
    { fetchLinks: crLinks }
  );

  const {
    data: { type, object_ids },
  } = await client.getSingle(HEADER_NAVIGATION);

  switch (type) {
    case "square":
      headerNavs =
        (await getCatalogItemsAndImages(object_ids?.split(",") ?? [], false))
          .objects
          ?.filter(
            (obj): obj is CatalogObject.Category => obj.type === "CATEGORY",
          )
          .map(({ id, categoryData }) => {
            const name = categoryData?.name ?? "";
            return {
              id: id ?? "",
              title: name,
              link: `/${name.toLowerCase()}`,
            };
          }) ?? [];
      break;
  }

  return {
    headerNavs,
    //@ts-ignore
    footerNavs: footerNavs.navs.filter(({ nav }) => Prismic.isFilled.contentRelationship<'nav', string, FooterNavigationDocumentDataNavsItem>(nav)).map(({ nav }) => nav.data),
  };
};

export type LayoutPageProps = { children: React.ReactNode };

export default async function RootLayout({ children, info }: LayoutPageProps & { info: any }) {

  const { order: cart, options, imageMap, relatedObjects } = await getInitialItems(await cookies())

  const { objects: apparelObjects = [] } = await getCatalogObjects(
    "ITEM,IMAGE,CATEGORY,ITEM_OPTION"
  );
  
  const { headerNavs, footerNavs } = await getMainNavigation();
  const mappedCatalogObjects = mapArrayToMap([...apparelObjects, ...relatedObjects]);
  
  return (
    <TagManagerProvider>
      {/* <ClerkProvider> */}
        <html data-wf-page="67f9692e7e88b9a05d707c83" data-wf-site="67f9692d7e88b9a05d707c22">
          <head>
            {/* <link href="images/favicon.ico" rel="shortcut icon" type="image/x-icon" /> */}
            {/* <link href="images/webclip.png" rel="apple-touch-icon" /> */}
            <script src="https://cdn.finsweet.com/files/cmslibrary-v1.8.js"></script>
          </head>
          <body className={clsx(false && "grid grid-rows-[min-content_1fr]")}>

            {/* <!-- This spacer provides the height we want --> */}
            {/* <div className="h-screen col-span-full row-start-1 row-end-[span_2]" /> */}
            
            <Providers data={mappedCatalogObjects} cartData={{ _cart: cart, _options: options }} cartImageMap={imageMap}>
              <Layout info={info} navs={{ headerNavs, footerNavs }}>
                {children}
              </Layout>
            </Providers>
            <PrismicPreview repositoryName={repositoryName} />
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
          </body>
        </html>
      {/* </ClerkProvider> */}
    </TagManagerProvider>
  );
}

type LayoutProps = AppProps & {
  navs: {
    headerNavs: Nav[];
    footerNavs: Nav[];
  };
};

const Layout = ({ children, info, navs, navs: { footerNavs } }: LayoutProps & { info: ReactElement }) => {
  return (
    <div className="h-screen flex flex-col">
      <Header navs={navs} logo={renderLogo({ className: "w-full" })} />
      <main className={clsx(" flex-1 min-h-0 overflow-auto", false && "col-start-1 row-start-2 overflow-x-hidden")}>
        {info}
        {children}
        <Footer navs={footerNavs} />
      </main>
    </div>
  );

}

const getInitialItems = async (cookies: ReadonlyRequestCookies) => {
  const id = cookies.get("cartId")?.value;

  let init = {
    order: {
      locationId: ""
    }, imageMap: {}, options: [], relatedObjects: []
  }


  if (id) {
    init = _.defaults(init, await callGetCart(id));
  }

  return init
}