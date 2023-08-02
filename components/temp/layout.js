// import "bootstrap/dist/css/bootstrap.min.css";
// import "../styles/globals.scss";

import Providers from "components/Providers";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
