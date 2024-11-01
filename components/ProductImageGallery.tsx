"use client";
import { useEffect, useState } from "react";
import ProductImageViewer from "./ProductImageViewer";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import Image from "next/image";
import clsx from "clsx";
import Button from "./Button";
import Carousel from "./Carousel";
import { CatalogObject } from "square";
import { KeenSliderInstance } from "keen-slider/react";

function ProductImageGallery({ images }: { images: CatalogObject[] }) {
  const [activeImageIndex, setActiveVariationIndex] = useState(0);

  const handleImageChange = (index: number) => setActiveVariationIndex(index)
  const [carouselRef, setCarouselRef] = useState<KeenSliderInstance<
    {},
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
    <div className="md:flex-row flex-col flex gap-5 w-full">
      <div className="order-1 md:order-2 md:hidden">
        <div className="text-center flex justify-center items-center gap-4">
          <div className="w-full">
            {activeImageIndex !== 0 &&
              <Button onClick={handleIncrement}>
                <MdKeyboardArrowLeft />
              </Button>
            }
          </div>
          <div className="w-full">
            <p>
              {activeImageIndex + 1} / {images.length}
            </p>

          </div>
          <div className="w-full">
            {activeImageIndex !== images.length &&
              <Button onClick={handleDecrement}>
                <MdKeyboardArrowRight />
              </Button>
            }
          </div>
        </div>
        <div className="">
          <Carousel onSlide={handleImageChange} className="">
            {instance => {
              setCarouselRef(instance);
              return images.map((image) => (
                <div
                  className={clsx(
                    "overflow-hidden flex relative w-full h-full",
                    images.length > 1 ? "row-span-3" : "row-span-4"
                  )}
                >
                  <ProductImageViewer {...image} />
                </div>
              ))
            }}
          </Carousel>
        </div>
      </div>
      <div className="hidden w-full order-2 md:order-1 md:grid grid-cols-2 gap-4">
        <div
          className={clsx(
            "overflow-hidden flex relative w-full h-auto max-h-screen col-span-2 aspect-square",
            images.length > 1 ? "row-span-3" : "row-span-4"
          )}
        >
          <ProductImageViewer {...images[activeImageIndex]} />
        </div>
        {images.map(
          ({ imageData, id }, i) =>
            i != activeImageIndex && (
              <Button key={id + i} className=" overflow-hidden w-full aspect-square rounded-lg relative">
                <Image
                  className="w-full"
                  src={imageData?.url ?? ""}
                  objectFit="contain"
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

const MobileImageGallery = () => { };

export default ProductImageGallery;
