import { Content, FilledContentRelationshipField, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `FeaturedCategories`.
 */
export type FeaturedCategoriesProps =
  SliceComponentProps<Content.FeaturedCategoriesSlice>;

/**
 * Component for "FeaturedCategories" Slices.
 */
const FeaturedCategories = ({
  slice,
  slice: { items }
}: FeaturedCategoriesProps): JSX.Element => {

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="flex gap-24 p-16"
    >
      {items.map(({ category }) => {

        if (!isFilled.contentRelationship<string, string, { uid: string, title: string }>(category)) return null

        const { data: { uid, title } = {} } = category

        return (
          <div key={uid} style={{ width: 300, height: 300 }} className="bg-gray-400 flex justify-center items-end">
            {title}
          </div>
        )
      })}
    </section>
  );
};

export default FeaturedCategories;
