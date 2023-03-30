import "bootstrap/dist/css/bootstrap.min.css";
import DefaultLayout from "../components/layout";
import { InventoryContext } from "../context/InventoryContext";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout || DefaultLayout

  return (
      /* <InventoryContext> */
      <Layout>
        <Component {...pageProps} />
      </Layout>
      /* </InventoryContext> */
  );
}

export default MyApp;
