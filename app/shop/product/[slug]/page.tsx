import { getProductDetails } from "api/catalogApi";
import Breadcrumbs from "components/Breadcrumbs";
import ProductDetailsModify from "components/ProductDetailsModify";
import ProductImageGallery from "components/ProductImageGallery";
import { AppProps } from "next/app";

type Props = {
  params: { slug: string };
};

const Page = async (props: Props) => {
  const { catalogObject } = await getProductDetails(props);

  const renderProductError = () => <p>Something went wrong!</p>;
  const renderProductDetails = () => {
    const { relatedObjects } = catalogObject;
    const filteredRelatedImages = relatedObjects.filter(
      ({ type }: { type: any }) => type == "IMAGE"
    );

    return (
      <>
        {/* <div className="my-2  ml-6">
          <Breadcrumbs categoryId={catalogObject.object.itemData.categoryId} />
        </div> */}

        <div className="h-full grid grid-cols-3">
          <div className="flex col-span-2 border-r">
            <ProductImageGallery images={filteredRelatedImages} />
          </div>

          <div>
            <ProductDetailsModify
              catalogItemObject={catalogObject.object}
              catalogImageObject={filteredRelatedImages}
            />
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
