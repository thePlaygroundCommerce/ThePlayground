import { Nav } from "@/app/layout";
import { AppProps } from "index";
import { ReactElement } from "react";

import Navbar from "./Navbar";

type Props = AppProps & {
  navs: { headerNavs: Nav[]; footerNavs?: Nav[] };
  logo: ReactElement;
};

function Header() {
  return (
    <div
      data-collapse="medium"
      data-animation="default"
      data-duration="400"
      data-easing="ease"
      data-easing2="ease"
      role="banner"
      className="k-navbar w-nav overflow-hidden flex-1"
    >
      <Navbar />
      <div id="headerOverlay" className="flex-1 relative" />
    </div>
  );
}

export default Header;
