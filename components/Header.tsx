import HeaderActions from "./HeaderActions";
import Link from "next/link";
import Image from "next/image";
import { Nav } from "app/layout";
import HeaderNavigation from "./HeaderNavigation";
import { AppProps } from "types";
import LogoComponent from "./LogoComponent";
import Button from "./Button";
import MobileSideNav from "./MobileSideNav";

type Props = AppProps & { navs: { headerNavs: Nav[], footerNavs: Nav[] } };

function Header({ navs }: Props) {
  return (
    <header className="fixed h-12 top-0 md:h-auto md:px-8 px-4 md:py-2 drop-shadow-lg py-1 border-b z-10 bg-white w-full grid grid-cols-6">
      <div className="w-full h-full flex col-span-1">
        <div className="sm:hidden h-full flex items-center">
          <MobileSideNav navs={navs} />
        </div>
        <div className="hidden sm:block">
          <Link href="/">
            <LogoComponent height={25} width={25} />
          </Link>
        </div>
      </div>
      <div className="w-full h-full flex justify-center sm:justify-start col-span-4">
        {/* <p className=" h-full text-black px-4 p-2">
            Free Shipping on Orders over $100!
          </p> */}
        <div className="sm:hidden">
          <Link href="/">
            <LogoComponent height={25} width={25} />
          </Link>
        </div>
        <div className="hidden sm:block">
          <HeaderNavigation navs={navs.headerNavs} />
        </div>
      </div>
      <div className="w-full h-full col-span-1 flex">
        <div className="w-full my-auto"></div>
        <div className="px-8 my-auto">
          <HeaderActions />
        </div>
      </div>
    </header>
  );
}

export default Header;
