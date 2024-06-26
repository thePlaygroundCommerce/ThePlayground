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

        <div className="min-h-screen grid grid-rows-8 grid-col-1 md:grid-cols-3">
          <div className="row-span-4">
            <ProductImageGallery images={filteredRelatedImages} />
          </div>

          <div className="row-span-4">
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
    <div className="">
      {catalogObject ? renderProductDetails() : renderProductError()}
    </div>
  );
};

export default Page;
