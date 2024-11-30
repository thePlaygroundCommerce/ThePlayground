"use client";

import Link from "next/link";
import { Nav } from "app/layout";
import { IoClose } from "react-icons/io5";
import { List } from "rsuite";
import SocialMediaButtons from "./SocialMediaButtons";
import { AppProps } from "index";
import { KeyTextField } from "@prismicio/client";
import Button from "./Button";

type Props = AppProps & {
  logo: JSX.Element
  onClose: any;
  navs: {
    footerNavs: Nav[],
    headerNavs: Nav[],
  }
}

export default function SideNavigation({ logo, onClose, navs: { footerNavs, headerNavs } }: Props) {
  const removedLinks: KeyTextField[] = ["/log"]
  // footerNavs = footerNavs.filter(({ data: { link } }) => !removedLinks.includes(link))

  const handleClose = () => onClose(null, false)

  return (
    <div className="h-screen flex flex-col">
      <div className="flex justify-between px-4 p-2">
        <Link href="/">
          {logo}
        </Link>
        <Button className="p-2 px-3" onClick={handleClose}>
          <IoClose />
        </Button>
      </div>
      <div className="h-full flex flex-col justify-between">
        <nav className="text-end">
          <List size="md">
            {headerNavs.map(({ title, link }) => (
              <List.Item key={title} className="text-black w-full">
                <Link onClick={handleClose} className="px-4 py-2 md:px-4 md:py-2 block w-full" href={`/shop${link ?? ""}`}>
                  {title}
                </Link>
              </List.Item>
            ))}
          </List>
        </nav>
        {/* <nav className="">
          <List size="sm" bordered={false}>
            {footerNavs.map(({ data: { title, link } }) => (
              <List.Item key={title} className="text-black w-full ">
                <Link onClick={handleClose} className="px-4 py-2 md:px-4 md:py-2 block w-full" href={link ?? ""}>
                  {title}
                </Link>
              </List.Item>
            ))}
          </List>
        </nav> */}
      </div>
      <div className="p-4">
        <SocialMediaButtons align="around" />
      </div>
    </div>
  );
}
