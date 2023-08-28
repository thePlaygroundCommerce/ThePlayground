import { getCatalogObjects } from "api/catalogApi";
import Footer from "components/Footer";
import Header from "components/Header";
import Providers from "components/Providers";
import { mapArrayToMap } from "../util";

import "styles/globals.scss";

export const metadata = {
  title: "The Playground",
};

export default async function RootLayout({ children }) {
  const { objects } = await getCatalogObjects("CATEGORY,ITEM,IMAGE");
  
  const mappedCatalogItems = mapArrayToMap(objects);


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
      </body>
    </html>
  );
}
