import HeaderNavigation from "./HeaderNavigation";
import HeaderActions from "./HeaderActions";
import Link from "next/link";

function Header() {
  return (
    <div className="flex justify-between content-center w-full px-8 py-6">
      <div className="flex align-items">
        <Link href="/">SWaNK</Link>
      </div>
      <div className="w-1/2 relative">
        <HeaderNavigation />
      </div>
      <HeaderActions />
    </div>
  );
}

export default Header;
