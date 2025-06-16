import { AppProps } from "index";
import SocialMediaButtons from "./SocialMediaButtons";
import Link from "next/link";
import { getMainNavigation, Nav } from "app/layout";
import LogoComponent from "./LogoComponent";
import { getCatalogObjects } from "api/catalogApi";
import { mapArrayToMap } from "util/index";

type Props = AppProps & { navs: Nav[] };

async function Footer({ navs }: Props) {
  const { leftNavs, rightNavs } = navs.reduce(
    (navs, nav) => {
      if (navs.leftNavs.length === navs.rightNavs.length)
        navs.leftNavs.push(nav);
      else navs.rightNavs.push(nav);

      return navs;
    },
    { leftNavs: [] as Nav[], rightNavs: [] as Nav[] }
  );
  const renderLink = ({ title, link }: Nav) => (
    <Link key={title} href={link ?? "#"} className="k-footer-link">
      {title}
    </Link>
  );

  const a = await getCatalogObjects(
    "ITEM,IMAGE,CATEGORY,ITEM_OPTION"
  )

  const mappedCatalogObjects = mapArrayToMap([...a.objects])

  console.log()

  const storeCategoryLinks = mappedCatalogObjects.categories.map((category) => ({
    name: category.categoryData?.name,
    link: "/shop/" + category.categoryData?.name?.toLowerCase().replace(" ", "")
  }))

  return (
    <footer className="k-footer">
      <div className="k-container-1">
        <div className="k-footer-top">
          <div className="k-footer-col">
            <div className="k-footer-header">store</div>
            {navs.map(renderLink)}
          </div>
          <div className="k-footer-col">
            <div className="k-footer-header">shop</div>
            {storeCategoryLinks.map((link) => (
              <Link href={link.link} key={link.name} className="k-footer-link">{link.name}</Link>
            ))}
            <Link href="/shop/sale" className="k-footer-link"><strong>🔥</strong> sale</Link>
          </div>
          <div className="k-footer-col">
            <div className="k-footer-header">help</div>
            <Link href="/terms-and-conditions" className="k-footer-link">Terms &amp; Conditions</Link>
            <Link href="/faqs" className="k-footer-link">exchange &amp; return</Link>
            {/* <Link href="/" className="k-footer-link">My account</Link> */}
            <Link href="/" className="k-footer-link">Privacy Policy</Link>
          </div>
          {/* <div className="k-footer-col">
            <div className="k-footer-header">useful links</div>
            <Link href="#" className="k-footer-link">Promotions</Link>
            <Link href="#" className="k-footer-link">discounts</Link>
            <Link href="#" className="k-footer-link">discount cards</Link>
            <Link href="#" className="k-footer-link">gift recepient</Link>
            <Link href="#" className="k-footer-link">exchange &amp; return</Link>
            <Link href="#" className="k-footer-link">My account</Link>
          </div> */}
        </div>
        <div className="k-footer-bottom">
          <div className="p-4 w-full">
            <div className="flex justify-center">
              <div className="min-w-1 min-h-6 relative">
                <Link href="/">
                  <LogoComponent className="w-full" />
                </Link>
              </div>
            </div>
            <div className="w-48 m-auto mt-4">
              <SocialMediaButtons align="around" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );

  return (
    <footer className="border-t border-gray-300 grid md:grid-cols-2 grid-cols-1 w-full p-4">

      <div className="w-full py-4">
        <div className="">
          {navs.map(renderLink)}
        </div>
      </div>
      <div className="p-4 w-full">
        <div className="flex justify-center">
          <div className="min-w-1 min-h-6 relative">
            <Link href="/">
              <LogoComponent className="w-full" />
            </Link>
          </div>
        </div>
        <div className="w-48 m-auto mt-4">
          <SocialMediaButtons align="around" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
