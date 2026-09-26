import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import Grid from "@/components/PhotoGrid";
import { ContentImage, ContentData } from "index";

/**
 * Props for `PhotoGrid`.
 */
export type PhotoGridProps = SliceComponentProps<Content.PhotoGridSlice>;

/**
 * Component for "PhotoGrid" Slices.
 */
const PhotoGrid: FC<PhotoGridProps> = ({ slice }) => {

  const gridItems: (ContentImage | ContentData)[] = isFilled.group(slice.primary.gallery_items) && slice.primary.gallery_items.map(({ image }) => ({
    title: "Backpacks",
    link: "/backpacks",
    src: isFilled.image(image) && image.url

  })) || []

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <PrismicRichText field={slice.primary.title} />
      <Grid gridItems={gridItems} />
      {/* <div className="grid grid-cols-4">
        {slice.primary.gallery_items.map((item, index) => (
          <div key={index}>
            <PrismicNextImage alt="" field={item.image} />
            {item.caption && <span>{item.caption}</span>}
          </div>
        ))}
      </div> */}
    </section>
  );
};

export default PhotoGrid;
