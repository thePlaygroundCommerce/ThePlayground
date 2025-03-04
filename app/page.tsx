import { getProductDetails, searchItems } from "api/catalogApi";
import Button from "components/Button";
import Hero from "components/Hero";
import Image from "components/Image";
import Showcase from "components/Showcase";
import Slider from "components/Slider";
import Heading from "components/typography/Heading";
import Link from "next/link";
import { client } from "prismicio";
import React from "react";
import { mapArrayToMap } from "util/index";

type Props = {};

const page = async (props: Props) => {
  const { objects } = await searchItems({ categoryIds: [] });
  const { items, images } = mapArrayToMap(objects);
  const hotItem = (await getProductDetails("")).result?.object ?? items[0];
  const hotItemImage = images.find(
    (obj) => obj.id === hotItem.itemData?.imageIds?.[0]
  )?.imageData;
  const blogs = await client.getAllByType("blog_post");

  return (
    <div>
      <div>
        <Hero
          type={"static"}
          items={[
            {
              image: { alt: "", fill: true },
              content: (
                <div className="p-4 flex flex-col justify-end h-full text-mintcream-200">
                  <Heading level={1}>FREE SHIPPING</Heading>
                  <p className="truncate">
                    Try out our new travel gear with zero shipping or handling
                    fees applied.
                  </p>
                  <div className="mt-2">
                    <Button variant="primary">Shop Now</Button>
                  </div>
                </div>
              ),
            },
          ]}
        />
      </div>
      <div className="container mx-auto">
        <div className="p-4">
          <Slider
            type={"DEFAULT"}
            title={"SHOP OUR NEWEST GEAR"}
            headline={undefined}
            slides={items
              .filter((obj) => obj.itemData)
              .map((obj) => {
                const image = images.find(
                  (obj2) => obj2.id === obj.itemData?.imageIds?.[0]
                );
                return {
                  image: {
                    src: image?.imageData?.url,
                    alt: image?.imageData?.caption ?? "",
                  },
                  content: {
                    title: obj.itemData?.name ?? "",
                    price: Number(
                      obj.itemData?.variations?.[0].itemVariationData
                        ?.priceMoney?.amount ?? 0
                    ),
                  },
                };
              })}
          />
        </div>
        <div>
          <Heading level={2} className="text-sm m-2">
            THE PLAYGROUND MISSION
          </Heading>
          <Showcase
            contentStyles={{ classes: "text-center p-4" }}
            content={{
              title: "",
              description:
                "Our mission is to redefine the \
             way you experience travel. We believe that travel \
             is not just about reaching a destination but about the \
             journey itself. That's why we curate experiences that \
             inspire and connect you with the world around you.",
            }}
            image={{ alt: "", fill: true }}
            flipped
          />
        </div>
        <div className="flex flex-col gap-4 mb-6">
          <Showcase
            content={
              <div className="text-center">
                <Heading level={3} className="m-2">
                  HOT PICK
                </Heading>
                <Heading level={2} className="text-sm m-2">
                  {hotItem.itemData?.name}
                </Heading>
                <ul className="check">
                  <li>Weatherproof</li>
                  <li>Embedded USB Charger Port</li>
                  <li>Durable and Water Resistant</li>
                  <li>Stylish Modern Shape and Feel</li>
                </ul>
                <Link href={`/shop/product/${hotItem.id}`}>
                  <Button className="mt-2" variant="primary">
                    SHOW NOW
                  </Button>
                </Link>
              </div>
            }
            image={{
              src: hotItemImage?.url,
              alt: hotItemImage?.caption ?? "",
              fill: true,
            }}
          />
        </div>
        {blogs.length > 1 && (
          <div>
            <div className="p-4">
              <Heading level={2} className="text-sm">
                LATEST NEWS
              </Heading>
            </div>
            <div className="h-[75vh] flex flex-col text-mintcream-200">
              {blogs.map(({ uid, data: { title, headline } }) => (
                <div className="grow relative">
                  <Image alt={""} fill />
                  <div className="absolute flex flex-col justify-end w-full h-full p-4">
                    <div>
                      <Heading level={1}>{title}</Heading>
                      <p className="truncate text-sm">{headline}</p>
                      <Link href={`/log/${uid}`}>
                        <Button
                          padding={0}
                          className="text-xs underline italic"
                        >
                          Read More
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
