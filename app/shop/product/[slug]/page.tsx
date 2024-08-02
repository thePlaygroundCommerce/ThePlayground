import { getProductDetails } from "api/catalogApi";
import ProductDetailsModify from "components/ProductDetailsModify";
import ProductImageGallery from "components/ProductImageGallery";
import { CatalogObject } from "square";

type Props = {
  params: { slug: string };
};

const Page = async (props: Props) => {
  const { result: { object: catalogObject, relatedObjects, errors } } = await getProductDetails(props);

  if (!catalogObject) return <p>Something went wrong!</p>;

  const renderProductDetails = () => {
    const filteredRelatedImages = catalogObject.itemData?.imageIds?.map(id => relatedObjects?.find((obj => obj.id === id))).filter(obj => obj !== undefined) ?? [];

    return (
      <>
        {/* <div className="my-2  ml-6">
          <Breadcrumbs categoryId={catalogObject.object.itemData.categoryId} />
        </div> */}

        <div className="min-h-screen md:p-4">
          <div className="block md:grid grid-col-1 md:grid-cols-2 md:h-screen">
            <ProductImageGallery images={filteredRelatedImages} />
            <ProductDetailsModify
              catalogItemObject={catalogObject}
              catalogImageObjects={filteredRelatedImages as CatalogObject[]}
            />
          </div>
        </div>
      </>
    );
  };

  return renderProductDetails();
};

export default Page;
