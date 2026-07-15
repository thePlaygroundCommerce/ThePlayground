import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import _ from "lodash";
import Heading from "@/components/typography/Heading";

/**
 * Props for `BlogText`.
 */
export type BlogTextProps = SliceComponentProps<Content.BlogTextSlice>;

/**
 * Component for "BlogText" Slices.
 */
const BlogText: FC<BlogTextProps & { tableOfContents: { heading: string, id: string }[] }> = ({ slice, tableOfContents }) => {
  const dataAttr = {
    "data-slice-type": slice.slice_type,
    "data-slice-variation": slice.variation
  }
  return (
    <PrismicRichText components={{
      heading1: ({ children, text }) => <Heading {...dataAttr} id={tableOfContents.find(({ heading }) => heading === text)?.id} level={1}>{children}</Heading>,
      heading2: ({ children, text }) => <Heading {...dataAttr} id={tableOfContents.find(({ heading }) => heading === text)?.id} level={2}>{children}</Heading>,
      heading3: ({ children, text }) => <Heading {...dataAttr} id={tableOfContents.find(({ heading }) => heading === text)?.id} level={3}>{children}</Heading>,
      heading4: ({ children, text }) => <Heading {...dataAttr} id={tableOfContents.find(({ heading }) => heading === text)?.id} level={4}>{children}</Heading>,
      heading5: ({ children, text }) => <Heading {...dataAttr} id={tableOfContents.find(({ heading }) => heading === text)?.id} level={5}>{children}</Heading>,
      heading6: ({ children, text }) => <Heading {...dataAttr} id={tableOfContents.find(({ heading }) => heading === text)?.id} level={6}>{children}</Heading>,
      paragraph: ({ children, ...rest }) => {
        // if (!_.isEmpty(blockquote)) {
        //   return (
        //     <blockquote className="my-4">{children}</blockquote>
        //   )
        // }
        // Fallback to a normal paragraph tag
        return <p {...dataAttr} className="my-4">{children}</p>;

      },
      list: ({ children }) => <ul className="list-none space-y-3 pl-4 my-6">{children}</ul>,
      oList: ({ children }) => <ol className="list-none space-y-3 pl-4 my-6">{children}</ol>,
      listItem: ({ children }) => (
        <li className="relative pl-8 text-lg text-slate-900 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-2.5 before:w-2.5 before:rounded-full before:bg-slate-400">
          {children}
        </li>
      ),
      // hyperlink
    }} field={slice.primary.text} />
  );
};

export default BlogText;
