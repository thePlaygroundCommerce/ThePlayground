"use client";

import { Popover } from "@headlessui/react";
import { useContext, useRef, useState } from "react";
import { BsPlus } from "react-icons/bs";
import HeaderNavigationPopover from "./HeaderNavigationPopover";
import { NavigationContext } from "context/navigationContext";
import Link from "next/link";

const HeaderNavigation = ({ navs }: { navs: any }) => {
  const [show, setShow] = useState(false);

  const showPopover = (bool: boolean) => {
    return setShow(bool);
    ``;
  };

  return (
    <nav>
      <ul className="flex whitespace-nowrap">
        {navs.map(({ nav: { data } }: { nav: { data: any } }) => (
          <li key={data.title} className="text-black w-full">
            <Link className="px-4 py-2 block w-full" href="/">
              {data.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default HeaderNavigation;
