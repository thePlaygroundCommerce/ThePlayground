'use server';

import { URLSearchParams } from "url";
import { DEFAULT_FETCH_INIT, SQUARE_URL } from "../constants";

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

  const result = await fetch(fetchUrl, init)
    .then((res) => res.json())
    .then(checkForErrors)
    .catch((err) => err);

  return result;
}

export async function getCatalogObjects(types: any) {
  const queryParams = new URLSearchParams({ types });
  const fetchUrl = `${SQUARE_URL}catalog/objects?${queryParams}`;

  return await fetch(fetchUrl, { next: { revalidate: 0 } }) // TODO must set to appropriate value in prod
    .then((res) => res.json())
    .then(checkForErrors)
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

export async function getCatalogItemsAndImages(ids: string[]) {
  if(ids.length === 0 ) return
  const fetchUrl = `${SQUARE_URL}catalog`;
  const payload = { objectIds: ids, includeRelatedObjects: true }

  return await fetch(fetchUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload),
    next: { revalidate: 0 },
  }) // TODO must set to appropriate value in prod
    .then((res) => res.json())
    // .then(checkForErrors)
    .catch((err) => console.log(err));
}

export async function getProductDetails({ params: { slug } }: any) {
  try {
    const catalogObject = await fetch(SQUARE_URL + "catalog/" + slug, {
      next: { revalidate: 0 }
    })
      .then((res) => res.json())
      .catch((err) => err);

    return {
      catalogObject: catalogObject.result,
    };
  } catch (error: any) {
    return {
      error: error.result,
    };
  }
}
