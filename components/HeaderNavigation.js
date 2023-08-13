"use client";

import { Popover } from "@headlessui/react";
import { useContext, useRef, useState } from "react";
import { BsPlus } from "react-icons/bs";
import HeaderNavigationPopover from "./HeaderNavigationPopover";
import { NavigationContext } from "context/navigationContext";

const HeaderNavigation = () => {
  const [show, setShow] = useState(false);

  const showPopover = (bool) => {
    return setShow(bool);
  };

  return (
    <Popover>
      {({ open, close }) => (
        <div>
          <div className="flex justify-center ">
            <Popover.Button onMouseOver={() => showPopover(true)}>
              <div className="flex items-center mx-3">
                <p className="m-0 me-1">MEN</p>
                <BsPlus />
              </div>
            </Popover.Button>
            <Popover.Button onMouseOver={() => showPopover(true)}>
              <div
                className="flex items-center mx-3"
              >
                <p className="m-0 me-1">WOMEN</p>
                <BsPlus />
              </div>
            </Popover.Button>
            <Popover.Button onMouseOver={() => showPopover(true)}>
              <div
                className="flex items-center mx-3"
              >
                <p className="m-0 me-1">SALE</p>
                <BsPlus />
              </div>
            </Popover.Button>
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
        </div>
      )}
    </Popover>
  );
};

export default HeaderNavigation;
