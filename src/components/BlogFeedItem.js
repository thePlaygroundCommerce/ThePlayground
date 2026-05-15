import { PrismicNextImage } from "@prismicio/next";
import React from "react";

const BlogFeedItem = ({ className, blog: { coverimage } }) => {
  return (
    <div
      className={
        className +
        " flex h-full flex-col justify-between overflow-hidden rounded-b-lg border-b pb-2"
      }
    >
      <div className="max-h-1/3">
        <PrismicNextImage field={coverimage} />
      </div>
      {/* <div className="mt-8 flex h-full flex-col">
        <div className="flex h-full flex-col">
          <div className="mb-6">
            <PrismicRichText
              field={blog.title}
              components={{
                heading1: ({ children }) => (
                  <Heading size="md" className="first:mt-0 last:mb-0">
                    {children}
                  </Heading>
                ),
              }}
            />
          </div>
          <div className="h-full flex justify-end flex-col">
            <PrismicRichText field={blog.author} />
            <PrismicRichText
              field={blog.content}
              components={{
                paragraph: ({ text, children }) => (
                  <ClampLines id="0" text={text} innerElement="p" lines={3} />
                ),
              }}
            />
          </div>
        </div>
        <p>{blog.date_created}</p>
      </div>
      <div className="px-4 py-2">
        <p className="text-right">Outdoors</p>
      </div> */}
    </div>
  );
};

export { BlogFeedItem };
