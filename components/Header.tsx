/* eslint-disable react/react-in-jsx-scope */
import HeaderActions from "./HeaderActions";
import Link from "next/link";
import { Nav } from "app/layout";
import HeaderNavigation from "./HeaderNavigation";
import { AppProps } from "types";
import LogoComponent from "./LogoComponent";
import { latoLight } from "app/fonts";
import clsx from "clsx";
import Blinking from "./Blinking";
import MobileSideNav from "./MobileSideNav";

type Props = AppProps & { navs: { headerNavs: Nav[], footerNavs: Nav[] } };

function Header({ navs }: Props) {
  return (
    <header className="fixed min-h-12 top-0 md:h-auto drop-shadow-lg z-20 bg-white w-full">
      <div className={"grid grid-cols-6 border-b md:px-8 px-4 md:py-1 py-3"}>
        <div className="w-full h-full flex col-span-1">
          <div className="sm:hidden flex items-center">
            <MobileSideNav logo={<LogoComponent height={25} width={25} />} navs={navs} />
          </div>
          <div className="hidden sm:block">
            <Link href="/">
              <LogoComponent height={25} width={25} />
            </Link>
          </div>
        </div>
        <div className="w-full h-full flex justify-center sm:justify-start col-span-4">
          <div className="sm:hidden max-w-44 relative ">
            <Link href="/">
              <LogoComponent height={25} width={25} />
            </Link>
          </div>
          <div className="hidden sm:block">
            <HeaderNavigation navs={navs.headerNavs} />
          </div>
        </div>
        <div className="w-full h-full col-span-1 flex">
          <div className="w-full my-auto">
            <HeaderActions />
          </div>
        </div>
      </div>
      <div className={clsx(latoLight.className, "text-sm bg-mintcream-950 text-white text-center p-2")}>
        <Blinking>
          {[
            <p key={1}>Free Shipping & Returns <span className="italic">For A Limited Time</span></p>
          ]}
        </Blinking>
      </div>
    </header>
  );
}

export default Header;
