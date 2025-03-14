import { PrismicRichText } from "@prismicio/react";
import Image from "components/Image";
import Heading from "components/typography/Heading";
import { PageProps } from "index";
import { redirect } from "next/navigation";
import { client } from "prismicio";

const Page = async ({ params }: PageProps) => {
  let blog;
  const { uid } = await params

  try {
    blog = await client.getByUID('blog_post', uid)
  } catch {
    // log error - mising blog with uid
    redirect("/log")
  }

  console.log(blog)
  const { sections, title, headline } = blog.data

  return (
    <div className="pt-[60px] p-4 flex flex-col gap-4">
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
      {sections.map(({ heading, paragraph, image }) => (
        <div>
          <Heading level={2} className="mb-2">{heading}</Heading>
          <PrismicRichText field={paragraph} />
        </div>
      ))}
    </div>
  );
};

export default Page;
