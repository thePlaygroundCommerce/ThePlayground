import { components } from "app/slices";
import { createClient } from "prismicio";
import { SliceZone } from "@prismicio/react";

const Page = async () => {
  const client = createClient();

  const [{ data, data: { slices } } = { data: { slices: [] } }] =
    await client.getAllByType("homepage", {
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
        }
      }
    }
  `,
    });

  return <SliceZone slices={slices} components={components} />;
};

export default Page;
