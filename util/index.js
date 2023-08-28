export function splitCategoryNames(arr) {
  return arr?.map(({ categoryData: { name } }) => name.split(" "));
}

export function mapArrayToMap(arr) {
  const mappedCatalogItems = {};

  arr.forEach((item) => {
    const lowerCaseItemType = item.type.toLowerCase();
    const key =
      lowerCaseItemType == "category"
        ? lowerCaseItemType.slice(0, -1) + "ies"
        : lowerCaseItemType + "s";

    mappedCatalogItems[key] =
      mappedCatalogItems[key] === undefined
        ? [item]
        : mappedCatalogItems[key].concat(item);
  });
  return mappedCatalogItems;
}
