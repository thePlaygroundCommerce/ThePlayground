import HeaderActions from "./HeaderActions";
import Link from "next/link";
import Image from "next/image";
import { Nav } from "app/layout";
import HeaderNavigation from "./HeaderNavigation";
import { AppProps } from "types";

type Props = AppProps & { navs: Nav[]}

async function Header({ navs }: Props) {
  
  return (
    <header className="sticky border-b z-10 bg-white w-full grid grid-cols-6">
      <div className="w-full mx-8 my-3 h-full col-span-1">
        <Link href="/">
          <Image
            src="/The Playground Logo_Black.svg"
            alt="Logo"
            height={75}
            width={75}
          />
        </Link>
      </div>
      <div className="w-full h-full col-span-5 flex">
        <div className="w-full my-auto">
          {/* <p className=" h-full text-black px-4 p-2">
            Free Shipping on Orders over $100!
          </p> */}
          <div className="">
            <HeaderNavigation navs={navs} />
          </div>
        </div>
        <div className="px-8 my-auto">
          <HeaderActions />
        </div>
      </div>
    </header>
  );
}

export default Header;
