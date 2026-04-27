"use server";

import {
  BatchGetCatalogObjectsRequest,
  BatchGetCatalogObjectsResponse,
  CatalogObject,
  ListCatalogResponse,
  SearchCatalogItemsRequest,
  SearchCatalogItemsResponse,
} from "square";
import square from "./clients/square";

const checkForErrors = (data: any) => {
  if (data.errors) {
    data.result = {
      objects: [],
    };
  }

  return data.result;
};

export async function getCatalogObjects(types: any) {
  return catalog.listCatalogObjects({ types });
}

export async function getCatalogInfo(): Promise<{
  categoryNameMap: { [id: string]: string };
  objects: { [type: string]: CatalogObject[] };
}> {
  return catalog.getCatalogInformation();
}

export async function getCatalogItemsAndImages(
  ids: string[],
  includeRelatedObjects: boolean = true,
) {
  return catalog.getProducts({ objectIds: ids, includeRelatedObjects });
}

export async function searchItems(payload: SearchCatalogItemsRequest): Promise<
  BatchGetCatalogObjectsResponse & {
    cursor: SearchCatalogItemsResponse["cursor"];
  }
> {
  const result: Awaited<ReturnType<typeof searchItems>> = {
    cursor: undefined,
    objects: [],
  };

  // retrieve items
  const { items = [], cursor } = await api.searchItems(payload);

  if (items.length === 0) return result;

  const imageIdSet = items.reduce<Set<string>>((set, obj) => {
    if (obj.type !== "ITEM") {
      return set;
    }

    obj.itemData?.imageIds?.forEach((id: string) => {
      if (!set.has(id)) {
        set.add(id);
      }
    });

    return set;
  }, new Set<string>());

  // retrieve item imgs
  const { objects: imageObjs = [] } = await api.batchGet({
    objectIds: Array.from(imageIdSet),
  });

  result.cursor = cursor;
  result.objects = [...imageObjs, ...items];

  return result;
}

export async function getProductDetails(slug: string) {
  return catalog.retrieveCatalogObject({ slug });
}

class Catalog {
  catalogApi: typeof square.catalog;

  // private readonly logger = new Logger(CatalogController.name);

  constructor() {
    this.catalogApi = square.catalog;
  }

  // async searchCatalogItems(
  //   body: SearchCatalogItemsRequest,
  // ): Promise<SearchProductsResponse> {
  //   try {
  //     const res = await this.catalogService.searchProducts(body);
  //     return res;
  //   } catch (error) {
  //     if (error instanceof ApiError) {
  //       return error.result;
  //     } else {
  //       console.log("Unexpected error occurred: ", error);
  //     }
  //   }
  // }

  // async searchCatalogObjects(
  //   body: SearchCatalogObjectsRequest,
  // ): Promise<ApiResponse<SearchCatalogObjectsResponse>> {
  //   try {
  //     const res = await this.catalogApi.searchCatalogObjects(body);
  //     console.debug("Response returned: ", res.statusCode);
  //     return res;
  //   } catch (error) {
  //     if (error instanceof ApiError) {
  //       return error.result;
  //     } else {
  //       console.log("Unexpected error occurred: ", error);
  //     }
  //   }
  // }

  async listCatalogObjects(
    query: { types: string },
  ): Promise<ListCatalogResponse> {
    const page = await this.catalogApi.list({ types: query.types });
    return {
      objects: page.data,
    };
    // try {
    //   // this.logger.debug('Response returned: ', res.statusCode);
    //   return res;
    // } catch (error) {
    //   if (error instanceof ApiError) {
    //     this.logger.log(error);
    //     return error.result;
    //   } else {
    //     this.logger.log('Unexpected error occurred: ', error);
    //   }
    // }
  }

  async getCatalogInformation(): Promise<{
    categoryNameMap: { [id: string]: string };
    objects: { [type: string]: CatalogObject[] };
  }> {
    const catalogList = (
      await this.catalogApi.list({
        types: "CATEGORY,TAX,DISCOUNT,ITEM_OPTION",
      })
    ).data;

    // reduce obj list to record string, obj
    const objects = catalogList.reduce<Record<string, CatalogObject[]>>(
      (acc, obj) => ({
        ...acc,
        [obj.type]: acc[obj.type] ? [...acc[obj.type], obj] : [obj],
      }),
      {},
    );

    const categories = (objects.CATEGORY ?? []).filter(
      (obj): obj is CatalogObject.Category => obj.type === "CATEGORY",
    );

    const categoryNameMap: Record<string, string> = {};
    for (const category of categories) {
      const name = category.categoryData?.name ?? "";
      categoryNameMap[name] = category.id ?? "";
    }

    return {
      objects,
      categoryNameMap,
    };
  }

  async retrieveCatalogObject({ slug }: { slug: string }) {
    return api.object.get({ objectId: slug, includeRelatedObjects: true });
  }

  async getProducts({
    objectIds,
    includeRelatedObjects,
  }: BatchGetCatalogObjectsRequest): Promise<BatchGetCatalogObjectsResponse> {
    // try {
    return await this.catalogApi.batchGet({ objectIds, includeRelatedObjects });

    // const result = [...objects, ...relatedObjects].reduce(
    //   (acc, obj) => ({
    //     ...acc,
    //     [obj.type]: acc[obj.type] ? [...acc[obj.type], obj] : [obj],
    //   }),
    //   {},
    // );
    // return result;
    // } catch (error) {
    //   if (error instanceof ApiError) {
    //     return error.result;
    //   } else {
    //     console.log("Unexpected error occurred: ", error);
    //   }
    // }
  }
}

const catalog = new Catalog();
const api = square.catalog;
