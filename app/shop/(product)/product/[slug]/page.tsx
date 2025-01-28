import { getProductDetails } from "api/catalogApi";
import Breadcrumbs from "components/Breadcrumbs";
import ProductDetails from "components/ProductDetails";
import ProductImageGallery from "components/ProductImageGallery";
import Showcase from "components/Showcase";
import { GoChevronLeft } from "react-icons/go";
import Slider from "components/Slider";
import prismic, { client } from "prismicio";
import Heading from "components/typography/Heading";
import { GroupField } from "@prismicio/client";
import { ContentDocumentDataFeaturesItem, Simplify } from "prismicio-types";
import { searchCatalogItems } from "api/customerApi";


type Props = unknown;

const Page = async (props: Props) => {
  const {
    result: { object: catalogObject, relatedObjects },
  } = await getProductDetails(props);
  if (!catalogObject) return <p>Something went wrong!</p>;

  const { items, images } = await searchCatalogItems("");

  const relatedItems = items
    .filter(({ id }) => id !== catalogObject.id)
    .slice(0, 3);

  let features: GroupField<Simplify<ContentDocumentDataFeaturesItem>> = [];

  if (catalogObject?.customAttributeValues) {
    const prismicUid = Object.values(catalogObject?.customAttributeValues)
      .flat()
      .find(({ name }) => name === "prismicContentId")?.stringValue;
    if (prismicUid) {
      try {
        const { data } = await client.getByUID("content", prismicUid);
        features = data.features;
      } catch { }
    }
  }

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
          <div className="block md:grid md:grid-cols-8 gap-4 md:p-4 min-h-full">
            <div className="col-span-5 px-4">
              <ProductImageGallery images={filteredRelatedImages} />
            </div>
            <div className="col-span-3  px-4">
              <ProductDetails
                catalogItemObject={catalogObject}
                catalogImageObjects={filteredRelatedImages}
              />
            </div>
          </div>
          <div>
            {features.length > 0 && (
              <div className="p-4 py-8 bg-mintcream-900 text-mintcream-200 flex flex-col gap-8 w-full">
                <Heading className="text-center">Packed With Features</Heading>
                {features.map(
                  ({
                    title,
                    description,
                    headline,
                    image: { url: src, alt },
                  }, i) => (
                    <Showcase
                      flipped={i % 2 !== 0}
                      animate={{ delay: (5 * (i + 1)) * 100 }}
                      content={{
                        title: title,
                        description: prismic.asText(description),
                        headline,
                      }}
                      image={{
                        fill: true,
                        src,
                        alt: alt ?? "",
                        className: "object-cover",
                      }}
                      contentStyles={{}}
                    />
                  )
                )}
              </div>
            )}
            <div className="py-4">
              <Slider
                type="DEFAULT"
                title="You Might Also Like"
                headline={undefined}
                slides={relatedItems.map(({ id, itemData: { name, variations, imageIds } = {} }) => {
                  const image = images.find(({ id }) => imageIds?.includes(id))?.imageData

                  return {
                    image: { fill: true, alt: image?.caption ?? "", src: image?.url ?? "", className: "object-cover" },
                    content: {
                      link: `/shop/product/${id}`,
                      title: name ?? "",
                      price: Number((variations ?? [])[0]?.itemVariationData?.priceMoney?.amount) ?? 0,
                    },
                  }
                }
                )}
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
