"use client";

import Link from "next/link";
import LogoComponent from "./LogoComponent";
import { Nav } from "app/layout";
import { IoClose } from "react-icons/io5";
import { List } from "rsuite";
import SocialMediaButtons from "./SocialMediaButtons";

export default function SideNavigation({ onClose, navs: { footerNavs, headerNavs } }: any) {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex justify-between px-4 p-2">
        <Link href="/">
          <LogoComponent height={25} width={25} />
        </Link>
        <button className="p-2 px-3" onClick={() => onClose(null, false)}>
          <IoClose />
        </button>
      </div>
      <div className="h-full flex flex-col justify-between">
        <nav className="text-end">
          <List size="md">
            {headerNavs.map(({ data: { title, link } }: Nav) => (
              <List.Item key={title} className="text-black w-full">
                <Link className="px-4 py-2 md:px-4 md:py-2 block w-full" href={link ?? ""}>
                  {title}
                </Link>
              </List.Item>
            ))}
          </List>
        </nav>
        <nav className="">
          <List size="sm" bordered={false}>
            {footerNavs.map(({ data: { title, link } }: Nav) => (
              <List.Item key={title} className="text-black w-full ">
                <Link className="px-4 py-2 md:px-4 md:py-2 block w-full" href={link ?? ""}>
                  {title}
                </Link>
              </List.Item>
            ))}
          </List>
        </nav>
      </div>
      <div>
        <SocialMediaButtons align="around" />
      </div>
    </div>
  );
  // return renderCategoryItems(Object.entries(formattedCategories), true);
}
