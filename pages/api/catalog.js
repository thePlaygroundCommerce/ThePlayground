const { Client, Environment, ApiError } = require("square");

const squareClient = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Sandbox,
});

const { catalogApi } = squareClient;

const getCatalogItems = async ( catalogIds, includeRelatedObjects ) => {
  var catalogResponse;
  try {
    if (!catalogIds) {
      catalogResponse = await catalogApi.listCatalog(undefined, "IMAGE,ITEM");
    } else {
      catalogResponse = await catalogApi.batchRetrieveCatalogObjects({ objectIds: catalogIds, includeRelatedObjects: includeRelatedObjects })
    }
    let parsedObjects = catalogResponse.result;

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
const getCatalogItem = async (slug) => {
  try {
    let catalogResponse = await catalogApi.retrieveCatalogObject(slug, true);
    let parsedObject = catalogResponse.result;

    return parsedObject;
  } catch (error) {
    if (error instanceof ApiError) {
      // error.result.errors.forEach(function (e) {
      //   console.log(e.category);
      //   console.log(e.code);
      //   console.log(e.detail);
      // });
    } else {
      console.log("Unexpected error occurred: " + error instanceof ApiError);
      console.log("Unexpected error occurred: ", error);
    }

    return error;
  }
};

export { getCatalogItems, getCatalogItem };
