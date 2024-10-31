import { getMainNavigation } from "app/layout";
import Button from "components/Button";
import ShopNavigation from "components/ShopNavigation";
import Link from "next/link";
import Dropdown from "rsuite/esm/Dropdown";
import DropdownItem from "rsuite/esm/Dropdown/DropdownItem";

export const metadata = {
  title: "The Playground | Shop",
};

export default async function ProductsPageLayout({ children }: any) {
  const { headerNavs } = await getMainNavigation()

  return (
    <div className="pt-6">
      <div className="grid grid-cols-2 md:grid-cols-4 w-full container mx-auto gap-4">
        <div className="col-span-1 md:col-span-1">
          <ShopNavigation _navs={headerNavs} />
        </div>
        {/* <div className="col-span-1 flex justify-start">
          <Dropdown title="Filter">
            {['Price', 'Name'].map(nav => <DropdownItem as={Link} href={nav.link}>{nav.title}</DropdownItem>)}
          </Dropdown>
          <Button className="mr-12">Sort</Button>
        </div> */}
        <div className="col-span-2 md:col-span-3 flex flex-wrap justify-center w-full max-w-full md:border-l">
          {children}
        </div>
      </div>
    </div>
  );
}
