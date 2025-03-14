import { getMainNavigation, LayoutPageProps } from "app/layout";
import Button from "components/Button";
import ShopNavigation from "components/ShopNavigation";
import { AppProps } from "index";
import Link from "next/link";
import { Divider } from "rsuite";
import Dropdown from "rsuite/esm/Dropdown";
import DropdownItem from "rsuite/esm/Dropdown/DropdownItem";

export const metadata = {
  title: "The Playground | Shop",
};

export default async function ProductsPageLayout({ children }: LayoutPageProps) {
  const { headerNavs } = await getMainNavigation()

  return (
    <div className="grid auto-rows-max md:grid-cols-6 w-full md:px-4 gap-4 min-h-screen">
      <div className="hidden md:block col-span-2 md:col-span-1 md:pt-24">
        <ShopNavigation _navs={headerNavs} />
      </div>
      <div className="col-span-2 md:col-span-5 md:mt-0 w-full max-w-full flex justify-center md:justify-start md:min-h-screen px-4">
        <div className="hidden md:inline">
          <Divider vertical className="h-full ml-0" />
        </div>
        <div className="md:pt-24">
          {children}
        </div>
      </div>
    </div>
  );
}
