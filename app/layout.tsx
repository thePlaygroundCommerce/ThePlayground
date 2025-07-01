
import { getCatalogItemsAndImages, getCatalogObjects } from "api/catalogApi";
import Footer from "components/Footer";
import Header from "components/Header";
import Providers from "components/Providers";
import { mapArrayToMap } from "../util";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react";

import { PrismicPreview } from "@prismicio/next";
import client, { prismic, repositoryName } from "prismicio";
import { AppProps } from "index";
import { Content } from "@prismicio/client";
import { cookies } from "next/headers";
import { callGetCart } from "api/cartApi";
import clsx from "clsx";
import { latoRegular } from "./fonts";
import { ClerkProvider } from "@clerk/nextjs";
import { FooterNavigationDocumentDataNavsItem } from "prismicio-types";
import FacebookPixel from "components/FacebookPixel";
import TagManagerProvider from "context/TagManager";
import { Metadata } from "next";

import { config } from '@fortawesome/fontawesome-svg-core'
// import '@fortawesome/fontawesome-svg-core/styles.css'
import LogoComponent, { renderLogo } from "components/LogoComponent";
import { ReactElement } from "react";
// import "styles/globals.css";
// import "lib/js/webflow.js"
import "styles/webflow.css";
import "styles/matts-fabulous-site-69eedc.webflow.css";
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
      headerNavs = (await getCatalogItemsAndImages(object_ids?.split(",") ?? [], false)).objects?.map(
        ({ id, categoryData: { name } = { name: "" } }) => {
          name = name ?? ""
          return {
            id,
            title: name,
            link: `/${name.toLowerCase()}`,
          }
        }

      ) ?? [];
      break;
    // default:
    //   headerNavs = (
    //     await client.getByType<Content.HeaderDocument & Navs>(
    //       HEADER_NAVIGATION,
    //       {
    //         fetchLinks: crLinks,
    //       }
    //     )
    //   ).results[0];

    //   break;
  }

  return {
    headerNavs,
    //@ts-ignore
    footerNavs: footerNavs.navs.filter(({ nav }) => prismic.isFilled.contentRelationship<'nav', string, FooterNavigationDocumentDataNavsItem>(nav)).map(({ nav }) => nav.data),
  };
};

export type LayoutPageProps = { children: React.ReactNode };

export default async function RootLayout({ children, info }: LayoutPageProps & { info: any }) {
  const cookieCartId = (await cookies()).get("cartId")?.value ?? "";

  const { order: cart = {
    locationId: ""
  }, imageMap = {}, options = [], relatedObjects = [] } = await callGetCart(cookieCartId);

  const { objects: apparelObjects = [] } = await getCatalogObjects(
    "ITEM,IMAGE,CATEGORY,ITEM_OPTION"
  );

  const { headerNavs, footerNavs } = await getMainNavigation();
  const mappedCatalogObjects = mapArrayToMap([...apparelObjects, ...relatedObjects]);

  return (
    <TagManagerProvider>
      <ClerkProvider>
        <html data-wf-page="67f9692e7e88b9a05d707c83" data-wf-site="67f9692d7e88b9a05d707c22">
          <head>
            {/* <link href="images/favicon.ico" rel="shortcut icon" type="image/x-icon" /> */}
            {/* <link href="images/webclip.png" rel="apple-touch-icon" /> */}
            <script src="https://cdn.finsweet.com/files/cmslibrary-v1.8.js"></script>
          </head>
          <body className="grid grid-rows-[min-content_1fr]">

            {/* <!-- This spacer provides the height we want --> */}
            <div className="h-screen col-span-full row-start-1 row-end-[span_2]" />
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
      </ClerkProvider>
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
    <>
      <Header navs={navs} logo={renderLogo({ className: "w-full" })} />
      <main className="col-start-1 row-start-2 overflow-x-hidden">
        {info}{children}
        <Footer navs={footerNavs} />
      </main>
    </>
  );

}

const A = () => (
  <html
    lang="en"
    className={clsx("h-auto md:h-screen", latoRegular.className)}
  >
    <body className="h-full">
      {/* <CustomProvider>
        <Providers data={mappedCatalogObjects} cartData={{ _cart: cart, _options: options }} cartImageMap={imageMap}>
          <Layout info={info} navs={{ headerNavs, footerNavs }}>
            {children}
          </Layout>
        </Providers>
      </CustomProvider> */}
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
    </body>
    <FacebookPixel />
  </html>
)