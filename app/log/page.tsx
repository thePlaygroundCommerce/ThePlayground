import { PrismicNextLink } from "@prismicio/next";
import { BlogFeedItem } from "components/BlogFeedItem";
import Hero from "components/Hero";
import Image from "components/Image";
import { createClient } from "prismicio";

type Props = {};

const Page = async ({ }: Props) => {
  const blogs = await createClient().getAllByType("blog");

  {
    /* // <PrismicNextLink href="" key={i}>
  //   <BlogFeedItem className="" blog={data} />
  // </PrismicNextLink> */
  }

  return (
    <div className="">
      <div className="">
        <Hero
          type="static"
          items={blogs.map(
            ({
              data: {
                coverimage: { dimensions, url, alt },
                ...rest
              },
              last_publication_date
            }) => ({ imageProps: { ...dimensions, src: url ?? "", alt: alt ?? "" }, last_publication_date, cta: "", ...rest })
          )}
        />
      </div>
      <div className="flex flex-col md:flex-roww justify-center container mx-auto flex-wrap gap-6 py-12">
        {blogs.map(({ data: { coverimage, title, headline } }, i) => (
          <div key={i} className="md:w-1/4 text-center flex flex-col gap-4">
            <div className="w-full">
              <Image
                {...{
                  alt: "",
                  src: coverimage.url ?? "",
                  ...coverimage.dimensions,
                  className: "h-auto rounded-lg",
                }}
              />
            </div>
            <div>
              <p>{title}</p>
              <p>maybe date</p>
            </div>
            <p>{headline}</p>
            <p>Read More</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
