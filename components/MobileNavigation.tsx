"use client";

import { Nav } from "app/layout";
import SocialMediaButtons from "./SocialMediaButtons";
import { AppProps } from "index";
import { KeyTextField } from "@prismicio/client";
import clsx from "clsx";
import { useEffect, useState } from "react";

type Props = AppProps & {
  logo: JSX.Element
  navs: {
    headerNavs: Nav[],
  }
}

export default function MobileNavigation({ }: Props) {
  const removedLinks: KeyTextField[] = ["/log"]
  // footerNavs = footerNavs.filter(({ data: { link } }) => !removedLinks.includes(link))
  const [open, setOpen] = useState(false)

  // const handleClose = () => onClose(null, false)

  useEffect(() => {
    setOpen(true)
  }, [])

  const classes = {
    a: clsx("bg-white shadow-[0_-4px_30px_-15px_var(--border)] items-center w-full px-[3vw] h-full"),
    b: clsx(
      // Base styles
      'transition ease-in-out duration-1000',
      // Shared closed styles
      open ? "opacity-100" : "opacity-0",
      "translate-x-0"
    )
  }

  const navs = [
    { name: "Shop", link: "/shop" },
    { name: "Our Store", link: "/about" },
    { name: "Stories", link: "/about" },
    { name: "Shopping Cart", link: "/cart" },
    // { name: "Account", link: "/account" },
  ]

  return (
    // <Transition show={open}>
    <div
      data-w-id="d28673fe-a739-7b74-1763-af2ee311f24f"
      data-wf-id='["3c4b54f7-5d09-4b8c-b972-66c749e5325c","d28673fe-a739-7b74-1763-af2ee311f24f"]'
      className={classes.a}
      style={{
        // transform:
        //   "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
        // transformStyle: "preserve-3d",
        // height: `calc(100vh - ${headerHeight ?? 0}px)`,
        // top: `${44}px`,
        // display: "flex",
        opacity: 1,
      }}
    >
      {/* <div className="flex justify-between px-4 p-2">
        <Link href="/">
          {logo}
        </Link>
        <Button className="p-2 px-3" onClick={handleClose}>
          <IoClose />
        </Button>
      </div> */}
      <div
        data-w-id="d28673fe-a739-7b74-1763-af2ee311f250"
        data-wf-id='["3c4b54f7-5d09-4b8c-b972-66c749e5325c","d28673fe-a739-7b74-1763-af2ee311f250"]'
        className="k-nav-modal"
      >
        {/* <Search /> */}
        <ul
          data-w-id="d28673fe-a739-7b74-1763-af2ee311f257"
          data-wf-id='["3c4b54f7-5d09-4b8c-b972-66c749e5325c","d28673fe-a739-7b74-1763-af2ee311f257"]'
          role="list"
          className="k-nav-list w-list-unstyled"
        >
          {navs.map(nav => (
            <li
              key={nav.name}
              data-w-id="d28673fe-a739-7b74-1763-af2ee311f258"
              data-wf-id='["3c4b54f7-5d09-4b8c-b972-66c749e5325c","d28673fe-a739-7b74-1763-af2ee311f258"]'
              className={clsx(classes.b, "l-nav-list-item")}
            >
              <a
                data-w-id="d28673fe-a739-7b74-1763-af2ee311f259"
                data-wf-id='["3c4b54f7-5d09-4b8c-b972-66c749e5325c","d28673fe-a739-7b74-1763-af2ee311f259"]'
                href={nav.link}
                className="k-nav-link-s"
              >
                {nav.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-4 pt-8">
        <SocialMediaButtons align="around" />
      </div>
    </div>
    // </Transition>
  )

  // return (
  //   <div className="h-screen flex flex-col">
  //     <div className="flex justify-between border-b px-4 p-2">
  //       <Link href="/">
  //         {logo}
  //       </Link>
  //       <Button className="p-2 px-3" onClick={handleClose}>
  //         <IoClose />
  //       </Button>
  //     </div>
  //     <div className="h-full flex flex-col justify-between">
  //       <nav className="text-end">
  //         <List size="md">
  //           {headerNavs.map(({ title, link }) => (
  //             <List.Item key={title} className="text-black w-full">
  //               <Link onClick={handleClose} className="px-4 py-2 md:px-4 md:py-2 block w-full" href={`/shop${link ?? ""}`}>
  //                 {title}
  //               </Link>
  //             </List.Item>
  //           ))}
  //         </List>
  //       </nav>
  //       {/* <nav className="">
  //         <List size="sm" bordered={false}>
  //           {footerNavs.map(({ data: { title, link } }) => (
  //             <List.Item key={title} className="text-black w-full ">
  //               <Link onClick={handleClose} className="px-4 py-2 md:px-4 md:py-2 block w-full" href={link ?? ""}>
  //                 {title}
  //               </Link>
  //             </List.Item>
  //           ))}
  //         </List>
  //       </nav> */}
  //     </div>
  //     <div className="p-4">
  //       <SocialMediaButtons align="around" />
  //     </div>
  //   </div>
  // );
}
