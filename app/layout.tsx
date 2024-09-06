/* eslint-disable react/react-in-jsx-scope */
import { getCatalogObjects } from "api/catalogApi";
import Footer from "components/Footer";
import Header from "components/Header";
import Providers from "components/Providers";
import { mapArrayToMap } from "../util";
import { Analytics } from '@vercel/analytics/react';

import "rsuite/dist/rsuite-no-reset.min.css"
import "styles/globals.scss";

import { PrismicPreview } from "@prismicio/next";
import { createClient, repositoryName } from "prismicio";
import { AppProps } from "types";
import { Content } from "@prismicio/client";
import { CustomProvider } from "rsuite";
import { cookies } from "next/headers";
import { callGetCart } from "api/cartApi";
import clsx from "clsx";
import { latoHeavy, latoRegular } from "./fonts";
import { ClerkProvider } from "@clerk/nextjs";
import Script from "next/script";

export const metadata = {
  title: "The Playground | Home",
};

type Navs = {
  data: {
    navs: {
      nav: Nav;
    }[];
  };
};

export type Nav = {
  data: Pick<Content.CategorylinkDocument["data"], "title" | "link">;
};

const getMainNavigation = async () => {
  const FOOTER_NAVIGATION = "footer_navigation";
  const HEADER_NAVIGATION = "header";

  const crLinks = [".title", ".link"].map((link) => "categorylink" + link);

  const client = createClient();
  const {
    results: [{ data: footerNavs }],
  } = await client.getByType<Content.FooterNavigationDocument & Navs>(
    FOOTER_NAVIGATION,
    { fetchLinks: crLinks }
  );
  const {
    results: [{ data: headerNavs }],
  } = await client.getByType<Content.HeaderDocument & Navs>(HEADER_NAVIGATION, {
    fetchLinks: crLinks,
  });

  return {
    headerNavs: headerNavs.navs.map(({ nav }) => nav),
    footerNavs: footerNavs.navs.map(({ nav }) => nav),
  };
};

type Props = AppProps & {};

export default async function RootLayout({ children }: Readonly<Props>) {
  let cart;
  const cookieCartId = cookies().get("cartId")?.value ?? ""

  cart = await callGetCart(cookieCartId).then(({ result: { order } = { order: undefined } }) => order);
  const { objects: apparelObjects = [] } = await getCatalogObjects(
    "ITEM,IMAGE,CATEGORY,ITEM_OPTION"
  );
  const { headerNavs, footerNavs } = await getMainNavigation();
  const mappedCatalogObjects = mapArrayToMap(apparelObjects);

  return (
    <ClerkProvider>
      <html lang="en" className={clsx("h-auto md:h-screen", latoRegular.className)}>
        <body className="h-full">
          <CustomProvider>
            <Providers data={mappedCatalogObjects} cart={cart}>
              <Layout navs={{ footerNavs, headerNavs }}>{children}</Layout>
            </Providers>
          </CustomProvider>
          <PrismicPreview repositoryName={repositoryName} />
          <Analytics />
          <noscript><img height="1" width="1" style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1052870693055851&ev=PageView&noscript=1"
          /></noscript>
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

const Layout = ({
  children,
  navs,
  navs: { footerNavs },
}: LayoutProps) => (
  <>
    <Header navs={navs} />
    <main className="min-h-full mt-12">
      {children}
    </main>
    <Footer navs={footerNavs} />
  </>
);