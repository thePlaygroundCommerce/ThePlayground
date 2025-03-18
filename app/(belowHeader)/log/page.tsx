import Image from "components/Image";
import { PageProps } from "index";
import { createClient } from "prismicio";

const Page = async (props: PageProps) => {
  const blogs = await createClient().getAllByType("blog_post");

  return (
    <div className="pt-[80px] p-4">
      <div className="flex">
        <div>
          <div className="aspect-square relative">
            <Image alt="" />
          </div>
          <div>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam dolores rem architecto veniam cupiditate cumque.</p>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam dolores rem architecto veniam cupiditate cumque.</p>
            <p>Author</p>
            <p>Date</p>
          </div>
        </div>
        <div></div>
        {/* <Hero
          type="static"
          items={blogs.map(
            ({
              data: {
                image: { dimensions, url, alt },
                ...rest
              },
              last_publication_date
            }) => ({ image: { ...dimensions, src: url ?? undefined, alt: alt ?? "" }, last_publication_date, link: "", ...rest })
          )}
        /> */}
      </div>
      <div className="flex flex-col md:flex-row justify-center container mx-auto flex-wrap gap-6 py-12">
        {blogs.map(({ data: { image, title, headline } }, i) => (
          <div key={i} className="md:w-1/4 text-center flex flex-col gap-4">
            {/* <div className="w-full">
              <Image
                {...{
                  alt: "",
                  src: image.url ?? undefined,
                  ...image.dimensions,
                  className: "h-auto rounded-lg",
                }}
              />
            </div> */}
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
