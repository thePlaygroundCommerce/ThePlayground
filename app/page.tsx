import { createClient } from "prismicio";
import Hero from "components/Hero";

import A from "public/comingsoon.jpeg";
import B from "public/forestbridge.jpeg";
import { searchItems } from "api/catalogApi";
import { TypeOmittedSlideProps } from "components/Slide";
import { ImageProps } from "next/image";
import { mapArrayToMap } from "util/index";
import Showcase from "components/Showcase";
import AboutPage from "./about/page"

const Page = async () => {
  const client = createClient();
  let slices = [];

  // try {
  //   const [{ data }] = await client.getAllByType("homepage", {
  //     graphQuery: `
  //     {
  //       homepage {
  //         slices {
  //           ... on hero {
  //             variation {
  //               ... on default {
  //                 primary {
  //                   ...primaryFields
  //                   cta {
  //                     ... on cta_email {
  //                       slices {
  //                         ... on call_to_action {
  //                           variation {
  //                             ... on onlyButton {
  //                               primary {
  //                                 ...primaryFields
  //                               }
  //                             }
  //                           }
  //                         }
  //                       }
  //                     }
  //                   }
  //                 }
  //               }
  //             }
  //           }
  //           ... on featured_categories {
  //             variation {
  //               ... on default {
  //                 items {
  //                   category {
  //                     ... on categorylink {
  //                       ...categorylinkFields
  //                     }
  //                   }
  //                 }
  //               }
  //             }
  //           }
  //           ... on hero_2 {
  //             variation {
  //               ... on default {
  //                 primary {
  //                   ...primaryFields
  //                 }
  //               }
  //             }
  //           }
  //           ... on sliders {
  //             variation {
  //               ... on default {
  //                 primary {
  //                   ...primaryFields
  //                 }
  //               }
  //               ... on blog {
  //                 primary {
  //                 ...primaryFields
  //                   items {
  //                     blog {
  //                       ...blogFields
  //                     }
  //                   }
  //                 }
  //               }
  //             }
  //           }
  //         }
  //       }
  //     }
  //     `,
  //   });

  //   slices = data.slices;
  // } catch (error) {
  //   console.log(error);
  // }

  // return <div></div>;

  // return <SliceZone slices={slices} components={components} />;

  // [A].map(({  }) => ({  }))

  return (
    <div className="w-full">
      <div className="flex flex-col flex-nowrap md:w-[200%] ease-in-out delay-1000 transition-transform duration-[2000ms] -translate-x-0">
        <div className="md:w-1/2">
          <Hero
            classes={{
              contentContainer: "text-white",
            }}
            type={"static"}
            items={[
              {
                image: {
                  ...A,
                  alt: "Picture of glasses",
                  blurWidth: undefined,
                  blurHeight: undefined,
                },
                content: {
                  title: "Dont Worry, We Got You",
                  description:
                    "Shop our newest selection of travel gear while FREE SHIPPING lasts.",
                  link: "/shop",
                  linkLabel: 'SHOP NOW'
                },
                contentStyles: {
                  // text_content_position: "bottomCenter",
                },
              },
            ]}
          />
        </div>
        {/* <div className="p-2 py-4">

        <Slider
          type={"DEFAULT"}
          title={"New Arrivals"}
          headline={undefined}
          slides={(await getProducts('cover')).slice(-3)}
        />
      </div> */}
        <AboutPage />
        {/* <div className="md:w-1/2">
          <Showcase
            image={{
              ...B,
              alt: "Picture of glasses",
              blurWidth: undefined,
              blurHeight: undefined,
            }}
            content={{
              title: "Take On Any Adventure With The All New Utility Backpack",
              headline: "Staff Picks",
              description: (
                <div>
                  <div>
                    <p>
                      The new utility backpack is perfect for any adventures you are
                      embarking on. Whether as a spacious carry on for short leisure
                      trips or outdoor pack for moderate outdoor ventures. The utility backpack is highly versatile and expendable.
                    </p>
                  </div>
                  <ul>
                    <li>Rugged, Designed for Daily Use</li>
                    <li>Weatherproof and Scratchproof</li>
                    <li>Stylish Modern Shape and Feel</li>
                  </ul>
                </div>
              ),
              link: "/shop",
              linkLabel: "SHOP NOW",
            }}
            flipped={true}
          />
        </div> */}
      </div>
    </div>
  );
};

export default Page;

const getProducts = async (imagefit: ImageProps["objectFit"]): Promise<TypeOmittedSlideProps[]> => {
  const { items, images } = mapArrayToMap((await searchItems({})).objects)

  return items.map(({ itemData: { name, imageIds, variations } = {} }) => {
    const [{ itemVariationData: { priceMoney: { amount = BigInt(0) } = {} } = {} }] = variations ?? []
    const { url, caption: alt } = images?.find(({ id }) => imageIds?.[0] === id)?.imageData ?? {}
    return {
      image: {
        imagefit,
        src: url ?? "",
        alt: alt ?? ""
      },
      content: {
        title: name ?? "",
        price: Number(amount),
        link: "/shop"
      }
    }
  })
}