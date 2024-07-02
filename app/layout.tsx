/* eslint-disable react/react-in-jsx-scope */
import { getCatalogObjects } from "api/catalogApi";
import Footer from "components/Footer";
import Header from "components/Header";
import Providers from "components/Providers";
import { mapArrayToMap } from "../util";

import "rsuite/dist/rsuite-no-reset.min.css"
import "styles/globals.scss";

import { PrismicPreview } from "@prismicio/next";
import { createClient, repositoryName } from "prismicio";
import { AppProps } from "types";
import { Content } from "@prismicio/client";
import { CustomProvider } from "rsuite";
import { cookies } from "next/headers";
import { callGetCart } from "api/cartApi";

export const metadata = {
  title: "The Playground",
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
  const cookiesStore = cookies();
  const cartId = cookiesStore.get("cartId");
  if(cartId) cart = await callGetCart(cartId.value);


  
  const { objects: categoryObjects = [] } = await getCatalogObjects("CATEGORY");
  const { objects: apparelObjects = [] } = await getCatalogObjects(
    "ITEM,IMAGE,CATEGORY"
  );

  const { headerNavs, footerNavs } = await getMainNavigation();

  const mappedCatalogItems = mapArrayToMap(
    apparelObjects.concat(categoryObjects)
  );

  return (
    <html lang="en" className="h-auto md:h-screen">
      <body className="h-full">
        <CustomProvider>
          <Providers data={mappedCatalogItems} cart={cart?.result.order}>
            <LayoutB navs={{ footerNavs, headerNavs }}>{children}</LayoutB>
          </Providers>
        </CustomProvider>

        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}

type LayoutProps = AppProps & {
  navs: {
    headerNavs: Nav[];
    footerNavs: Nav[];
  };
};

// const LayoutA = ({
//   children,
//   navs: { headerNavs, footerNavs },
// }: LayoutProps) => (
//   <main className="h-full flex flex-col">
//     <Header />
//     <div className="grid grid-cols-6 h-full overflow-hidden">
//       <div className="col-span-1 p-4 pr-8 flex flex-col pt-8 h-full sidebar-box-shadow">
//         <div className="h-full flex flex-col justify-center">
//           <SideNav />
//         </div>
//         <div className="">
//           <Footer />
//         </div>
//       </div>
//       <div className="col-span-5 py-8 overflow-y-scroll max-h-full">
//         {children}
//       </div>
//     </div>
//   </main>
// );

const LayoutB = ({
  children,
  navs,
  navs: { footerNavs },
}: LayoutProps) => (
  <>
    <Header navs={navs} />
    <main className="h-full mt-12">
      <div className="max-h-full h-full">
        {children}
        <div className="">
          <Footer navs={footerNavs} />
        </div>
      </div>
    </main>
  </>
);
