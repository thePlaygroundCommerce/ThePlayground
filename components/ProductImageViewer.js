"use client";
import { GlassMagnifier, PictureInPictureMagnifier, SideBySideMagnifier } from "react-image-magnifiers";

const ProductImageViewer = ({ imageData }) => {
  return (
    <GlassMagnifier
      // className="max-h-full"
      // alwaysInPlace={true}
      imageSrc={imageData?.url}
      imageAlt="picture of shirt"
    />  
  );
};

export default ProductImageViewer;
