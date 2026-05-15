"use client";
import Image from "./Image";

const ProductImageViewer = ({ imageData }: any) => {
  return (
    <Image
      className="w-full object-contain"
      width={1080}
      height={1080}
      src={imageData?.url}
      alt="picture of shirt"
    />
  );
};

export default ProductImageViewer;
