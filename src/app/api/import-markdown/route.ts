import axios from "axios";
import matter from "gray-matter";

import { htmlAsRichText } from "@prismicio/migrate";
import { marked } from "marked";
import * as cheerio from "cheerio";
import prismic, { repositoryName } from "@/api/clients/prismicio";

import path from "node:path";

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
                serializer: {
                  "blockquote p": ({ node }) => {
                    return {
                      type: "paragraph",
                      text: "",
                      spans: [],
                      label: "blockquote",
                    };
                  },
                },
              });

        currentGroup.result.push(...transformed.result);
        currentGroup.warnings.push(...transformed.warnings);
      });

    if (currentGroup.result.length > 0 || currentGroup.warnings.length > 0) {
      groups.push(currentGroup);
    }

    const result = {
      result: groups
        .map((group) =>
          group.result.filter((obj) =>
            obj.text === undefined ? true : obj.text,
          ),
        )
        .map((arr) =>
          arr.reduce(
            (acc, obj) => {
              if (["paragraph", "list-item"].includes(obj.type))
                obj.label === "blockquote"
                  ? acc.blockquote.push(obj)
                  : acc.paragraph.push(obj);
              if (["heading2"].includes(obj.type)) acc.heading = obj.text;
              if (["image"].includes(obj.type)) {
                const src = obj.url;
                const alt = obj.alt;
                const { ext, base: filename } = path.parse(src);

                if (
                  [
                    ".mp4",
                    ".mkv",
                    ".avi",
                    ".mov",
                    ".flv",
                    ".wmv",
                    ".webm",
                  ].includes(ext)
                ) {
                  acc.video = {
                    url: src,
                    title: filename.slice(0, filename.indexOf(".")),
                    collection: data.slug,
                  };
                } else if (
                  [
                    ".jpg",
                    ".jpeg",
                    ".png",
                    ".gif",
                    ".bmp",
                    ".webp",
                    ".tiff",
                  ].includes(ext)
                ) {
                  acc.image = obj;
                  acc.image.id = migration.createAsset(src, filename, alt);
                }
              }

              if (obj.head || obj.body) {
                acc.table = obj;
              }

              return acc;
            },
            {
              paragraph: [],
              heading: undefined,
              blockquote: [],
              image: {},
              table: undefined,
              video: undefined,
              includeDividers: true,
            },
          ),
        ),
      warnings: groups.flatMap((group) => group.warnings),
    };

    return result;
  };

  try {
    // Custom migration code will go here...
    prismicJson = await parseAndTransform(content);

    const b = prismicJson.result.filter((res) => res.video?.title);

    try {
      for (const res of b) {
        const { data: embed } = await axios.post(
          "http://localhost:3005/api/video",
          res.video,
        );
        res.video = embed;
      }
    } catch (error) {}

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
          slices2: [],
          meta_title: data.title,
          meta_description: data.excerpt,
          meta_image: undefined,
          sections: prismicJson.result as any,
        },
      },
      data.title,
    );

    // Execute the prepared migration at the very end of the script
    await writeClient.migrate(migration, {
      reporter: (event) => console.log(event),
    });

    return Response.json(document);
  } catch (error) {
    console.log(error);
    return Response.json(
      { error: error.response, prismicJson },
      { status: 500 },
    );
  }
}
