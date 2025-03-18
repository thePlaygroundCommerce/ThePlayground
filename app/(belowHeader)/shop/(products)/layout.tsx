import { getMainNavigation, LayoutPageProps } from "app/layout";
import ShopNavigation from "components/ShopNavigation";
import { Divider } from "rsuite";

export const metadata = {
  title: "The Playground | Shop",
};

export default async function ProductsPageLayout({ children }: LayoutPageProps) {
  const { headerNavs } = await getMainNavigation()

  return (
    <div className="grid auto-rows-max auto-cols-auto md:grid-cols-6 w-full md:px-4 gap-4 min-h-screen">
      <div className="hidden md:block col-span-2 md:col-span-1 md:pt-24">
        <ShopNavigation _navs={headerNavs} />
      </div>
      <div className="md:mt-0 max-w-full flex md:justify-start md:min-h-screen col-span-5">
        <div className="hidden md:inline">
          <Divider vertical className="h-full ml-0" />
        </div>
        <div className="">
          {children}
        </div>
      </div>
    </div>
  );
}
