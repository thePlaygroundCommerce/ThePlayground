// @ts-nocheck

import axios from "axios";
import matter from "gray-matter";

import { htmlAsRichText } from "@prismicio/migrate";
import { marked } from "marked";
import * as cheerio from "cheerio";
import prismic, { repositoryName } from "@/api/clients/prismicio";

import path from "node:path";
import { BsTypeH2 } from "react-icons/bs";
import { transform } from "lodash";
import {
  BlogPostDocumentDataSlices2Slice,
  BlogTextSlice,
} from "prismicio-types";
import { isFilled } from "@prismicio/client";

export async function POST(req: Request) {
  if (!process.env.PRISMIC_WRITE_TOKEN)
    return Response.json("Importing is to only be used by admins!", {
      status: 500,
    });

  let prismicJson;

  const migration = prismic.createMigration();
  const writeClient = prismic.createWriteClient(repositoryName, {
    writeToken: process.env.PRISMIC_WRITE_TOKEN,
  });

  const text = await req.text();
  const { data, content } = matter(
    text,
    // { language: "json" }
  );

  const parseAndTransform = async (text: string) => {
    const htmlFromString = await marked.parse(text);
    const $ = cheerio.load(`<div>${htmlFromString}</div>`);

    const groups: Array<{ result: any[]; warnings: any[] }> = [];
    let currentGroup = { result: [] as any[], warnings: [] as any[] };

    const transformTable = (element: any) => {
      const tableData = { head: { rows: [] }, body: { rows: [] } };
      const $table = $(element);

      $table.find("tr").each((_, tr) => {
        const isHeader = $(tr).find("th").length > 0;
        const cells = [];
        const key = crypto.randomUUID();

        $(tr)
          .find("th, td")
          .each((_, cell) => {
            const key = crypto.randomUUID();

            cells.push({
              type: cell.name === "th" ? "header" : "data",
              content: [
                {
                  type: "paragraph",
                  text: $(cell).text().trim(),
                  spans: [],
                },
              ],
            });
          });

        if (cells.length > 0) {
          if (isHeader) tableData.head.rows.push({ cells });
          else tableData.body.rows.push({ cells });
        }
      });

      return { result: [tableData], warnings: [] };
    };

    const parseSections = () => {
      // transforms HTML Elements into desired prismic structures
      $("div")
        .children()
        .each((_, element) => {
          const tagName = element.tagName.toLowerCase();

          if (tagName === "hr") {
            if (
              currentGroup.result.length > 0 ||
              currentGroup.warnings.length > 0
            ) {
              groups.push(currentGroup);
            }
            currentGroup = { result: [], warnings: [] };
            return;
          }

          const transformed =
            tagName === "table"
              ? transformTable(element)
              : htmlAsRichText($.html(element), {
                  // serializer: {
                  //   "blockquote p": ({ node }) => {
                  //     return {
                  //       type: "paragraph",
                  //       text: "",
                  //       spans: [],
                  //       label: "blockquote",
                  //     };
                  //   },
                  // },
                });

          currentGroup.result.push(...transformed.result);
          currentGroup.warnings.push(...transformed.warnings);
        });

      if (currentGroup.result.length > 0 || currentGroup.warnings.length > 0) {
        groups.push(currentGroup);
      }
    };

    const createSlices = (): BlogPostDocumentDataSlices2Slice[] => {
      const structs = [];

      // create structured objs ... ( Rich Data, Table, Etc )
      $("div")
        .children()
        .each((i, element) => {
          const tagName = element.tagName.toLowerCase();

          // html -> desired object
          const list: {
            matchList: string[];
            handler: () =>
              | ReturnType<typeof transformTable>["result"]
              | ReturnType<typeof htmlAsRichText>["result"];
          }[] = [
            {
              matchList: ["table"],
              handler: () => transformTable(element).result,
            },
            {
              matchList: [
                "p",
                "h1",
                "h2",
                "h3",
                "h4",
                "h5",
                "h6",
                "img",
                "ul",
                "hr",
              ],
              handler: () => {
                const result = htmlAsRichText($.html(element), {
                  serializer: {
                    hr: ({ node }) => {
                      return {
                        type: "paragraph",
                        text: "",
                        spans: [],
                        label: "hr",
                      };
                    },
                  },
                }).result;

                const slices = result
                  .filter((obj) => {
                    if (obj.type === "paragraph" && !obj.text) {
                      return false;
                    }
                    return true;
                  })
                  .map((a) => {
                    const isMedia = ["image", "embed"].includes(a.type);
                    return {
                      slice_type: isMedia ? "blog_media" : "blog_text",
                      slice_label: null,
                      variation: "default",
                      version: "initial",
                      items: [],
                      primary: !isMedia
                        ? {
                            text: result,
                          }
                        : {
                            group: [
                              {
                                image: result.find(
                                  (obj) => obj.type === "image",
                                ),
                              },
                            ],
                          },
                    };
                  });

                return slices;
              },
            },
          ];

          const matchedTransformer = list.find(({ matchList: stringToMatch }) =>
            stringToMatch.includes(tagName),
          );

          if (!matchedTransformer) {
            console.log("Unexpected tag name found!: ", tagName);
            return;
          }

          const transformed = matchedTransformer.handler();

          structs.push(...transformed);
        });

      // turn structs to slices
      // turn rich txt objs to BlogText slice

      const result = structs.reduce<BlogPostDocumentDataSlices2Slice[]>(
        (acc, cur, i) => {
          if (cur.slice_type === "blog_text") {
            const lastSliceItem = acc[acc.length - 1];
            if (lastSliceItem?.slice_type === "blog_text") {
              lastSliceItem.primary.text.push(...cur.primary.text);
            } else {
              acc.push(cur);
              return acc;
            }
          } else {
            acc.push(cur);
            return acc;
          }
          return acc;
        },
        [],
      );

      return result;
    };

    return createSlices();
  };

  try {
    // Custom migration code will go here...
    const a = await parseAndTransform(content);

    a.filter((obj) => {
      return obj.slice_type === "blog_media";
    }).map((slice) => {
      slice.primary.group.forEach(({ image: img }) => {
        const src = img.url;
        const alt = img.alt;
        const { ext, base: filename } = path.parse(src);

        const list = [
          [[".mp4", ".mkv", ".avi", ".mov", ".flv", ".wmv", ".webm"], () => {}],
          [
            [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp", ".tiff"],
            () => {
              img.id = migration.createAsset(
                src,
                `${data.slug}_${filename}`,
                alt,
              );
            },
          ],
        ];

        const matchedTransformer = list.find(([stringsToMatch]) => {
          return stringsToMatch.includes(ext);
        });
        
        if (!matchedTransformer) {
          console.log("Unexpected tag name found!: ", tagName);
          return;
        }
        
        console.log(matchedTransformer);
        matchedTransformer[1]();
      });
    });

    // const videos = prismicJson.result.filter((res) => res.video?.title);

    // try {
    //   for (const res of videos) {
    //     const { data: embed } = await axios.post(
    //       "http://localhost:3005/api/video",
    //       res.video,
    //     );
    //     res.video = embed;
    //   }
    // } catch (error) {}

    // return Response.json(prismicJson);

    const document = migration.createDocument(
      {
        type: "blog_post",
        // For some document types, `uid` can be optional,
        // TypeScript will let you know when it's the case.
        uid: data.slug,
        lang: "en-us",
        tags: data.tags ?? [],
        // Learn more in the "Provide document data" section.
        data: {
          title: data.title,
          headline: "",
          image: undefined,
          slices: [],
          slices2: a,
          meta_title: data.title,
          meta_description: data.excerpt,
          meta_image: undefined,
          sections: [],
        },
      },
      data.title,
    );

    // Execute the prepared migration at the very end of the script
    await writeClient
      .migrate(migration, {
        reporter: (event) => console.log(event),
      })
      .catch((err) => console.log(err));

    return Response.json(a);
  } catch (error) {
    console.log(error);
    return Response.json(
      { error: error.response, prismicJson },
      { status: 500 },
    );
  }
}
