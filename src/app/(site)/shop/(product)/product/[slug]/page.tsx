import { getProduct } from "@/api/catalogApi";
import Image from "@/components/Image";
import ProductDetails from "@/components/ProductDetails";
import ProductImageGallery from "@/components/ProductImageGallery";
import Showcase from "@/components/Showcase";
import Slider from "@/components/Slider";
import { client } from "@/api/clients";
import Heading from "@/components/typography/Heading";
import { GroupField } from "@prismicio/client";
import { ContentDocumentDataFeaturesItem, Simplify } from "prismicio-types";
import { getCategoryProducts } from "@/api/customerApi";
import { PageProps } from "index";
import { Accordion } from '@ark-ui/react/accordion'
import { FaAngleDown } from "react-icons/fa6";
import clsx from "clsx";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/react";
import { PrismicRichText } from "@prismicio/react";
import { CatalogObject } from "square";
import { notFound } from "next/navigation";

export const getProductDetails = async ({
  slug
}: { slug: string }) => {

  const {
    object: catalogObject,
    relatedObjects,
  } = await getProduct(slug);
  if (!catalogObject) throw Error("Product not found!")

  const filteredRelatedImages =
    (catalogObject.type === "ITEM" ? catalogObject.itemData?.imageIds : [])
      ?.map((id: string) => relatedObjects?.find((obj) => obj.id === id))
      .filter((obj): obj is CatalogObject.Image => obj !== undefined) ??
    [];


  return {
    filteredRelatedImages,
    catalogObject,
  }

}


const Page = async ({ params, searchParams }: PageProps) => {
  var slug = (await searchParams).id
  if (!slug) slug = (await params).slug


  const { catalogObject, filteredRelatedImages } = await getProductDetails({ slug }).catch(() => notFound())

  const { items, images } = await getCategoryProducts("");
  const { data } = await client
    .getByUID("product_content", (catalogObject.id ?? "").toLowerCase())
    .catch((e) => ({ data: undefined }))

  const relatedItems = items
    .filter(({ id }) => id !== catalogObject.id)
    .slice(0, 3);

  let features: GroupField<Simplify<ContentDocumentDataFeaturesItem>> = [];

  if (catalogObject?.customAttributeValues) {
    const prismicUid = (Object.values(catalogObject.customAttributeValues)
      .flat()
      .find(
        (attr): attr is { name?: string; stringValue?: string } =>
          typeof attr === "object" &&
          attr !== null &&
          "name" in attr &&
          (attr as { name?: string }).name === "prismicContentId",
      )?.stringValue) as string | undefined;
    if (prismicUid) {
      try {
        const { data } = await client.getByUID("content", prismicUid);
        features = data.features;
      } catch { }
    }
  }


  const renderProductDetails = () => {

    const breadcrumbs = [
      {
        name: "Home",
        link: "/shop",
      },
      ...(
        catalogObject.type === "CATEGORY"
          ? (catalogObject.categoryData?.pathToRoot?.map(({ categoryName }) => ({
            name: categoryName ?? "",
            link: `/shop/${categoryName}`,
          })) ?? [])
          : []
      ),
    ];

    return (
      <>
        <div className="k-hero-content p-0">
          <div className="k-full-container k-container--strech block lg:flex">
            <ProductDetails
              productImageGallery={<ProductImageGallery images={filteredRelatedImages} />}
              catalogItemObject={catalogObject}
              catalogImageObjects={filteredRelatedImages}
            />
          </div>
        </div>

        {data && (
          <div>
            <div className="p-4 clip-box relative">
              <div className="block md:hidden">
                <Accordion.Root collapsible>

                  <Accordion.Item value={"description"} className={clsx("p-4 border-b border-zinc-300")}>
                    <Accordion.ItemTrigger className="flex justify-between items-center w-full">
                      Description
                      <Accordion.ItemIndicator>
                        <FaAngleDown />
                      </Accordion.ItemIndicator>
                    </Accordion.ItemTrigger>
                    <Accordion.ItemContent className="my-4">
                      <p className="k-product-main-desc">
                        {catalogObject.type === "ITEM"
                          ? catalogObject.itemData?.description
                          : ""}
                      </p>
                    </Accordion.ItemContent>
                  </Accordion.Item>
                  {data.features.map(({ name, value }, i) => (
                    <Accordion.Item key={name} value={name?.toString() ?? ""} className={clsx("p-4 border-b border-zinc-300")}>
                      <Accordion.ItemTrigger className="flex justify-between items-center w-full">
                        {name}
                        <Accordion.ItemIndicator>
                          <FaAngleDown />
                        </Accordion.ItemIndicator>
                      </Accordion.ItemTrigger>
                      <Accordion.ItemContent className="my-4">
                        <PrismicRichText components={{
                          list: ({ children }) => <ul className="list-disc">{children}</ul>,
                          listItem: ({ children }) => <li className="leading-8">{children}</li>,
                        }} field={value} />
                      </Accordion.ItemContent>
                    </Accordion.Item>
                  ))}
                </Accordion.Root>
              </div>
              <div className="md:block hidden">
                <TabGroup vertical className="flex border-t border-b p-2 border-zinc-300 min-h-96">
                  <div className="flex-1 flex flex-col justify-center">
                    <TabList className="flex flex-col">
                      {data.features.map(({ name }) => (
                        <Tab key={name} className="py-2 data-selected:font-bold">{name}</Tab>
                      ))}
                    </TabList>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <TabPanels className="p-4 py-2 border-zinc-300 border-l-2">
                      {data.features.map(({ value }) => (
                        <TabPanel key={value.toString()} className="metafield-rich_text_field">
                          <PrismicRichText components={{
                            list: ({ children }) => <ul className="list-disc">{children}</ul>,
                            listItem: ({ children }) => <li className="leading-8">{children}</li>,
                          }} field={value} />
                        </TabPanel>
                      ))}
                    </TabPanels>
                  </div>
                </TabGroup>
              </div>
            </div>
            <div className="p-4 py-8 flex flex-col gap-8 w-full">
              <Heading level={2} className="text-center">Packed With Features</Heading>
              {/* {data.showcases.map(
                ({
                  title,
                  description,
                  video_playback_id,
                  image: { url: src, alt },
                }, i) => (
                  <Showcase
                    key={i}
                    flipped={i % 2 !== 0}
                    // animate={{ delay: (5 * (i + 1)) * 100 }}
                    // content={{
                    //   title: title,
                    //   description: <PrismicRichText field={description} />,
                    // }}
                    // video={{
                    //   playback_id: video_playback_id?.toString()
                    // }}
                    // image={{
                    //   width: 300, height: 500,
                    //   src,
                    //   alt: alt ?? "",
                    //   className: "object-cover",
                    // }}
                  />
                )
              )} */}
            </div>
            <div className="">
              <Image {...{ alt: data.image.alt ?? "", src: data.image.url, ...data.image.dimensions }} />
            </div>
            <div className="p-4">
              <Slider
                type="DEFAULT"
                title="You Might Also Like"
                headline={undefined}
                slides={relatedItems.map((item) => {
                  const itemId = item.id ?? "";
                  const name = item.type === "ITEM" ? item.itemData?.name : "";
                  const variations =
                    item.type === "ITEM" ? item.itemData?.variations : [];
                  const imageIds =
                    item.type === "ITEM" ? item.itemData?.imageIds : [];
                  const imageObj = images.find(
                    (obj): obj is CatalogObject.Image =>
                      obj.type === "IMAGE" && obj.id === imageIds?.[0],
                  );
                  const image = imageObj?.imageData;
                  const firstVariation = variations?.[0];
                  const price =
                    firstVariation?.type === "ITEM_VARIATION"
                      ? Number(firstVariation.itemVariationData?.priceMoney?.amount ?? 0)
                      : 0;

                  return {
                    image: { fill: true, alt: image?.caption ?? "", src: image?.url ?? "", className: "object-cover" },
                    content: {
                      link: `/shop/product/${itemId}`,
                      title: name ?? "",
                      price,
                    },
                  }
                }
                )}
              />
            </div>
          </div>
        )}
      </>
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
