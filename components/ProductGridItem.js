import Image from "next/image";
import Unavailable from 'public/unavailable-image.jpeg'

export default function ProductGridItem({ itemData, images }) {
  const { name, variations } = itemData;
  const firstImage = images[0]?.imageData

  return (
    <div className="border-0 text-center w-100">
      <Image
        className={`mx-auto`}
        variant="top"
        width={250}
        height={250}
        src={firstImage.url || Unavailable}
        alt={firstImage.caption || "Picture of shirt"}
      />
      <div className="p-3">
        <div>{name}</div>
        <div>
          $ {variations[0].itemVariationData.priceMoney.amount}
        </div>
        {/* <div>
          <IconContext.Provider value={{ size: "1em", divor: "black" }}>
            <button variant="primary" className="text-left border-0">
              <FaCartPlus />
            </button>
            <button variant="primary" className="text-left border-0">
              <GoThreeBars />
            </button>
            <button variant="primary" className="text-left border-0">
              <FaShareAlt />
            </button>
          </IconContext.Provider>
        </div> */}
      </div>
    </div>
  );
}
