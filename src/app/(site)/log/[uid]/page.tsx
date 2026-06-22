import { PrismicRichText, PrismicTable } from "@prismicio/react";
import { client } from "@/api/clients";
import Image from "@/components/Image";
import Heading from "@/components/typography/Heading";
import BlogTableOfContents from "@/components/BlogTableOfContents";
import { PageProps } from "index";
import { redirect } from "next/navigation";
import Divider from "@/components/Divider";
import { Fragment } from "react";
import { BlogPostDocument } from "prismicio-types";
import { isFilled } from "@prismicio/client";
import logger from "@/util/logger";
import { PrismicNextImage } from "@prismicio/next";
import _ from "lodash";

const Page = async ({ params }: PageProps) => {
  let blog: BlogPostDocument<string>;
  const { uid } = await params

  try {
    blog = await client.getByUID('blog_post', uid)
  } catch {
    logger.error("Missing blog with uid %s", uid)
    redirect("/log")
  }

  const { sections, title, headline, image } = blog.data

  const slugify = (text: string | undefined, index: number) =>
    (text || `section-${index + 1}`)
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

  const tableOfContents = sections.filter(({ heading }) => heading).map(({ heading }, i) => ({
    heading,
    id: slugify(heading, i),
  }))

  return (
    <div className="pt-15 p-4 flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <Heading level={1} className="my-4">{title}</Heading>
        <div>
          <p className="text-xs">The Playground Staff</p>
          <p className="text-xs">{new Date(blog.last_publication_date).toLocaleDateString(undefined, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}</p>
        </div>
        <div className="relative">
          <PrismicNextImage field={image} alt="" />
        </div>
        <p className="italic text-gray-400 w-3/4 mx-auto text-center">{headline}</p>
      </div>
      {tableOfContents.length > 0 && (
        <div className="w-3/4 mx-auto my-12">
          <BlogTableOfContents items={tableOfContents} />
        </div>
      )}
      {sections.map(({ heading, paragraph, table, includeDividers, blockquote, image, video }, i, arr) => {
        const id = tableOfContents[i]?.id || `section-${i + 1}`

        const img = isFilled.image(image) && <PrismicNextImage field={image} />
        const vid = isFilled.embed(video) && (
          <div style={{ position: "relative", paddingTop: "56.25%" }}>
            <iframe src={video.embed_url} loading="lazy" style={{ border: 0, position: "absolute", top: 0, height: "100%", width: "100%" }} allow="accelerometer; gyroscope; autoplay; encrypted- media;picture-in-picture;fullscreen;" allowFullScreen />
          </div>
        )

        return (
          <Fragment key={`section${i}`}>
            <div className="scroll-mt-24">
              <Heading id={id} level={2} className="mb-2">{heading}</Heading>
              {img || vid}
              <div className="max-w-4/5 text-lg tracking-wider inline-block">
                <PrismicRichText components={{
                  paragraph: ({ node, children }) => {
                    if (!_.isEmpty(blockquote)) {
                      return (
                        <blockquote className="my-4">{children}</blockquote>
                      )
                    }
                    // Fallback to a normal paragraph tag
                    return <p className="my-4">{children}</p>;

                  },
                  list: ({ children }) => <ul className="list-none space-y-3 pl-4 my-6">{children}</ul>,
                  oList: ({ children }) => <ol className="list-none space-y-3 pl-4 my-6">{children}</ol>,
                  listItem: ({ children }) => (
                    <li className="relative pl-8 text-lg text-slate-900 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-2.5 before:w-2.5 before:rounded-full before:bg-slate-400">
                      {children}
                    </li>
                  ),
                  // hyperlink
                }} field={!_.isEmpty(blockquote) ? blockquote : paragraph} />
              </div>
              {table && (
                <div className="max-w-4/5">
                  <div className="blog-table overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <PrismicTable field={table} />
                  </div>
                </div>
              )}
            </div>
            {includeDividers && i != arr.length - 1 && <Divider className="border-b border-gray-300" />}
          </Fragment>
        )
      })}
    </div >
  );
};

export default Page;
