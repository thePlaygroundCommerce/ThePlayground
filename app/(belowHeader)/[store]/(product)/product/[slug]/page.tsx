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
import { PageProps } from "index";
import Money from "components/Money";

const Page = async ({ params, searchParams }: PageProps) => {
  var slug = (await searchParams).id
  if (!slug) slug = (await params).slug

  const {
    result: { object: catalogObject, relatedObjects },
  } = await getProductDetails(slug);
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
      <div>
          <div className="k-hero-content">
            <div className="k-full-container k-container--strech block lg:flex">
              <div className="k-hero-left-side">
                <ProductDetails
                  catalogItemObject={catalogObject}
                  catalogImageObjects={filteredRelatedImages}
                />
              </div>
              <div className="flex flex-col-reverse xl:flex-row flex-1 k-hero-right k-hero-clear k-d-flex">
                <ProductImageGallery images={filteredRelatedImages} />
              </div>
            </div>
          </div>
          <div>
            <div className="p-4 py-8 flex flex-col gap-8 w-full">
              <Heading className="text-center">Packed With Features</Heading>
              {features.map(
                ({
                  title,
                  description,
                  headline,
                  image: { url: src, alt },
                }, i) => (
                  <Showcase
                    key={i}
                    flipped={i % 2 !== 0}
                    animate={{ delay: (5 * (i + 1)) * 100 }}
                    content={{
                      title: title,
                      description: prismic.asText(description),
                      headline,
                    }}
                    image={{
                      width: 300, height: 500,
                      src,
                      alt: alt ?? "",
                      className: "object-cover",
                    }}
                    contentStyles={{}}
                  />
                )
              )}
            </div>
            <div className="p-4">
              <Slider
                type="DEFAULT"
                title="You Might Also Like"
                headline={undefined}
                slides={relatedItems.map(({ id, itemData: { name, variations, imageIds } = {} }) => {
                  const image = images.find(({ id }) => id === imageIds?.[0])?.imageData

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
    );
  };
  return renderProductDetails();
};

export default Page;



// /shop/product/[slug] 
//    expect slug to be product id, which app would lookup id of product

//    and grab first variant and redirect to page with search param


// /shop/product/[slug]?variant=id
//    expect slug to be product name, which app would lookup variant id of product and render page normally
