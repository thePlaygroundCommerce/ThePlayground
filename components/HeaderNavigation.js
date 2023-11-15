"use client";

import { Popover } from "@headlessui/react";
import { useContext, useRef, useState } from "react";
import { BsPlus } from "react-icons/bs";
import HeaderNavigationPopover from "./HeaderNavigationPopover";
import { NavigationContext } from "context/navigationContext";
import Link from "next/link";

const HeaderNavigation = ({ navs }) => {
  const [show, setShow] = useState(false);

  const showPopover = (bool) => {
    return setShow(bool);
  };

  return (
    <nav>
      {/* <Popover>
        {({ open, close }) => ( */}
          <ul className="flex whitespace-nowrap">
            {navs.map(({ nav: { data } }) => (
              <li key={data.title} className="text-black w-full">
                <Link className="px-4 py-2 block w-full" href="/">{data.title}</Link>
              </li>
            ))}
            {/* <div>
              <div className="flex justify-center ">
                {navs.map(({ nav: { data } }) => (
                  <Popover.Button
                    key={data.title}
                    onMouseOver={() => showPopover(true)}
                  >
                    <div className="flex items-center mx-3">
                      <p className="m-0 me-1">{data.title}</p>
                    </div>
                  </Popover.Button>
                ))}
              </div>

              {show && (
                <Popover.Panel
                  static
                  onMouseLeave={() => showPopover(false)}
                  className="absolute p-5 bg-white top-full border w-full z-10"
                >
                  <HeaderNavigationPopover />
                </Popover.Panel>
              )}
            </div> */}
          </ul>
        {/* )}
      </Popover> */}
    </nav>
  );
};

export default HeaderNavigation;
