import { client } from "@/api/clients";
import Image from "@/components/Image";
import { Paginate } from "@/components/Paginate";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Playground | Blog",
};

const BLOG_PAGE_SIZE = 5

const Page = async ({ searchParams }: PageProps<"/log">) => {
  const { page: pge = 1 } = await searchParams
  const { results: blogs, total_pages: max, page } = await client.getByType("blog_post", {
    page: Number(pge),
    pageSize: BLOG_PAGE_SIZE
  }); 

  return (
    <div className="mt-24 p-4 sm:p-0">
      <h2 className="mb-12">Travel Tips & Stories</h2>

      {blogs.map(({ data: { image, title } }) => (
        <div key={title} className="flex flex-col lg:flex-row gap-4 mb-24">

          <div className="flex-1">
            <div className="aspect-square w-full relative">
              <Image
                {...{
                  alt: "",
                  src: image.url ?? undefined,
                  ...image.dimensions,
                  className: "h-auto rounded-lg",
                }}
              />
            </div>
          </div>
          <div className="flex-1 lg:flex lg:flex-col">
            <div className="sm:flex lg:flex-col mb-12">
              <div className="flex-3 mb-4">
                <h2 className="text-bold text-3xl">Header</h2>
                <p className="text-gray-300 text-sm">Date</p>
              </div>
              <p className="flex-2 text-ellipsis">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam dolores rem architecto veniam cupiditate cumque.</p>
            </div>
            <Link className="block text-center m-auto bg-black w-1/2 p-4 rounded-2xl text-gray-200" href="#">Read</Link>
          </div>
        </div>
      ))}

      <div className="flex justify-center items-center m-12">
        <Paginate page={Number(page)} max={max} />
      </div>
    </div>
  );
};

export default Page;
