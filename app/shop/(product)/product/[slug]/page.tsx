import { getProductDetails } from "api/catalogApi";
import Breadcrumbs from "components/Breadcrumbs";
import ProductDetails from "components/ProductDetails";
import ProductImageGallery from "components/ProductImageGallery";
import Showcase from "components/Showcase";
import { GoChevronLeft } from "react-icons/go";
import Slider from "components/Slider";

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

    const breadcrumbs = [
      {
        name: "Home",
        link: "/shop",
      },
      ...(catalogObject.categoryData?.pathToRoot?.map(
        ({ categoryName: name }) => ({
          name: name ?? "",
          link: `/shop/${name}`,
        })
      ) ?? []),
    ];

    return (
      <>
        <div className="min-h-screen">
          <div className="block md:grid md:grid-cols-8 gap-4 md:p-4 px-4 min-h-full">
            <div className="col-span-5 pt-6">
              <ProductImageGallery images={filteredRelatedImages} />
            </div>
            <div className="col-span-3">
              <ProductDetails
                catalogItemObject={catalogObject}
                catalogImageObjects={filteredRelatedImages}
              />
            </div>
            <div className="mx-4">
              <Showcase
                content={{ title: "Feature 1" }}
                image={{ fill: true, alt: "", className: "object-cover" }}
                contentStyles={{  }}
              />
              <Showcase
                content={{ title: "Feature 2" }}
                image={{ fill: true, alt: "", className: "object-cover" }}
              />
              <Showcase
                content={{ title: "Feature 3" }}
                image={{ fill: true, alt: "", className: "object-cover" }}
              />
            </div>
            <div>
              <Slider
                type={"DEFAULT"}
                title={"You Might Also Like"}
                headline={undefined}
                slides={[
                  {
                    image: { fill: true, alt: "", className: "object-cover" },
                    content: {
                      title: "TTiTle",
                      price: 10000,
                      description: "product descriptions1",
                    },
                  },
                  {
                    image: { fill: true, alt: "", className: "object-cover" },
                    content: {
                      title: "TTiTle1",
                      price: 10000,
                      description: "product descriptions2",
                    },
                  },
                ]}
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
