import { components } from "app/slices";
import { createClient } from "prismicio";
import { SliceZone } from "@prismicio/react";

const Page = async () => {
  const client = createClient();
  let slices = [];

  try {
    const [{ data }] = await client.getAllByType("homepage", {
      graphQuery: `
      {
        homepage {
          slices {
            ... on hero {
              variation {
                ... on withCta {
                  primary {
                    ...primaryFields
                    cta {
                      ... on cta_email {
                        slices {
                          ... on call_to_action {
                            variation {
                              ... on onlyButton {
                                primary {
                                  ...primaryFields
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            ... on featured_categories {
              variation {
                ... on default {
                  items {
                    category {
                      ... on categorylink {
                        ...categorylinkFields
                      }
                    }
                  }
                }
              }
            }
            ... on hero_2 {
              variation {
                ... on default {
                  primary {
                    ...primaryFields
                  }
                }
              }
            }
          }
        }
      }
    `,
    });
    console.log(data);
    slices = data.slices;
  } catch (error) {
    console.log(error);
    console.log("AHere");
  }

  return <SliceZone slices={slices} components={components} />;
};

export default Page;
