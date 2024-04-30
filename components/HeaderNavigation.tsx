"use client";

import { Popover } from "@headlessui/react";
import { useContext, useRef, useState } from "react";
import { BsPlus } from "react-icons/bs";
import HeaderNavigationPopover from "./HeaderNavigationPopover";
import { NavigationContext } from "context/navigationContext";
import Link from "next/link";
import { Nav } from "app/layout";
import { AppProps } from "types";

type Props = AppProps & { navs: Nav[] };

const HeaderNavigation = ({ navs }: Props) => {
  const [show, setShow] = useState(false);

  const showPopover = (bool: boolean) => {
    return setShow(bool);
    ``;
  };

  return (
    <nav>
      <ul className="flex whitespace-nowrap">
        {navs.map(({ data: { title, link } }: Nav) => (
          <li key={title} className="text-black w-full">
            <Link className="px-4 py-2 block w-full" href={link ?? ""}>
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default HeaderNavigation;
