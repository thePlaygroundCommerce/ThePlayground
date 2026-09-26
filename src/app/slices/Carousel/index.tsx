import { FC } from "react";
import Image from "@/components/Image";
import CarouselComponent from "@/components/Carousel";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import clsx from "clsx";

/**
 * Props for `Carousel`.
 */
export type CarouselProps = SliceComponentProps<Content.CarouselSlice>;

/**
 * Component for "Carousel" Slices.
 */
const CarouselSlice: FC<CarouselProps> = ({ slice }) => {
  const items = [
    // <Image key={"b"} src={slice.primary.items[0].image.url} alt={"image 1"} height={1080} width={1080} className="object-cover" />,
    // <Image key={"a"} src={slice.primary.items[0].image.url} alt={"image 2"} height={1080} width={1080} className="object-cover" />
  ]
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="h-auto md:h-screen md:p-16"
    >
      <Carousel items={items} text={<PrismicRichText field={slice.primary.text} />} />
    </section>
  );
};

export default CarouselSlice;

export const Carousel = ({ items, text }) => {
  return (
    <div className="md:grid grid-cols-1 md:grid-cols-4 h-full gap-2">
      <div className="md:col-span-3">
        <CarouselComponent items={items} />
      </div>
      <div className="md:col-span-1 flex flex-col md:justify-end px-2">
        {text}
      </div>

    </div>
  )
}
