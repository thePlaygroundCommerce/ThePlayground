const url = require("url");

async function getCatalogItemsByCategories(request) {
  const fetchUrl = `${
    process.env.square[process.env.NODE_ENV].url
  }catalog/search`;
  const init = {
    method: "POST",
    body: request,
    next: { revalidate: 0 }, // TODO must set to appropriate value in prod
  };

  return await fetch(fetchUrl, init)
    .then((res) => res.json())
    .then((data) => data.result)
    .catch((err) => err);
}

async function getCatalogObjects(types) {
  const queryParams = new url.URLSearchParams({ types });
  const fetchUrl = `${
    process.env.square[process.env.NODE_ENV].url
  }catalog/objects?${queryParams}`;

  return await fetch(fetchUrl, { next: { revalidate: 3600 * 24 } }) // TODO must set to appropriate value in prod
    .then((res) => res.json())
    .then((data) => data.result)
    .catch((err) => err);
}

async function getProductDetails({ params: { slug } }) {
  try {
    const catalogObject = await fetch(
      process.env.square[process.env.NODE_ENV].url + "catalog/" + slug
    )
      .then((res) => res.json())
      .catch((err) => err);

    return {
      catalogObject: catalogObject.result,
    };
  } catch (error) {
    return {
      error: error.result,
    };
  }
}

module.exports = {
  getCatalogItemsByCategories,
  getCatalogObjects,
  getProductDetails,
};
