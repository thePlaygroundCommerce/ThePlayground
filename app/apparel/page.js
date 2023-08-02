import SideNav from "components/SideNav";
import ProductGrid from "components/ProductGrid";

const url = require("url");

export default async function Page() {
  const catalogItems = await getCatalogObjects();

  const mappedCatalogItems = {};
  catalogItems?.objects.forEach((item) => {
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

  return (
    <div className="grid grid-cols-12 p-4">
      <div className="col-span-1">
        <SideNav catalogCategories={mappedCatalogItems.categories} />
      </div>
      <div className="col-span-11">
        <ProductGrid
          catalogItems={mappedCatalogItems.items}
          catalogImages={mappedCatalogItems.images}
        />
      </div>
    </div>
  );
}

async function getCatalogObjects() {
  const queryParams = new url.URLSearchParams({ types: "IMAGE,ITEM,CATEGORY" });
  const fetchUrl = `${
    process.env.square[process.env.NODE_ENV].url
  }catalog/objects?${queryParams}`;

  return await fetch(fetchUrl)
    .then((res) => res.json())
    .then((data) => data.result)
    .catch((err) => err);
}
