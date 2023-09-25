import HeaderNavigation from "./HeaderNavigation";
import HeaderActions from "./HeaderActions";
import Link from "next/link";
import Image from "next/image";

function Header() {
  return (
    <header className="fixed bg-white h-12 flex justify-between content-center w-full px-8 py-3">
      <div className="flex align-items">
        <Link href="/">
          <Image src="/The Playground Logo_Black.svg" height={75} width={75}/>
        </Link>
      </div>
      <div className="w-1/2 relative">
        <HeaderNavigation />
      </div>
      <HeaderActions />
    </header>
  );
}

export default Header;
