import { getCatalogObjects } from "api/catalogApi";
import Footer from "components/Footer";
import Header from "components/Header";
import Providers from "components/Providers";
import { mapArrayToMap } from "../util";

import "rsuite/dist/rsuite.min.css";
import "styles/globals.scss";

import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "prismicio";
import SideNav from "components/SideNav";
import { AppProps } from "types";

export const metadata = {
  title: "The Playground",
};

type Props = AppProps & {};

export async function generateStaticParams() {
  const { objects: categoryObjects = [] } = await getCatalogObjects("CATEGORY");

  const settingsNavs = [
    {
      category: "account",
    },
    {
      category: "orders",
    },
    {
      category: "wishlists",
    },
  ];

  return categoryObjects
    ? categoryObjects
        .map(
          ({ categoryData: { name } }: { categoryData: { name: string } }) => ({
            category: name.toLowerCase(),
          })
        )
        .concat(settingsNavs)
    : [];
}

export default async function RootLayout({ children }: Props) {
  const { objects: categoryObjects = [] } = await getCatalogObjects("CATEGORY");
  const { objects: apparelObjects = [] } = await getCatalogObjects(
    "ITEM,IMAGE,CATEGORY"
  );

  const mappedCatalogItems = mapArrayToMap(
    apparelObjects.concat(categoryObjects)
  );

  return (
    <html lang="en" className="h-screen overflow-hidden">
      <body className="h-full">
        <Providers data={mappedCatalogItems}>
          <main className="h-full flex flex-col">
            <Header />
            <div className="grid grid-cols-6 h-full overflow-hidden">
              <div className="col-span-1 p-4 pr-8 flex flex-col pt-8 h-full sidebar-box-shadow">
                <div className="h-full flex flex-col justify-center">
                  <SideNav />
                </div>
                <div className="">
                  <Footer />
                </div>
              </div>
              <div className="col-span-5 px-16 py-8 overflow-y-scroll max-h-full">
                {children}
              </div>
            </div>
          </main>
        </Providers>

        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}
