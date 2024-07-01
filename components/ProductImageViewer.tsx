"use client";
import Image from "next/image";
//@ts-ignore
import { GlassMagnifier } from "react-image-magnifiers";

const ProductImageViewer = ({ imageData }: any) => {
  return (
    <Image
      className="h-full w-full"
      objectFit="contain"
      fill
      src={imageData?.url}
      alt="picture of shirt"
    />  
  );
};

export default ProductImageViewer;

// return (
//   <GlassMagnifier
//     // className="max-h-full"
//     // alwaysInPlace={true}
//     className="object-cover w-full"
//     imageSrc={imageData?.url}
//     imageAlt="picture of shirt"
//   />  