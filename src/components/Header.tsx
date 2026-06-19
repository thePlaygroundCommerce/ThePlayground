import { Nav } from "@/app/layout";
import { AppProps } from "index";
import { ReactElement } from "react";
import Navbar from "./Navbar";

type Props = AppProps & {
  navs: { headerNavs: Nav[]; footerNavs?: Nav[] };
  logo: ReactElement;
};

function Header({ children }) {
  return (
    <header
      className="k-navbar w-nav overflow-hidden flex-1"
    >
      {children}
      {/* <Navbar /> */}
      <div id="headerOverlay" className="flex-1 relative" />
    </header>
  );
}

export default Header;
