"use server";

import { URLSearchParams } from "url";
import { DEFAULT_FETCH_INIT, SQUARE_URL } from "../constants";
import {
  ApiResponse,
  BatchRetrieveCatalogObjectsRequest,
  BatchRetrieveCatalogObjectsResponse,
  CatalogObject,
  RetrieveCatalogObjectResponse,
  SearchCatalogItemsRequest,
  SearchCatalogItemsResponse,
  SearchCatalogObjectsRequest,
  SearchCatalogObjectsResponse,
} from "square";
import { batchRetrieveCatalogObjectsResponseSchema } from "square/dist/types/models/batchRetrieveCatalogObjectsResponse";
import { Simplify } from "prismicio-types";
import { formatNavigationLinks, mapArrayToMap } from "../util";
import { PageProps } from "index";

const checkForErrors = (data: any) => {
  if (data.errors) {
    data.result = {
      objects: [],
    };
  }

  return data.result;
};

export async function getCatalogItemsByCategory(request: any) {
  const fetchUrl = `${SQUARE_URL}catalog/search`;
  const init = {
    ...DEFAULT_FETCH_INIT,
    body: JSON.stringify(request),
    next: { revalidate: 0 }, // TODO must set to appropriate value in prod
  };

  return await fetch(fetchUrl, init)
    .then((res) => res.json())
    .then(checkForErrors)
    .catch((err) => err);
}

export async function getCatalogObjects(types: any) {
  const queryParams = new URLSearchParams({ types });
  const fetchUrl = `${SQUARE_URL}catalog/objects?${queryParams}`;

  return await fetch(fetchUrl, { next: { revalidate: 0 } }) // TODO must set to appropriate value in prod
    .then((res) => res.json())
    .then(checkForErrors)
    .catch((err) => console.log(err));
}

export async function getCatalogInfo(): Promise<{
  categoryNameMap: { [id: string]: string };
  objects: { [type: string]: CatalogObject[] };
}> {
  const fetchUrl = `${SQUARE_URL}catalog/info`;

  return await fetch(fetchUrl, { next: { revalidate: 0 } }) // TODO must set to appropriate value in prod
    .then((res) => res.json())
    .then((data) => ({
      ...data,
      categoryNameMap: Object.fromEntries(
        Object.entries(data.categoryNameMap).map(([k, v]) => [
          formatNavigationLinks(k),
          v,
        ])
      ),
    }))
    // .then(checkForErrors)
    .catch((err) => console.log(err));
}

export async function getCatalogImages(types: any) {
  const queryParams = new URLSearchParams({ types });
  const fetchUrl = `${SQUARE_URL}catalog/objects?${queryParams}`;

  return await fetch(fetchUrl, { next: { revalidate: 0 } }) // TODO must set to appropriate value in prod
    .then((res) => res.json())
    .then(checkForErrors)
    .catch((err) => console.log(err));
}

export async function getCatalogItemsAndImages(
  ids: string[],
  includeRelatedObjects: boolean = true
): Promise<BatchRetrieveCatalogObjectsResponse> {
  if (ids.length === 0) {
  }

  const fetchUrl = `${SQUARE_URL}catalog`;
  const payload = { objectIds: ids, includeRelatedObjects };

  return await fetch(fetchUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    next: { revalidate: 0 },
  }) // TODO must set to appropriate value in prod
    .then((res) => res.json())
    // .then(checkForErrors)
    .catch((err) => console.log(err));
}

export async function searchObjects(
  includeRelatedObjects: boolean = true,
  payload: SearchCatalogObjectsRequest
): Promise<ApiResponse<SearchCatalogObjectsResponse>> {
  const fetchUrl = `${SQUARE_URL}catalog/search/objects`;
  return await fetch(fetchUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    next: { revalidate: 0 },
  }) // TODO must set to appropriate value in prod
    .then((res) => res.json())
    // .then(checkForErrors)
    .catch((err) => console.log(err));
}

export async function searchItems(
  payload: SearchCatalogItemsRequest
): Promise<{
  objects: CatalogObject[];
  cursor: SearchCatalogItemsResponse["cursor"];
}> {
  const fetchUrl = `${SQUARE_URL}catalog/search`;
  return await fetch(fetchUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    next: { revalidate: 0 },
  }) // TODO must set to appropriate value in prod
    .then((res) => res.json())
    // .then(checkForErrors)
    .catch((err) => console.log(err));
}

export const getCategorizedObjects = async (resource: string) => {
  let products = [],
    relatedObjects: CatalogObject[] = [];
  const mappedCatalogItems = {
    items: [],
    images: [],
  };
  const { objects: categories } = await getCatalogObjects("CATEGORY");
  const foundCategory = categories.find(
    ({ categoryData: { name } }: { categoryData: { name: string } }) =>
      name.split(" ").pop()?.toLowerCase() == resource.toLowerCase()
  );

  if (foundCategory) {
    const backendReq = {
      objectTypes: ["ITEM", "IMAGE"],
      query: {
        exactQuery: {
          attributeName: "category_id",
          attributeValue: foundCategory.id,
        },
      },
      includeRelatedObjects: true,
    };

    const { objects = [], relatedObjects: relObjs = [] } =
      (await searchObjects(false, backendReq)).result;

    products = objects;
    relatedObjects = relObjs;
  } else {
    const { objects } = await getCatalogObjects("ITEM,IMAGE");
    products = objects;
  }
  return mapArrayToMap([...products, ...relatedObjects, ...categories]);

}

export async function getProductDetails(slug: string): Promise<ApiResponse<RetrieveCatalogObjectResponse>> {
  return await fetch(SQUARE_URL + "catalog/" + slug, {
    next: { revalidate: 0 },
  })
    .then((res) => res.json())
    .catch((err) => err);
}
