import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicTable, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `BlogTable`.
 */
export type BlogTableProps = SliceComponentProps<Content.BlogTableSlice>;

/**
 * Component for "BlogTable" Slices.
 */
const BlogTable: FC<BlogTableProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="max-w-4/5">
        <div className="blog-table overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
          <PrismicTable field={slice.primary.table} />
        </div>
      </div>
    </section>
  );
};

export default BlogTable;
