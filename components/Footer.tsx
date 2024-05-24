"use client"

import { AppProps } from "types";
import SocialMediaButtons from "./SocialMediaButtons.js";
import { FooterNavigationDocumentDataNavsItem } from "prismicio-types.js";
import { createClient } from "prismicio";
import Link from "next/link";
import Image from "next/image";
import { Nav } from "app/layout.jsx";
import { Accordion, Placeholder } from "rsuite";

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
  const renderLink = ({ data: { title } }: Nav) => (
    <ul className="w-full m-auto flex justify-center" key={title}>
      {title}
    </ul>
  );

  return (
    <footer className="border-t flex flex-col items-center w-full">
      <div className="w-full py-4">
        <Accordion>
          <Accordion.Panel header="Shop" defaultExpanded>
            <nav className="flex flex-col justify-center">
              {leftNavs.map(renderLink)}
              {rightNavs.map(renderLink)}
            </nav>
          </Accordion.Panel>
          <Accordion.Panel header="About">
            <Placeholder.Paragraph />
          </Accordion.Panel>
          <Accordion.Panel header="Help">
            <Placeholder.Paragraph />
          </Accordion.Panel>
        </Accordion>
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

      </div>
      {/* <div className="w-2/3 border-b-2 p-4">
        <nav className="flex justify-center">
          {leftNavs.map(renderLink)}
          <ul className="m-auto flex justify-center">
            <Link href="/">
              <Image
                alt="Logo"
                src="/The Playground Logo_Black.svg"
                height={75}
                width={75}
              />
            </Link>
          </ul>
          {rightNavs.map(renderLink)}
        </nav>
      </div> */}
      <div>
        <SocialMediaButtons align="center" />
      </div>
    </footer>
  );
}

export default Footer;
