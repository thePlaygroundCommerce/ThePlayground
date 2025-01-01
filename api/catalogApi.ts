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
import { formatNavigationLinks } from "../util";

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
  includeRelatedObjects: boolean = true,
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

export async function getProductDetails({
  params,
}: any): Promise<ApiResponse<RetrieveCatalogObjectResponse>> {
  const { slug } = await params;
  return await fetch(SQUARE_URL + "catalog/" + slug, {
    next: { revalidate: 0 },
  })
    .then((res) => res.json())
    .catch((err) => err);
}
