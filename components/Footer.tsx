"use client"

import { AppProps } from "types";
import SocialMediaButtons from "./SocialMediaButtons";
import Link from "next/link";
import Image from "next/image";
import { Nav } from "app/layout.jsx";
import { Accordion, Placeholder } from "rsuite";

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
  const renderLink = ({ data: { title, link } }: Nav) => (
    <Link key={title} href={link ?? ""}>
      <ul className="w-full m-auto flex" key={title}>
        {title}
      </ul>
    </Link>
  );

  return (
    <footer className="border-t grid md:grid-cols-2 grid-cols-1 w-full md:p-4">
      <div className="w-full py-4">
        <div className="md:hidden">
          <Accordion>
            <Accordion.Panel header="Help">
              <nav>
                {[{ data: { title: "Contact Us", link: "/contact" } }].map(renderLink)}
              </nav>
            </Accordion.Panel>
          </Accordion>
        </div>
        <div className="hidden md:block w-3/4 m-auto mt-6">
          {[...leftNavs, ...rightNavs].map(renderLink)}
        </div>
      </div>
      <div className="p-4 w-full">
        <div className="flex justify-center">
          <Link href="/">
            <Image
              alt="Logo"
              src="/The Playground Logo_Black.svg"
              height={75}
              width={75}
            />
          </Link>
        </div>
        <div className="w-48 m-auto mt-4">
          <SocialMediaButtons align="around" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
