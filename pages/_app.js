import "bootstrap/dist/css/bootstrap.min.css";
import DefaultLayout from "../components/Layout";
import "../styles/globals.scss";
import CartProvider from "context/cartContext";
import { CookiesProvider } from "react-cookie";

function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout || DefaultLayout;

  return (
    /* <InventoryContext> */
    <CookiesProvider>
      <CartProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CartProvider>
    </CookiesProvider>
    /* </InventoryContext> */
  );
}

export default MyApp;
