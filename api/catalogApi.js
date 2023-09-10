const url = require("url");
const { DEFAULT_INIT } = require("./")

async function getCatalogItemsByCategory(request) {
  const fetchUrl = `${
    process.env.square[process.env.NODE_ENV].url
  }catalog/search`;
  const init = {
    ...DEFAULT_INIT,
    body: JSON.stringify(request),
    next: { revalidate: 60 * 15  }, // TODO must set to appropriate value in prod
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

  return await fetch(fetchUrl, { next: { revalidate: 60 * 15 } }) // TODO must set to appropriate value in prod
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
  getCatalogItemsByCategory,
  getCatalogObjects,
  getProductDetails,
};
