"use client";
import { useEffect, useState } from "react";
import ProductImageViewer from "./ProductImageViewer";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import Image from "components/Image";
import clsx from "clsx";
import Button from "./Button";
import Carousel from "./Carousel";
import { CatalogObject } from "square";
import { KeenSliderInstance } from "keen-slider/react";

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
    <div className="md:flex-row flex-col flex gap-5 w-full min-h-full">
      <div className="order-1 md:order-2 md:hidden">
        <div className="">
          <Carousel onSlide={handleImageChange} className="h-[500px]">
            {instance => {
              setCarouselRef(instance);
              return images.map((image, i) => (
                <div
                  key={i}
                  className={clsx(
                    "overflow-hidden flex relative rounded-lg w-full h-full",
                    images.length > 1 ? "row-span-3" : "row-span-4"
                  )}
                >
                  <Image
                    className="w-full object-contain"
                    width={1080}
                    height={1080}
                    src={image.imageData?.url}
                    alt="picture of shirt"
                  />
                </div>
              ))
            }}
          </Carousel>
        </div>
        <div className="text-center flex justify-center items-center gap-4">
          <div className="w-full">
            {activeImageIndex !== 0 &&
              <Button onClick={handleIncrement} padding={0}>
                <MdKeyboardArrowLeft size={30} />
              </Button>
            }
          </div>
          {/* <div className="w-full">
            <p>
              {activeImageIndex + 1} / {images.length}
            </p>

          </div> */}
          <div className="w-full">
            {activeImageIndex !== images.length - 1 &&
              <Button onClick={handleDecrement} padding={0}>
                <MdKeyboardArrowRight size={30} />
              </Button>
            }
          </div>
        </div>
      </div>
      <div className="hidden w-full order-2 md:order-1 md:grid grid-cols-2 gap-4">
        <div
          className={clsx(
            "overflow-hidden flex relative w-full aspect-square col-span-2 rounded-lg"
          )}
        >
          <ProductImageViewer {...images[activeImageIndex]} />
        </div>
        {images.map(
          ({ imageData, id }, i) =>
            i != activeImageIndex && (
              <Button key={id + i} padding={0} className="overflow-hidden w-full aspect-square rounded-lg relative">
                <Image
                  className="w-full"
                  src={imageData?.url ?? ""}
                  objectFit="cover"
                  fill
                  alt="picture of shirt"
                  onClick={() => setActiveVariationIndex(i)}
                />
              </Button>
            )
        )}
      </div>
    </div>
  );
}

export default ProductImageGallery;
