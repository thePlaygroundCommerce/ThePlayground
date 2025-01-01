import { getProductDetails } from "api/catalogApi";
import Breadcrumbs from "components/Breadcrumbs";
import ProductDetails from "components/ProductDetails";
import ProductImageGallery from "components/ProductImageGallery";

type Props = unknown;

const Page = async (props: Props) => {
  const {
    result: { object: catalogObject, relatedObjects },
  } = await getProductDetails(props);

  if (!catalogObject) return <p>Something went wrong!</p>;

  const renderProductDetails = () => {
    const filteredRelatedImages =
      catalogObject.itemData?.imageIds
        ?.map((id) => relatedObjects?.find((obj) => obj.id === id))
        .filter((obj) => obj !== undefined) ?? [];

    const breadcrumbs = [{
      name: 'Home',
      link: "/shop",
    }, ...catalogObject.categoryData?.pathToRoot?.map(
      ({ categoryName: name }) => ({
        name: name ?? "",
        link: `/shop/${name}`,
      })
    ) ?? []]

    return (
      <>
        <div className="mx-6">
          <Breadcrumbs
            items={breadcrumbs}
          />
        </div>

        <div className="min-h-screen md:p-4">
          <div className="block md:grid md:grid-cols-8 gap-4 min-h-full">
            <div className="col-span-5 pt-6">
              <ProductImageGallery images={filteredRelatedImages} />
            </div>
            <div className="col-span-3 pt-6">
              <ProductDetails
                catalogItemObject={catalogObject}
                catalogImageObjects={filteredRelatedImages}
              />
            </div>
          </div>
        </div>
      </>
    );
  };

  return renderProductDetails();
};

export default Page;
