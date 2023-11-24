import { CatalogObject } from "square";

type SplitCategoryNameWithId = {
  id: string;
  category: string;
};

type CategoryTree = {
  [key: string]: {
    id: string;
    categoryList: CategoryTree[];
  };
};

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
