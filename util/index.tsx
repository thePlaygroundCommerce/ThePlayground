import { CatalogObject } from "square";
import { SplitCategoryNameWithId, CategoryTree, Content, ContentData } from "index";
import { ReactElement } from "react";
import Link from "next/link";

export const wrapLink = (link: string | undefined, elem: ReactElement) =>
  link ? <Link href={link}>{elem}</Link> : elem;

export const doesContextExist = <T,>(context: T | null) => {
  if (!context) {
    throw new Error("Hooks have to be used within Providers");
  }

  return context;
}

export function splitCategoryNames(arr: CatalogObject[]): string[][] {
  return arr?.map(({ categoryData }) =>
    categoryData?.name ? categoryData.name.split(" ") : [""]
  );
}

export function splitCategoryNamesWithId(
  arr: CatalogObject[]
): SplitCategoryNameWithId[] {
  return arr?.map(({ id, categoryData }: { id: string; categoryData?: any }) =>
    categoryData?.name
      ? {
        id,
        category: categoryData.name.split(" "),
      }
      : {
        id: "",
        category: [],
      }
  );
}

export function mapArrayToMap(arr: CatalogObject[]) {
  const mappedCatalogObjects: {
    [key: string]: CatalogObject[];
  } = {};

  arr?.forEach((item) => {
    const lowerCaseItemType = item.type.toLowerCase();
    const key: string =
      lowerCaseItemType == "category"
        ? lowerCaseItemType.slice(0, -1) + "ies"
        : lowerCaseItemType + "s";

    mappedCatalogObjects[key] =
      mappedCatalogObjects[key] === undefined
        ? [item]
        : mappedCatalogObjects[key].concat(item);
  });
  return mappedCatalogObjects;
}

export const formatNavigationLinks = (string: string) => string.trim().replace(" ", "").toLowerCase();

export const makeCategoryTree = (
  arr: SplitCategoryNameWithId[]
): CategoryTree =>
  arr?.reduce((acc: CategoryTree, { id, category }) => {
    const categoryLowercase = category[0].toLowerCase();
    if (acc[categoryLowercase] !== undefined) {
      acc[categoryLowercase].categoryList.push(
        makeCategoryTree([{ id, category: category.slice(1) }])
      );
    } else {
      acc[categoryLowercase] = { id: id, categoryList: [] };
    }
    return acc;
  }, {});

// const unregister = fetchIntercept.register({
//   request: function (url, config) {
//     // const _url = new URL(url);
//     // const host = _url.hostname;
//     // const path = _url.pathname;
//     // const log = {
//     //   host,
//     //   path,
//     //   body: config.body,
//     // };

//     // logger.info(log);
//     return [url, config];
//   },

//   requestError: function (error) {
//     return Promise.reject(error);
//   },

//   response: function (response) {
//     const clonedResponse = response.clone();
//     clonedResponse
//       .json()
//       .then((data) => {
//         const log = {
//           status: response.statusText,
//           errors: data.errors,
//         };

//         if (data.errors) logger.error(log);
//       })
//       .catch((err) => logger.error(err));

//     return response;
//   },

//   responseError: function (error) {
//     return Promise.reject(error);
//   },
// });

// unregister interceptors
// unregister();


export const renderContent = (
  content: Content["content"],
  contentDataRenderer: (content: ContentData) => ReactElement
) => {
  return content && "title" in content ? contentDataRenderer(content) : content;
};
