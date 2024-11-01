/* eslint-disable react/react-in-jsx-scope */
import { getCatalogItemsAndImages, getCatalogObjects } from "api/catalogApi";
import Footer from "components/Footer";
import Header from "components/Header";
import Providers from "components/Providers";
import { mapArrayToMap } from "../util";
import { Analytics } from "@vercel/analytics/react";

import "rsuite/dist/rsuite-no-reset.min.css";
import "styles/globals.scss";

import { PrismicPreview } from "@prismicio/next";
import prismic, { createClient, repositoryName } from "prismicio";
import { AppProps } from "types";
import { Client, Content } from "@prismicio/client";
import { CustomProvider } from "rsuite";
import { cookies } from "next/headers";
import { callGetCart } from "api/cartApi";
import clsx from "clsx";
import { latoRegular } from "./fonts";
import { ClerkProvider } from "@clerk/nextjs";
import Script from "next/script";
import { CatalogImage, Order } from "square";
import { FooterNavigationDocumentData, FooterNavigationDocumentDataNavsItem, Simplify } from "prismicio-types";

export const metadata = {
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

  const client = createClient();
  const {
    results: [{ data: footerNavs }],
  } = await client.getByType<Content.FooterNavigationDocument>(
    FOOTER_NAVIGATION,
    { fetchLinks: crLinks }
  );

  const {
    data: { type, object_ids },
  } = await createClient().getSingle(HEADER_NAVIGATION);

  switch (type) {
    case "square":
      const ids = object_ids?.split(",") ?? [];
      headerNavs = (await getCatalogItemsAndImages(ids, false)).objects?.map(
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
    headerNavs: headerNavs,
    //@ts-ignore
    footerNavs: footerNavs.navs.filter(({ nav }) => prismic.isFilled.contentRelationship<'nav', string, FooterNavigationDocumentDataNavsItem>(nav)).map(({ nav }) => nav.data),
  };
};

type Props = AppProps & {};

export default async function RootLayout({ children }: Readonly<Props>) {
  const cookieCartId = cookies().get("cartId")?.value ?? "";

  const { order: cart = {
    locationId: ""
  }, imageMap } = await callGetCart(cookieCartId);

  const { objects: apparelObjects = [] } = await getCatalogObjects(
    "ITEM,IMAGE,CATEGORY,ITEM_OPTION"
  );

  const { headerNavs, footerNavs } = await getMainNavigation();
  const mappedCatalogObjects = mapArrayToMap(apparelObjects);

  return (
    <ClerkProvider>
      <html
        lang="en"
        className={clsx("h-auto md:h-screen", latoRegular.className)}
      >
        <body className="h-full">
          <CustomProvider>
            <Providers data={mappedCatalogObjects} cart={cart} cartImageMap={imageMap}>
              <Layout navs={{ headerNavs, footerNavs }}>
                {children}
              </Layout>
            </Providers>
          </CustomProvider>
          <PrismicPreview repositoryName={repositoryName} />
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
        <Script>
          {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod ?
            n.callMethod.apply(n, arguments) : n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1052870693055851');
          fbq('track', 'PageView');
          `}
        </Script>
      </html>
    </ClerkProvider>
  );
}

type LayoutProps = AppProps & {
  navs: {
    headerNavs: Nav[];
    footerNavs: Nav[];
  };
};

const Layout = ({ children, navs, navs: { footerNavs } }: LayoutProps) => (
  <>
    <Header navs={navs} />
    <main className="min-h-full mt-20 box-border">{children}</main>
    <Footer navs={footerNavs} />
  </>
);
