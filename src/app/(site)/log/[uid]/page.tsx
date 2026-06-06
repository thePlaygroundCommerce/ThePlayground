import { PrismicRichText } from "@prismicio/react";
import { client } from "@/api/clients";
import Image from "@/components/Image";
import Heading from "@/components/typography/Heading";
import BlogTableOfContents from "@/components/BlogTableOfContents";
import { PageProps } from "index";
import { redirect } from "next/navigation";

const Page = async ({ params }: PageProps) => {
  let blog;
  const { uid } = await params

  try {
    blog = await client.getByUID('blog_post', uid)
  } catch {
    // log error - mising blog with uid
    redirect("/log")
  }

  const { sections, title, headline } = blog.data

  const slugify = (text: string | undefined, index: number) =>
    (text || `section-${index + 1}`)
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

  const tableOfContents = sections.map(({ heading }, i) => ({
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
        <div className="relative aspect-square">
          <Image alt="" />
        </div>
        <Heading>{headline}</Heading>
      </div>
      {tableOfContents.length > 0 && (
        <div className="w-3/4 mx-auto my-12">
          <BlogTableOfContents items={tableOfContents} />
        </div>
      )}
      {sections.map(({ heading, paragraph, image }, i) => {
        const id = tableOfContents[i]?.id || `section-${i + 1}`
        return (
          <div key={i} className="scroll-mt-24">
            <Heading id={id} level={2} className="mb-2">{heading}</Heading>
            <div className="max-w-4/5 text-lg tracking-wider inline-block">
              <PrismicRichText field={paragraph} />
            </div>
          </div>
        )
      })}
    </div>
  );
};

export default Page;
