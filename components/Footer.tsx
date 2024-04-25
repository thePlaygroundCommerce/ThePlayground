import { AppProps } from "types";
import SocialMediaButtons from "./SocialMediaButtons.js";
import { FooterNavigationDocumentDataNavsItem } from "prismicio-types.js";
import { createClient } from "prismicio";
import Link from "next/link";
import Image from "next/image";

type Props = AppProps & {
  navs: FooterNavigationDocumentDataNavsItem[];
};

async function Footer({ navs }: Props) {
  const { leftNavs, rightNavs } = navs.reduce(
    ({ leftNavs, rightNavs }, nav) => {
      if (leftNavs.length === rightNavs.length) leftNavs.push(nav);
      else rightNavs.push(nav);

      return { leftNavs, rightNavs };
    },
    { leftNavs: [], rightNavs: [] }
  );
  const renderLink = ({ nav: { data } }) => (
    <ul className="w-full m-auto flex justify-center" key={data?.title}>{data?.title}</ul>
  );

  return (
    <footer className="border-t p-5 flex flex-col items-center w-full">
      <div className="w-2/3 border-b-2 p-4">
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
      </div>
      <div><SocialMediaButtons align="center" /></div>
    </footer>
  );
}

export default Footer;
