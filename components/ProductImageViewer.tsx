"use client";
import Image from "./Image";

const ProductImageViewer = ({ imageData }: any) => {
  return (
    <Image
      className="h-auto w-full"
      objectFit="cover"
      fill
      src={imageData?.url}
      alt="picture of shirt"
    />  
  );
};

export default ProductImageViewer;
