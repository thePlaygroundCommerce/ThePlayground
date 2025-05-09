"use client";
import { Fragment, useEffect, useState } from "react";
import ProductImageViewer from "./ProductImageViewer";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import Image from "components/Image";
import clsx from "clsx";
import Button from "./Button";
import Carousel from "./Carousel";
import { CatalogObject } from "square";
import { KeenSliderInstance } from "keen-slider/react";
import Divider from "./Divider";

function ProductImageGallery({ images }: { images: CatalogObject[] }) {
  const [activeImageIndex, setActiveVariationIndex] = useState(0);

  const handleImageChange = (index: number) => setActiveVariationIndex(index)
  const [carouselRef, setCarouselRef] = useState<KeenSliderInstance<
    unknown,
    {
      track: {
        details: {
          abs: string;
        };
      };
    }
  > | null>(null)
  const handleIncrement = () => carouselRef?.prev()
  const handleDecrement = () => carouselRef?.next()

  return (
    <>
      <div className="k-product-thumb-img-wrapper">
        <div className="k-product-gallery">
          <div
            data-delay={4000}
            data-animation="slide"
            className="k-vertical-slider w-slider"
            data-autoplay="false"
            data-easing="ease"
            data-hide-arrows="false"
            data-disable-swipe="false"
            data-autoplay-limit={0}
            data-nav-spacing={3}
            data-duration={500}
            data-infinite="true"
            role="region"
            aria-label="carousel"
          >
            <div className="k-v-slider-mask w-slider-mask" id="w-slider-mask-0">
              {images.slice(0, 5).map((image, i) => (
                <Fragment key={image.imageData?.name ?? i}>
                  <div
                    className={clsx("k-vertical-slide relative inline-block object-contain align-top w-full h-full whitespace-normal text-left ")}
                    aria-label={i + " of 5"}
                    onClick={() => handleImageChange(i)}
                    role="group"
                    style={{
                      transition: "all",
                      transform: "translateX(0px)",
                      opacity: 1
                    }}
                  >
                    <Image
                      alt={image.imageData?.caption ?? ""}
                      src={image.imageData?.url ?? ""}
                      sizes="100vw"
                      // srcSet="https://cdn.prod.website-files.com/606072483975b0a200b7dff6/6084f34dc96abefb6fa13070_87035655_94-p-500.jpeg 500w, https://cdn.prod.website-files.com/606072483975b0a200b7dff6/6084f34dc96abefb6fa13070_87035655_94.jpeg 640w"
                      className="k-product-small-image cursor-pointer"
                    />
                  </div>
                  <Divider className={clsx(activeImageIndex !== i && "border-transparent", "border-b-2 w-1/2 mx-auto rounded")} />
                </Fragment>
              ))}
              <div
                aria-live="off"
                aria-atomic="true"
                className="w-slider-aria-label"
                data-wf-ignore=""
              />
            </div>
            <div
              className="hide-arrow w-slider-arrow-left"
              role="button"
              tabIndex={0}
              aria-controls="w-slider-mask-0"
              aria-label="previous slide"
            >
              <div className="w-icon-slider-left" />
            </div>
            <div
              className="k-hide w-slider-arrow-right"
              role="button"
              tabIndex={0}
              aria-controls="w-slider-mask-0"
              aria-label="next slide"
              style={{}}
            >
              <div className="w-icon-slider-right" />
            </div>
            <div className="k-slider-dots w-slider-nav w-round">
              <div
                className="w-slider-dot w-active"
                data-wf-ignore=""
                aria-label="Show slide 1 of 5"
                aria-pressed="true"
                role="button"
                tabIndex={0}
                style={{ marginLeft: 3, marginRight: 3 }}
              />
              <div
                className="w-slider-dot"
                data-wf-ignore=""
                aria-label="Show slide 2 of 5"
                aria-pressed="false"
                role="button"
                tabIndex={-1}
                style={{ marginLeft: 3, marginRight: 3 }}
              />
              <div
                className="w-slider-dot"
                data-wf-ignore=""
                aria-label="Show slide 3 of 5"
                aria-pressed="false"
                role="button"
                tabIndex={-1}
                style={{ marginLeft: 3, marginRight: 3 }}
              />
              <div
                className="w-slider-dot"
                data-wf-ignore=""
                aria-label="Show slide 4 of 5"
                aria-pressed="false"
                role="button"
                tabIndex={-1}
                style={{ marginLeft: 3, marginRight: 3 }}
              />
              <div
                className="w-slider-dot"
                data-wf-ignore=""
                aria-label="Show slide 5 of 5"
                aria-pressed="false"
                role="button"
                tabIndex={-1}
                style={{ marginLeft: 3, marginRight: 3 }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="k-product-main">
        <div
          data-delay={4000}
          data-animation="cross"
          className="k-main-slider w-slider"
          data-autoplay="false"
          data-easing="ease"
          data-hide-arrows="false"
          data-disable-swipe="false"
          data-autoplay-limit={0}
          data-nav-spacing={3}
          data-duration={500}
          data-infinite="true"
          role="region"
          aria-label="carousel"
        >
          <div
            className="k-main-slider-mask w-slider-mask"
            id="w-slider-mask-1"
          >
            {images.map((image, i) => (
              <div
                key={image.imageData?.name ?? i}
                className="k-main-slide relative"
                aria-label="1 of 5"
                role="group"
                style={{
                  transition: "all",
                  transform: "translateX(0px)",
                  opacity: 1
                }}
              >
                <Image
                  alt={image.imageData?.caption ?? ""}
                  src={image.imageData?.url ?? ""}
                  data-wf-sku-bindings="%5B%7B%22from%22%3A%22f_more_images_4dr%5B%5D%22%2C%22to%22%3A%22src%22%7D%5D"
                  sizes="100vw"
                  height={1080}
                  width={1080}
                  // srcSet="https://cdn.prod.website-files.com/606072483975b0a200b7dff6/6084f34dc96abefb6fa13070_87035655_94-p-500.jpeg 500w, https://cdn.prod.website-files.com/606072483975b0a200b7dff6/6084f34dc96abefb6fa13070_87035655_94.jpeg 640w"
                  className="k-slider-full-image"
                />
              </div>
            ))}
            <div
              aria-live="off"
              aria-atomic="true"
              className="w-slider-aria-label"
              data-wf-ignore=""
            />
          </div>
          <div
            className="hide-arrow w-slider-arrow-left"
            role="button"
            tabIndex={0}
            aria-controls="w-slider-mask-1"
            aria-label="previous slide"
          >
            <div className="w-icon-slider-left" />
          </div>
          <div
            className="hide-arrow w-slider-arrow-right"
            role="button"
            tabIndex={0}
            aria-controls="w-slider-mask-1"
            aria-label="next slide"
            style={{}}
          >
            <div className="w-icon-slider-right" />
          </div>
          <div className="k-main-slider-dots w-slider-nav w-round">
            <div
              className="w-slider-dot w-active"
              data-wf-ignore=""
              aria-label="Show slide 1 of 5"
              aria-pressed="true"
              role="button"
              tabIndex={0}
              style={{ marginLeft: 3, marginRight: 3 }}
            />
            <div
              className="w-slider-dot"
              data-wf-ignore=""
              aria-label="Show slide 2 of 5"
              aria-pressed="false"
              role="button"
              tabIndex={-1}
              style={{ marginLeft: 3, marginRight: 3 }}
            />
            <div
              className="w-slider-dot"
              data-wf-ignore=""
              aria-label="Show slide 3 of 5"
              aria-pressed="false"
              role="button"
              tabIndex={-1}
              style={{ marginLeft: 3, marginRight: 3 }}
            />
            <div
              className="w-slider-dot"
              data-wf-ignore=""
              aria-label="Show slide 4 of 5"
              aria-pressed="false"
              role="button"
              tabIndex={-1}
              style={{ marginLeft: 3, marginRight: 3 }}
            />
            <div
              className="w-slider-dot"
              data-wf-ignore=""
              aria-label="Show slide 5 of 5"
              aria-pressed="false"
              role="button"
              tabIndex={-1}
              style={{ marginLeft: 3, marginRight: 3 }}
            />
          </div>
        </div>
      </div>
    </>
  )

  // return (
  //   <div className="md:flex-row flex-col flex gap-5 w-full min-h-full">
  //     <div className="order-1 md:order-2 md:hidden">
  //       <div className="">
  //         <Carousel onSlide={handleImageChange} className="h-[500px]">
  //           {instance => {
  //             setCarouselRef(instance);
  //             return images.map((image, i) => (
  //               <div
  //                 key={i}
  //                 className={clsx(
  //                   "overflow-hidden flex relative rounded-lg w-full h-full",
  //                   images.length > 1 ? "row-span-3" : "row-span-4"
  //                 )}
  //               >
  //                 <Image
  //                   className="w-full object-contain"
  //                   width={1080}
  //                   height={1080}
  //                   src={image.imageData?.url}
  //                   alt="picture of shirt"
  //                 />
  //               </div>
  //             ))
  //           }}
  //         </Carousel>
  //       </div>
  //       <div className="text-center flex justify-center items-center gap-4">
  //         <div className="w-full">
  //           {activeImageIndex !== 0 &&
  //             <Button onClick={handleIncrement} padding={0}>
  //               <MdKeyboardArrowLeft size={30} />
  //             </Button>
  //           }
  //         </div>
  //         {/* <div className="w-full">
  //           <p>
  //             {activeImageIndex + 1} / {images.length}
  //           </p>

  //         </div> */}
  //         <div className="w-full">
  //           {activeImageIndex !== images.length - 1 &&
  //             <Button onClick={handleDecrement} padding={0}>
  //               <MdKeyboardArrowRight size={30} />
  //             </Button>
  //           }
  //         </div>
  //       </div>
  //     </div>
  //     <div className="hidden w-full order-2 md:order-1 md:grid grid-cols-2 gap-4">
  //       <div
  //         className={clsx(
  //           "overflow-hidden flex relative w-full aspect-square col-span-2 rounded-lg"
  //         )}
  //       >
  //         <ProductImageViewer {...images[activeImageIndex]} />
  //       </div>
  //       {images.map(
  //         ({ imageData, id }, i) =>
  //           i != activeImageIndex && (
  //             <Button key={id + i} padding={0} className="overflow-hidden w-full aspect-square rounded-lg relative">
  //               <Image
  //                 className="w-full"
  //                 src={imageData?.url ?? ""}
  //                 objectFit="cover"
  //                 fill
  //                 alt="picture of shirt"
  //                 onClick={() => setActiveVariationIndex(i)}
  //               />
  //             </Button>
  //           )
  //       )}
  //     </div>
  //   </div>
  // );
}

export default ProductImageGallery;
