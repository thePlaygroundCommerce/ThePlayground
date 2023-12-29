"use client";
import { useState } from "react";
import ProductImageViewer from "./ProductImageViewer";
import Image from "next/image";

function ProductImageGallery({ images }) {
  const [activeImageIndex, setActiveVariationIndex] = useState(0);

  return (
    <>
      <div className="">
        <ProductImageViewer {...images[activeImageIndex]} />
      </div>
      <div className="w-1/4 flex flex-col">
        {images.map(
          ({ imageData, id }, i) =>
            i != activeImageIndex && (
              <div key={id} className="w-full relative">
                <Image
                  src={imageData.url}
                  width={250}
                  height={250}
                  alt="picture of shirt"
                  onClick={() => setActiveVariationIndex(i)}
                />
              </div>
            )
        )}
      </div>
    </>
  );
}

export default ProductImageGallery;
