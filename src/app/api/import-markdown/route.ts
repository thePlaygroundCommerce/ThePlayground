import matter from "gray-matter";
import markdownToRichText from "@gijsbotje/md-to-prismic-richtext";

import { htmlAsRichText } from "@prismicio/migrate";
import { marked } from "marked";
import * as cheerio from "cheerio";
import prismic, { repositoryName } from "@/api/clients/prismicio";

export async function POST(req: Request) {
  const writeClient = prismic.createWriteClient(repositoryName, {
    // process.env.PRISMIC_WRITE_TOKEN,
    writeToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoibWFjaGluZTJtYWNoaW5lIiwiZGJpZCI6InRoZXBsYXlncm91bmRtZWRpYS04YTg3Yzc4My01OThiLTQyNDgtOWNjYy1hMDQxYTUzNGY5ZjJfNCIsImRhdGUiOjE3ODE3NjIzNjQsImRvbWFpbiI6InRoZXBsYXlncm91bmRtZWRpYSIsImFwcE5hbWUiOiJUaGUgUGxheWdyb3VuZCIsImlhdCI6MTc4MTc2MjM2NH0.DdHTObl5dJiAC1D5YWbRGdH16NulttctiNwTkk_dhRk",
  });
  const migration = prismic.createMigration();

  const parseAndTransform = async (text: string) => {
    const htmlFromString = await marked.parse(text);
    const $ = cheerio.load(`<div>${htmlFromString}</div>`);

    const groups: Array<{ result: any[]; warnings: any[] }> = [];
    let currentGroup = { result: [] as any[], warnings: [] as any[] };

    const transformTable = (element: any) => {
      const tableData = { head: [], body: [] };
      const $table = $(element);

      $table.find("tr").each((_, tr) => {
        const isHeader = $(tr).find("th").length > 0;
        const cells = [];

        $(tr)
          .find("th, td")
          .each((_, cell) => {
            cells.push({
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
          if (isHeader) tableData.head.push({ cells });
          else tableData.body.push({ cells });
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
            : htmlAsRichText($.html(element));

        // transformed.result.filter((a) => a.type === "paragraph")

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
                acc.paragraph.push(obj);
              if (["heading2"].includes(obj.type)) acc.heading = obj.text;
              if (["image"].includes(obj.type)) {
                const src = obj.url;
                const filename = src.split("/").pop();
                const alt = obj.alt;

                acc.image = obj;
                acc.image.id = migration.createAsset(src, filename, alt);
              }

              return acc;
            },
            {
              paragraph: [],
              heading: null,
              image: {},
              table: null,
              includeDividers: true,
            },
          ),
        ),
      warnings: groups.flatMap((group) => group.warnings),
    };

    return result;
  };

  const text = await req.text();
  const { data, content } = matter(text);

  try {
    // Custom migration code will go here...
    const prismicJson = await parseAndTransform(content);

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
    return Response.json({ error: error.response }, { status: 500 });
  }
}
