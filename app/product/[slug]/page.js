import Shirt from "public/shirt.png";
import ProductDetailsModify from "components/ProductDetailsModify";
import ProductImageViewer from "components/ProductImageViewer";
import Image from "next/image";
import ProductImageGallery from "components/ProductImageGallery";

const Page = async (props) => {
  const { catalogObject } = await getProductDetails(props);

  const renderProductError = () => <p>Something went wrong!</p>;
  const renderProductDetails = () => {
    const {
      object: {
        itemData,
        itemData: { variations },
      },
      relatedObjects,
    } = catalogObject;
    const filteredRelatedImages = relatedObjects.filter(
      ({ type }) => type == "IMAGE"
    );

    return (
      <>
        {/* <Breadcrumbdiv /> */}

        <div className="grid grid-cols-3">
          <div className="flex col-span-2">
            <ProductImageGallery images={filteredRelatedImages} />
          </div>

          <div>
            <ProductDetailsModify catalogObject={catalogObject} />
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="px-8">
      {catalogObject ? renderProductDetails() : renderProductError()}
    </div>
  );
};

export default Page;

async function getProductDetails({ params: { slug } }) {
  try {
    const catalogObject = await fetch(
      process.env.square[process.env.NODE_ENV].url + "catalog/" + slug
    )
      .then((res) => res.json())
      .catch((err) => err);

    return {
      catalogObject: catalogObject.result,
    };
  } catch (error) {
    return {
      error: error.result,
    };
  }
}
