import { components } from "app/slices";
import { createClient } from "prismicio";
import { SliceZone } from "@prismicio/react";

const Page = async () => {
  const client = createClient();

  const [{ data: { slices }}] = await client.getAllByType("coming_soon", {
    graphQuery: `
    {
      coming_soon {
        slices {
          ... on hero {
            variation {
              ... on handlesCta {
                primary {
                  ...primaryFields
                  cta {
                    ... on cta_email {
                      slices {
                        ... on call_to_action {
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
                }
                items {
                  social_media_handle {
                    ...on social_media_handle {
                      social_media_name
                      social_media_url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `
  });
 
  return <SliceZone slices={slices} components={components} />;
};

export default Page;
