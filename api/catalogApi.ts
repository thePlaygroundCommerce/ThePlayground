import { URLSearchParams } from "url";
import { DEFAULT_INIT } from ".";
import { CONFIG } from "../constants";

const checkForErrors = (data: any) => {
  if (data.errors) {
    data.result = {
      objects: [],
    };
    console.log(data);
  }

  return data.result;
};

export async function getCatalogItemsByCategory(request: any) {
  const fetchUrl = `${CONFIG.square[process.env.NODE_ENV].url}catalog/search`;
  const init = {
    ...DEFAULT_INIT,
    body: JSON.stringify(request),
    next: { revalidate: 0 }, // TODO must set to appropriate value in prod
  }

  const result = await fetch(fetchUrl, init)
    .then((res) => res.json())
    .then(checkForErrors)
    .catch((err) => err);

  return result;
}

export async function getCatalogObjects(types: any) {
  const queryParams = new URLSearchParams({ types });
  const fetchUrl = `${
    CONFIG.square[process.env.NODE_ENV].url
  }catalog/objects?${queryParams}`;

  return await fetch(fetchUrl, { next: { revalidate: 0 } }) // TODO must set to appropriate value in prod
    .then((res) => res.json())
    .then(checkForErrors)
    .catch((err) => console.log(err));
}

export async function getProductDetails({ params: { slug } }: any) {
  try {
    const catalogObject = await fetch(
      CONFIG.square[process.env.NODE_ENV].url + "catalog/" + slug
    )
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
