import { AppProps } from "index";
import SocialMediaButtons from "./SocialMediaButtons";
import Link from "next/link";
import Image from "next/image";
import { Nav } from "app/layout.jsx";
import Accordion from "rsuite/Accordion";
import AccordionPanel from "rsuite/AccordionPanel";
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
    <Link key={title} href={link ?? ""}>
      <ul className="w-full m-auto flex" key={title}>
        {title}
      </ul>
    </Link>
  );

  return (
    <footer className="border-t grid md:grid-cols-2 grid-cols-1 w-full p-4">
      <div className="w-full py-4">
        <div className="">
          {navs.map(renderLink)}
        </div>
      </div>
      <div className="p-4 w-full">
        <div className="flex justify-center">
          <div className="min-w-1 min-h-6 relative">
            <Link href="/">
              <LogoComponent />
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
