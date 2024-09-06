"use client";
import { useState } from "react";
import ProductImageViewer from "./ProductImageViewer";
import Image from "next/image";
import clsx from "clsx";

function ProductImageGallery({ images }) {
  const [activeImageIndex, setActiveVariationIndex] = useState(0);
  let imgList = images;
  if (imgList.length > 4) imgList = imgList.slice(0, 4);

  return (
    <div className="md:flex-row flex-col flex gap-5 w-full h-[75vh]">
      <div className="md:w-1/6 order-2 md:order-1 md:h-full flex md:flex-col justify-center col-span-1 gap-4">
        {imgList.map(
          ({ imageData, id }, i) =>
            i != activeImageIndex && (
              <button key={id} className=" overflow-hidden w-full aspect-square rounded-lg relative">
                <Image
                  className="w-full"
                  src={imageData.url}
                  objectFit="contain"
                  fill
                  alt="picture of shirt"
                  onClick={() => setActiveVariationIndex(i)}
                />
              </button>
            )
        )}
      </div>
      <div
        className={clsx(
          "overflow-hidden flex relative w-full h-full order-1 md:order-2",
          imgList.length > 1 ? "row-span-3" : "row-span-4"
        )}
      >
        <ProductImageViewer {...images[activeImageIndex]} />
      </div>
    </div>
  );
}

export default ProductImageGallery;
