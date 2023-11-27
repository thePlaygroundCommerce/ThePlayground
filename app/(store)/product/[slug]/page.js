import ProductDetailsModify from "components/ProductDetailsModify";
import ProductImageGallery from "components/ProductImageGallery";
import { getProductDetails } from "api/catalogApi";
import Breadcrumbs from "components/Breadcrumbs";

const Page = async (props) => {
  const { catalogObject } = await getProductDetails(props);

  const renderProductError = () => <p>Something went wrong!</p>;
  const renderProductDetails = () => {
    const { relatedObjects } = catalogObject;
    const filteredRelatedImages = relatedObjects.filter(
      ({ type }) => type == "IMAGE"
    );

    return (
      <>
        <div className="my-2  ml-6">
          <Breadcrumbs categoryId={catalogObject.object.itemData.categoryId} />
        </div>

        <div className="grid grid-cols-3 border-t-4">
          <div className="flex col-span-2 border-r">
            <ProductImageGallery images={filteredRelatedImages} />
          </div>

          <div>
            <ProductDetailsModify catalogObject={catalogObject.object} />
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="px-8 ">
      {catalogObject ? renderProductDetails() : renderProductError()}
    </div>
  );
};

export default Page;
