"use client";

import { LayoutPageProps } from "./layout";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

gsap.registerPlugin(useGSAP);

const Transition = ({ children }: { children: (start: boolean) => JSX.Element }) => {
  const b = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children(false));
  const [c, setC] = useState(b);
  const [start, setStart] = useState(false);

  const container = useRef(null);

  useEffect(() => {
    setStart(true);
    return () => setStart(false);
  }, []);

  // useGSAP(() => {
  //   console.log(b, c)
  //   if (c !== b) {
  //     //   setC(b)
  //     //   console.log(container.current, 'opacity 0')
  //     gsap.fromTo(container.current, { opacity: 1 }, { opacity: 0 })
  //     //   gsap.to(container.current, { opacity: 0 }).then(() => {
  //     //     // setDisplayChildren(children)
  //     //     gsap.to(container.current, { opacity: 1 })
  //     //   })
  //   }
  // }, [b])

  // useGSAP(() => {
  //   gsap.to(container.current, { opacity: 1, duration: 1 })
  // }, { revertOnUpdate: true, dependencies: [b] })

  // return (
  //   <div ref={container} style={{ opacity: 0 }} className={""}>{displayChildren}</div>
  // );

  return children(start);
  // return (
  //   <div
  //     onClick={(e) => {
  //       e.preventDefault();
  //       console.log("clicked");
  //     }}
  //     className={clsx(
  //       "ease-in-out delay-1000 transition-opacity duration-[2000ms]",
  //       start ? "opacity-100" : "opacity-0"
  //     )}
  //   >
  //     {children}
  //   </div>
  // );
};

export default Transition;
