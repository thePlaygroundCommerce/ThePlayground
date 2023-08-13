const url = require("url");

async function getCatalogObjects(types) {
  const queryParams = new url.URLSearchParams({ types });
  const fetchUrl = `${
    process.env.square[process.env.NODE_ENV].url
  }catalog/objects?${queryParams}`;

  return await fetch(fetchUrl)
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
    getCatalogObjects,
    getProductDetails
  };
  