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
    <div className="grid gap-2 grid-rows-4 grid-col-3 auto-rows-auto w-full h-[75vh]">
      <div
        className={clsx(
          "overflow-hidden col-span-3 relative w-full h-full",
          imgList.length > 1 ? "row-span-3" : "row-span-4"
        )}
      >
        <ProductImageViewer {...images[activeImageIndex]} />
      </div>
      <div className="w-full h-full flex justify-center row-span-1 col-span-3">
        {imgList.map(
          ({ imageData, id }, i) =>
            i != activeImageIndex && (
              <div key={id} className=" w-full h-full relative">
                <Image
                  className="w-full h-full"
                  src={imageData.url}
                  objectFit="contain"
                  fill
                  alt="picture of shirt"
                  onClick={() => setActiveVariationIndex(i)}
                />
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default ProductImageGallery;
