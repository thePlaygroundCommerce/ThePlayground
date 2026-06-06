import { FaHeadset } from "react-icons/fa";
import { FaArrowsRotate } from "react-icons/fa6";
import { LiaShippingFastSolid } from "react-icons/lia";
import Image from "@/components/Image";
import ProductFiltersSidebar from "@/components/ProductFiltersSidebar";

export const metadata = {
  title: "The Playground | Shop",
};

export default async function ProductsPageLayout({ children }: LayoutProps<"/shop">) {

  return (
    <div>
      <div className="mb-4">
        <div className="flex bg-black uppercase text-white py-4">
          <div className="flex flex-1 flex-col justify-center items-center">
            <LiaShippingFastSolid size={21} />
            <p className="mt-2 text-sm font-bold text-center">Free Shipping</p>
          </div>
          <div className="flex flex-1 flex-col justify-center items-center">
            <FaArrowsRotate size={21} />
            <p className="mt-2 text-sm font-bold text-center">14 Day Returns</p>
          </div>
          <div className="flex flex-1 flex-col justify-center items-center">
            <FaHeadset size={21} />
            <p className="mt-2 text-sm font-bold text-center">24/7 Service</p>
          </div>
        </div>
        <div className="relative min-h-100 bg-zinc-300 flex justify-center items-center">
          <Image alt={""} className="brightness-75 object-cover" />
          <div className="z-10 relative text-white p-4">
            <h1 className="capitalize">Duffels</h1>
            <p>The classic workhorse bag updated with innovative features that take it far beyond its utilitarian roots.</p>
          </div>
          {/* <div className="py-2 px-2 absolute -bottom-5 bg-white border border-zinc-500 rounded-lg w-1/4 text-center">
            <p>{items.length} items</p>
          </div> */}
        </div>
      </div>
      {children}
    </div>
  );
}
