"use client";
import { useState } from "react";
import ProductImageViewer from "./ProductImageViewer";
import Image from "next/image";
import clsx from "clsx";

function ProductImageGallery({ images }) {
  const [activeImageIndex, setActiveVariationIndex] = useState(0);

  return (
    <div className="grid gap-2 grid-rows-6 grid-col-3 auto-rows-auto w-full h-full">
      <div className={clsx("overflow-hidden col-span-3 relative", images.length > 1 ? "row-span-5" : "row-span-6")}>
        <ProductImageViewer {...images[activeImageIndex]} />
      </div>
      {images.map(
        ({ imageData, id }, i) =>
          i != activeImageIndex && (
            <div key={id} className=" w-full relative row-span-1">
              <Image
                className="w-full"
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
  );
}

export default ProductImageGallery;
