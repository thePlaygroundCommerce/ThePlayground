import { AppProps } from "index";
import SocialMediaButtons from "./SocialMediaButtons";
import Link from "next/link";
import { Nav } from "app/layout.jsx";
import LogoComponent from "./LogoComponent";

type Props = AppProps & { navs: Nav[] };

function Footer({ navs }: Props) {
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

  return (
    <footer className="k-footer">
      <div className="k-container-1">
        <div className="k-footer-top">
          <div className="k-footer-col">
            <div className="k-footer-header">help</div>
            {navs.map(renderLink)}
          </div>
          <div className="k-footer-col">
            <div className="k-footer-header">shop</div>
            <a href="#" className="k-footer-link">Kids</a>
            <a href="#" className="k-footer-link">boys</a>
            <a href="#" className="k-footer-link">girls</a>
            <a href="#" className="k-footer-link">On-sale</a>
            <a href="#" className="k-footer-link">excahnge &amp; return</a>
            <a href="#" className="k-footer-link">My account</a>
          </div>
          <div className="k-footer-col">
            <div className="k-footer-header">useful links</div>
            <a href="#" className="k-footer-link">Promotions</a>
            <a href="#" className="k-footer-link">discounts</a>
            <a href="#" className="k-footer-link">discount cards</a>
            <a href="#" className="k-footer-link">gift recepient</a>
            <a href="#" className="k-footer-link">excahnge &amp; return</a>
            <a href="#" className="k-footer-link">My account</a>
          </div>
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
