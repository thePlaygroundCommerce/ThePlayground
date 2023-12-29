import { components } from "app/slices";
import { createClient } from "prismicio";
import { SliceZone } from "@prismicio/react";

const Page = async () => {
  console.log("starting page 1");
  const client = createClient();
  let slices = [];

  console.log("starting page");
  
  try {
    console.log("getting slices");
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
    
    slices = data.slices;

    console.log("recieved slices");
  } catch (error) {
    console.log("recieved ERROR");
    console.log(error);
  }

  return <SliceZone slices={slices} components={components} />;
};

export default Page;
