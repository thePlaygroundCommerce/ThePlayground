
import { getCatalogItemsAndImages } from "@/api/catalogApi";

import { PrismicPreview } from "@prismicio/next";
import { Prismic, client, repositoryName } from "@/api/clients";
import { Content } from "@prismicio/client";
// import { ClerkProvider } from "@clerk/nextjs";
import { FooterNavigationDocumentDataNavsItem } from "prismicio-types";
import TagManagerProvider from "@/context/TagManager";
import { Metadata } from "next";
import { CatalogObject } from "square";

import { config } from '@fortawesome/fontawesome-svg-core'
import "../styles/globals.css";
import _ from "lodash";
import CartProvider from "@/context/cartContext";
import { cookies } from "next/headers";
import { getInitialItems } from "./(site)/layout";
import CheckoutProvider from "@/context/checkoutContext";
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
  let footerNavs: Navs = { navs: { data: [] } };

  const crLinks = [".title", ".link"].map((link) => "categorylink" + link);

  try {
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
  } catch (error) {

  }

  console.log(footerNavs)


  return {
    headerNavs,
    //@ts-ignore
    footerNavs: footerNavs.navs.filter(({ nav }) => Prismic.isFilled.contentRelationship<'nav', string, FooterNavigationDocumentDataNavsItem>(nav)).map(({ nav }) => nav.data),
  };
};

export type LayoutPageProps = { children: React.ReactNode };

export default async function RootLayout({ children }: LayoutPageProps) {
  const { order: cart, options, imageMap, relatedObjects } = await getInitialItems(await cookies())

  return (
    <TagManagerProvider>
      {/* <ClerkProvider> */}
      <html data-wf-page="67f9692e7e88b9a05d707c83" data-wf-site="67f9692d7e88b9a05d707c22">
        <head>
          {/* <link href="images/favicon.ico" rel="shortcut icon" type="image/x-icon" /> */}
          {/* <link href="images/webclip.png" rel="apple-touch-icon" /> */}
          <script src="https://cdn.finsweet.com/files/cmslibrary-v1.8.js"></script>
        </head>
        <body>
          <CartProvider data={{ _cart: cart, _options: options }} images={imageMap}>
            <CheckoutProvider>{children}</CheckoutProvider>
          </CartProvider>
          <PrismicPreview repositoryName={repositoryName} />
        </body>
      </html>
      {/* </ClerkProvider> */}
    </TagManagerProvider>
  );
}
