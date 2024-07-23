import { getProductDetails } from "api/catalogApi";
import Breadcrumbs from "components/Breadcrumbs";
import ProductActions from "components/ProductActions";
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

        <div className="min-h-screen md:p-4">
          <div className="block md:grid md:grid-col-1 md:grid-cols-2 md:h-screen">
            <ProductImageGallery images={filteredRelatedImages} />
            <ProductDetailsModify
              catalogItemObject={catalogObject.object}
              catalogImageObject={filteredRelatedImages}
            />
          </div>
        </div>
      </>
    );
  };

  return catalogObject ? renderProductDetails() : renderProductError();
};

export default Page;
