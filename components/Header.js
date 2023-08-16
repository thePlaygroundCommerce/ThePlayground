import HeaderNavigation from "./HeaderNavigation";
import HeaderActions from "./HeaderActions";
import Link from "next/link";

function Header() {
  return (
    <header className="fixed bg-white h-12 flex justify-between content-center w-full px-8 py-3">
      <div className="flex align-items">
        <Link href="/">SWaNK</Link>
      </div>
      <div className="w-1/2 relative">
        <HeaderNavigation />
      </div>
      <HeaderActions />
    </header>
  );
}

export default Header;
