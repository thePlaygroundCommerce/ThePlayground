import { getMainNavigation } from "app/layout";
import Header from "components/Header";
import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const { headerNavs } = await getMainNavigation()

  return (
    <>
      <Header navs={{ headerNavs }} className="bg-transparent" />
      {children}
    </>
  );
};

export default Layout;
