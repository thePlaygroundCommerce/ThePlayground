import "styles/globals.scss";
import { Analytics } from '@vercel/analytics/react';
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "prismicio";

export const metadata = {
  title: "The Playground",
};

const Layout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <main>
          <div className="min-h-screen">{children}</div>
          <PrismicPreview repositoryName={repositoryName} />
        </main>
        <Analytics />
      </body>
    </html>
  );
};

export default Layout;
