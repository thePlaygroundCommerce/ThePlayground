import { getCatalogObjects } from "api/catalogApi";
import Footer from "components/Footer";
import Header from "components/Header";
import Providers from "components/Providers";
import { mapArrayToMap } from "../../util";

import "styles/globals.scss";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "prismicio";

export const metadata = {
  title: "The Playground",
};

export async function generateStaticParams() {
  const { objects } = await getCatalogObjects("CATEGORY");
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

  return objects
    ? objects
        .map(({ categoryData: { name } }) => ({
          category: name.toLowerCase(),
        }))
        .concat(settingsNavs)
    : [];
}

export default async function RootLayout({ children }) {
  const { objects: categoryObjects = [] } = await getCatalogObjects("CATEGORY");
  const { objects: apparelObjects = [] } = await getCatalogObjects(
    "ITEM,IMAGE"
  );

  const mappedCatalogItems = mapArrayToMap(
    apparelObjects.concat(categoryObjects)
  );

  return (
    <html lang="en">
      <body className="">
        <Providers data={mappedCatalogItems}>
          <Header />
          <main className="pt-12">
            <div className="min-h-screen">{children}</div>
            <Footer />
          </main>
        </Providers>

        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}
