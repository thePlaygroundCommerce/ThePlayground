import { getProductDetails, searchItems } from "api/catalogApi";
import Button from "components/Button";
import NewsletterForm from "components/forms/NewsletterForm";
import Hero from "components/Hero";
import Image from "components/Image";
import Showcase from "components/Showcase";
import Slider from "components/Slider";
import Heading from "components/typography/Heading";
import Link from "next/link";
import { client } from "prismicio";
import React, { Fragment } from "react";
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
  const blogCards = blogs.map(({ uid, data: { title, headline } }) => (
    <Fragment key={uid}>
      <Image style={{ objectFit: "cover" }} alt={""} fill />
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
    </Fragment>
  ))

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
                    <Link href="/shop"><Button variant="primary">Shop Now</Button></Link>
                  </div>
                </div>
              ),
            },
          ]}
        />
      </div>
      <div className="lg:container mx-auto flex flex-col gap-12 md:mb-12">
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
                    link: `/shop/product/${obj.id}`,
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
        <div className="min-h-[75vh]">
          <Heading level={2} className="p-4">
            THE PLAYGROUND MISSION
          </Heading>
          <Showcase
            contentStyles={{ classes: "text-center p-4" }}
            content={{
              title: "",
              description: (
                <div className="">
                  <p>Our mission is to redefine the
                    way you experience travel. We believe that travel
                    is not just about reaching a destination but about the
                    journey itself. That's why we curate experiences that
                    inspire and connect you with the world around you.</p>
                  <Link href="/about" className="text-xs italic underline">Learn More</Link>
                </div>
              )

            }}
            image={{ alt: "", width: 1080, height: 1080 }}
            flipped
          />
        </div>
        <div className="min-h-[75vh] flex flex-col gap-4">
          <Showcase
            content={
              <div className="text-center h-full flex flex-col justify-center items-center">
                <div className="">
                  <div>
                    <Heading level={4} className="text-sm font-bold text-red-500 italic m-2">
                      🔥 TRENDING 🔥
                    </Heading>
                  </div>
                  <Heading level={2} className="m-2">
                    {hotItem.itemData?.name}
                  </Heading>
                  <ul className="check">
                    <li className="">Weatherproof</li>
                    <li>Embedded USB Charger Port</li>
                    <li>Durable and Water Resistant</li>
                    <li>Stylish Modern Shape and Feel</li>
                  </ul>
                  <Link href={`/shop/product/${hotItem.id}`}>
                    <Button className="mt-6" variant="primary">
                      SHOW NOW
                    </Button>
                  </Link>
                </div>
              </div>
            }
            image={{
              src: hotItemImage?.url,
              alt: hotItemImage?.caption ?? "",
              width: 1080,
              height: 1080
            }}
          />
        </div>
        {blogs.length > 1 && (
          <div>
            <div className="p-4">
              <Heading level={2}>
                LATEST NEWS
              </Heading>
            </div>
            <div className="md:min-h-[75vh] flex flex-col lg:gap-4 lg:flex-row text-mintcream-200">
              <div className="w-full min-h-96 relative overflow-hidden sm:rounded">
                {blogCards[0]}
              </div>
              <div className="w-full min-h-96 flex items-center relative overflow-hidden sm:rounded order-last lg:order-none">
                <NewsletterForm
                  className="text-mintcream-700"
                  {...{
                    description:
                      "You are signing up to receive product updates and newsletters. By signing up, you are consenting to our privacy policy but you can opt out at any time.",
                    title: (<Heading level={2}>Get exclusive access to new products, deals & surprise giveaways.</Heading>)
                  }}
                />
              </div>
              <div className="w-full min-h-96 relative overflow-hidden sm:rounded">
                {blogCards[1]}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
