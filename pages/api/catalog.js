const { squareClient, ApiError } = require('./index')

const { catalogApi } = squareClient

const getCatalogItems = async () => {
  try {
    let catalogResponse = await catalogApi.listCatalog(
      undefined,
      "IMAGE,ITEM"
    );
    let parsedObjects = catalogResponse.result.objects;

    return parsedObjects;
  } catch (error) {
    if (error instanceof ApiError) {
      error.result.errors.forEach(function (e) {
        console.log(e.category);
        console.log(e.code);
        console.log(e.detail);
      });
    } else {
      console.log("Unexpected error occurred: ", error);
    }
  }
};
const getCatalogItem = async slug => {
    try {
      let catalogResponse = await catalogApi.retrieveCatalogObject(slug, true);
      let parsedObject = catalogResponse.result;

      return parsedObject;
    } catch (error) {
      if (error instanceof ApiError) {
        error.result.errors.forEach(function (e) {
          console.log(e.category);
          console.log(e.code);
          console.log(e.detail);
        });
      } else {
        console.log("Unexpected error occurred: ", error);
      }

      return error
    }
  };

export {
  getCatalogItems,
  getCatalogItem
}