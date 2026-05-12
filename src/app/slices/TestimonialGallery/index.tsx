import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import styles from "./TestimonialGallery.module.css";
import clsx from "clsx";

/**
 * Props for `TestimonialGallery`.
 */
export type TestimonialGalleryProps =
  SliceComponentProps<Content.TestimonialGallerySlice>;

/**
 * Component for "TestimonialGallery" Slices.
 */
const TestimonialGallery: FC<TestimonialGalleryProps> = ({ slice }) => {
  return (
    <section
      className={styles.container}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className={styles.content}>
        <div className={styles.headline}>
          <PrismicRichText field={slice.primary.heading} />
        </div>

        <div className={styles.ratingSection}>
          <div className={styles.stars}>
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i}>★</span>
            ))}
          </div>
        </div>

        <div className={styles.description}>
          <PrismicRichText field={slice.primary.description} />
        </div>

        <div className="flex md:flex-row-reverse flex-col gap-12">
          <div className={clsx(styles.galleryContainer, "flex-1")}>
            {slice.primary.gallery_images.map((item, index) => (
              <div key={index} className={styles.galleryItem}>
                <PrismicNextImage field={item.image} />
              </div>
            ))}
          </div>

          <div className={clsx(styles.testimonialsContainer, "flex-1")}>
            {slice.primary.testimonials.map((item, index) => (
              <div key={index} className={styles.testimonialCard}>
                <div className={styles.testimonialStars}>
                  {Array.from({ length: item.rating_count || 5 }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <div className={""}>
                  <PrismicRichText field={item.title} />
                </div>
                <div className={styles.testimonialQuote}>
                  <PrismicRichText field={item.quote} />
                </div>
                <div className={styles.authorName}>
                  {item.author_name}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default TestimonialGallery;
