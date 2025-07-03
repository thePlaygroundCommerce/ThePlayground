import { getProductDetails } from "api/catalogApi";
import Breadcrumbs from "components/Breadcrumbs";
import Image from "components/Image";
import ProductDetails from "components/ProductDetails";
import ProductImageGallery from "components/ProductImageGallery";
import Showcase from "components/Showcase";
import { GoChevronLeft } from "react-icons/go";
import Slider from "components/Slider";
import client, { prismic } from "prismicio";
import Heading from "components/typography/Heading";
import { GroupField } from "@prismicio/client";
import { ContentDocumentDataFeaturesItem, Simplify } from "prismicio-types";
import { searchCatalogItems } from "api/customerApi";
import { PageProps } from "index";
import Money from "components/Money";
import { Accordion } from '@ark-ui/react/accordion'

import a from 'public/a.png'
import b from 'public/b.png'
import { FaAngleDown, FaChevronDown } from "react-icons/fa6";
import clsx from "clsx";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/react";
import { PrismicRichText } from "@prismicio/react";

const Page = async ({ params, searchParams }: PageProps) => {
  var slug = (await searchParams).id
  if (!slug) slug = (await params).slug

  const {
    result: { object: catalogObject, relatedObjects },
  } = await getProductDetails(slug);
  if (!catalogObject) return <p>Something went wrong!</p>
    ;

  const { items, images } = await searchCatalogItems("");


  const { data } = await client.getByUID("product_content", catalogObject.id.toLowerCase()).catch((e) => ({ data: undefined }))

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

    const featuresB = [
      {
        name: "Key Features",
        content: (
          <div>
            <ul className="list-disc">
              <li className="leading-8">Fits an iPad mini, over-ear headphones, Nintendo Switch</li>
              <li className="leading-8">Quick-access front compartment with mesh zip pocket</li>
              <li className="leading-8">Large main compartment with pen sleeves and slip pockets</li>
              <li className="leading-8">2 internal device sleeves&nbsp;</li>
              <li className="leading-8">Integrated Mod Key Tether</li>
              <li className="leading-8">Webbing grab handle on top</li>
              <li className="leading-8">HUB Carabiner-compatible accessory attachment loops</li>
              <li className="leading-8">Detachable shoulder strap with Maglockz clips</li>
              <li className="leading-8">YKK AquaGuard silent zippers</li>
              <li className="leading-8">Rugged, water-resistant laminate fabric</li>
            </ul>
          </div>
        )
      },
      {
        name: "Material",
        content: (<div>
          <div className="metafield-rich_text_field">
            <h3 ><em><strong>X-PAC®</strong></em></h3>
            <p><strong>EXTERIOR</strong></p>
            <p>X-Pac® VX42 420D in Black or Olive Green</p>
            <p><strong>INTERIOR</strong></p>
            <p>Axoflux Ripstop 150D in Vivid Orange</p>
            <h3><em><strong>AXOGRID</strong></em></h3><p><strong>EXTERIOR</strong></p>
            <p>Axogrid 300D in Black or Green</p>
            <p><strong>INTERIOR</strong></p>
            <p>150D Orange X-Grid Ripstop lining</p>
          </div>
        </div>)
      },
      {
        name: "Dimensions",
        content: (<div className="metafield-rich_text_field">
          <p>
            <strong>Height: </strong>24cm (9.5”)
          </p>
          <p>
            <strong>Width: </strong>17cm (6.7”)
          </p>
          <p>
            <strong>Depth: </strong>9cm (3.5”)
          </p>
          <p>
            <strong>Volume: </strong>3L
          </p>
          <p>
            <strong>Weight (X-Pac): </strong>360g
          </p>
          <p>
            <strong>Weight (Axogrid): </strong>420g
          </p>
          <p>
            <strong>Strap Length: </strong>80cm-140cm (31.5”-55.1”)
          </p>
        </div>)
      },
      {
        name: "Shipping and Returns",
        content: (<div
          className="accordion__content prose"
          style={{ opacity: 1, transform: "translateY(0px)" }}
        >
          <p>
            <strong>Shipping</strong>
          </p>
          <ul>
            <li>Free standard shipping on continental US orders over $100USD.</li>
            <li>Free international shipping available to select countries.</li>
            <li>
              See our&nbsp;
              <a
                href="https://alpakagear.com/pages/shipping"
                target="_blank"
                title="shipping"
              >
                full shipping policy
              </a>
              &nbsp;for delivery times and rates.
            </li>
          </ul>
          <p>
            <strong>Returns &amp; Warranty</strong>
          </p>
          <ul>
            <li>
              45-day money-back guarantee on all purchases (except Final Sale items)
            </li>
            <li>Lifetime manufacturing warranty on all ALPAKA&nbsp;products</li>
            <li>
              Visit our&nbsp;
              <a href="https://alpakagear.com/pages/returns" target="_blank">
                returns page
              </a>
              &nbsp;for process and conditions
            </li>
          </ul>
        </div>)
      },
    ]

    return (
      <>
        <div className="k-hero-content">
          <div className="k-full-container k-container--strech block lg:flex">
            <div className="k-hero-left-side pr-12">
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

        {data && (
          <div>
            <div className="p-4 clip-box relative">
              <div className="block md:hidden">
                <Accordion.Root collapsible>
                  {data.features.map(({ name, value }, i) => (
                    <Accordion.Item key={name} value={name?.toString() ?? ""} className={clsx("p-4 border-b-1 border-zinc-300")}>
                      <Accordion.ItemTrigger className="flex justify-between items-center w-full">
                        {name}
                        <Accordion.ItemIndicator>
                          <FaAngleDown />
                        </Accordion.ItemIndicator>
                      </Accordion.ItemTrigger>
                      <Accordion.ItemContent className="my-4"><PrismicRichText components={{
                        list: ({ children }) => <ul className="list-disc">{children}</ul>,
                        listItem: ({ children }) => <li className="leading-8">{children}</li>,
                      }} field={value} /></Accordion.ItemContent>

                    </Accordion.Item>
                  ))}
                </Accordion.Root>
              </div>
              <div className="md:block hidden">
                <TabGroup vertical className="flex border-t-1 border-b-1 p-2 border-zinc-300 min-h-96">
                  <div className="flex-1 flex flex-col justify-center">
                    <TabList className="flex flex-col">
                      {data.features.map(({ name }) => (
                        <Tab className="py-2 data-selected:font-bold">{name}</Tab>
                      ))}
                    </TabList>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <TabPanels className="p-4 py-2 border-zinc-300 border-l-2">
                      {data.features.map(({ value }) => (
                        <TabPanel>
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
              {data.showcases.map(
                ({
                  title,
                  description,
                  image: { url: src, alt },
                }, i) => (
                  <Showcase
                    key={i}
                    flipped={i % 2 !== 0}
                    animate={{ delay: (5 * (i + 1)) * 100 }}
                    content={{
                      title: title,
                      description: <PrismicRichText field={description} />,
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
            <div className="">
              <Image {...{ alt: data.image.alt ?? "", src: data.image.url, ...data.image.dimensions }} />
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
