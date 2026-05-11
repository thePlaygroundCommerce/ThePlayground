"use client";

import Image from "@/components/Image";
import clsx from "clsx";
import { isImageProps } from "./Hero";
import Heading from "./typography/Heading";
import Link from "next/link";
import Button from "./Button";
import Transition from "@/components/Transition";
import { loremIpsum } from "lorem-ipsum";
import { AppProps, Content } from "index";
import { renderContent } from "@/util/index";
import MuxPlayer from "@mux/mux-player-react";
import { Hero2Props } from "@/app/slices/ProductShowcase";
import { ReactNode } from "react";

type ShowcaseProps = {
  id?: number
  content: ReactNode
  text: ReactNode
  cta: ReactNode
  reverse: boolean
};

const Showcase = ({
  id = 0,
  ...rest
}: ShowcaseProps): JSX.Element => {
  const ShowcaseComponent = showcases[id];

  return <ShowcaseComponent {...rest} />

  // return (
  //   <div
  //     className={clsx(animationClasses, "grid sm:h-full lg:grid-cols-2 gap-4")}
  //   >
  //     <Transition>
  //       {(start: boolean) => (
  //         <>
  //           {/* <div
  //             className={clsx(
  //               "w-full h-full duration-[2000ms] rounded overflow-hidden",
  //               animate?.delay && `delay-[${animate.delay}ms]`,
  //               !start && animate ? "-translate-x-full" : "translate-x-0",
  //               // classes?.image
  //             )}
  //           >
  //             {VideoComponent || ImageComponent}
  //             </div> */}
  //           {VideoComponent || ImageComponent}
  //           <div className={clsx("w-full", flipped && "sm:order-first")}>
  //             {renderContent(
  //               content,
  //               (
  //                 {
  //                   headline,
  //                   title,
  //                   form,
  //                   link,
  //                   linkLabel,
  //                   description,
  //                   cta,
  //                 } = {
  //                     headline: "",
  //                     title: "",
  //                   }
  //               ) => {
  //                 description =
  //                   description ??
  //                   loremIpsum({
  //                     count: 4,
  //                     units: "sentences",
  //                   });
  //                 return (
  //                   <div
  //                     className={clsx(
  //                       "w-full duration-2000 delay-2000",
  //                       // !start ? "opacity-0" : "opacity-1",
  //                       animate?.delay && `delay-[${animate.delay + 2000}ms]`,
  //                       " flex flex-col justify-start md:justify-center md:items-center md:h-full"
  //                     )}
  //                   >
  //                     <div
  //                       className={clsx(
  //                         "text-center text-black mb-12"
  //                       )}
  //                     >
  //                       <div className="mb-2">
  //                         {typeof title === "string" ? (
  //                           <Heading level={1}>
  //                             {title}
  //                           </Heading>
  //                         ) : (
  //                           title
  //                         )}
  //                       </div>
  //                       <p className="text-sm italic">{headline}</p>
  //                       <div className="text-center text-xl">
  //                         {typeof description === "string" ? (
  //                           <p>{description}</p>
  //                         ) : (
  //                           description
  //                         )}
  //                       </div>
  //                     </div>
  //                     {form}
  //                     {linkLabel && (
  //                       <div className="w-full">
  //                         <Link href={link ?? ""}>
  //                           <Button className="p-6 rounded-2xl text-lg font-semibold block w-3/4 mx-auto" variant="primary">
  //                             {linkLabel}
  //                           </Button>
  //                         </Link>
  //                       </div>
  //                     )}
  //                   </div>
  //                 );
  //               }
  //             )}
  //           </div>
  //         </>
  //       )}
  //     </Transition>
  //   </div>
  // );
};

export default Showcase;

const Compact = ({ children, makeFirst }: AppProps & { makeFirst: boolean }) => (
  <div className="w-full h-screen flex justify-center md:justify-end items-center">
    <div className="h-3/4 w-3/4 overflow-hidden rounded-lg border-2">
      {children}
    </div>
  </div>
);
const Window = ({ children, makeFirst }: AppProps & { makeFirst: boolean }) => (
  <div className="h-full w-full p-48">{children}</div>
);
const Showcase1 = ({ text, content, cta, reverse }: Omit<ShowcaseProps, 'id'>) => (
  <div className={clsx("min-h-[25vh] flex flex-col lg:grid lg:grid-cols-2 gap-4 lg:gap-8 lg:items-center", reverse && "lg:order-first")}>
    {content && <div className="flex-1 overflow-hidden m-0 aspect-square rounded-3xl">{content}</div>}
    <div className={clsx("flex-1", reverse && "order-first")}>
      {text && <div className="flex-1">{text}</div>}
      {cta && <div className="flex-1 w-full">{cta}</div>}
    </div>
  </div>
);
const List = ({ children, key }: AppProps) => (
  <ul className="m-4 list-disc" key={key}>
    {children}
  </ul>
);
const ListItem = ({ children, key }: AppProps) => (
  <li className="" key={key}>
    {children}
  </li>
);
const Showcase2 = ({ text, content, reverse }: Omit<ShowcaseProps, 'id'>) => (
  <div className={clsx(
    "flex flex-col justify-center items-center "
  )}>
    {/* <div className="aspect-square w-full m-12 rounded-4xl overflow-hidden">
      {children}
    </div> */}
  </div>
);
const Showcase3 = ({ text, content, cta, reverse }: Omit<ShowcaseProps, 'id'>) => {

  return (
    <div className={clsx("min-h-[25vh] flex flex-col gap-4 lg:gap-8 lg:items-center", reverse && "lg:order-first")}>
      {text && <div className="flex-1 p-4">{text}</div>}
      <div className="flex-1">
        {content && <div className="flex-1 lg:flex-none">{content}</div>}
        {cta && <div className="flex-1 w-full">{cta}</div>}
      </div>
    </div>
  )
}

const showcases = [
  Showcase1,
  Showcase2,
  Showcase3,
]