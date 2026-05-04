import React from "react";
import { BlogFeedItem } from "./BlogFeedItem";
import { PrismicNextLink } from "@prismicio/next";

const BlogFeed = ({ blogs }) => {
  return (
    <div className="grid grid-cols-4 gap-8 gap-x-14 px-48 py-12">
      {blogs.map((blog, i) => (
        <PrismicNextLink >
          <BlogFeedItem key={i} blog={blog.data} />
        </PrismicNextLink>
      ))}
    </div>
  );
};

export { BlogFeed };
