"use server";

import logger from "@/util/logger";

import {
  CalculateOrderRequest,
  CatalogImage,
  CatalogObject,
  CreateOrderRequest,
  Order,
  OrderLineItem,
  Square,
  UpdateOrderRequest,
} from "square";
import square from "./clients/square";
import { isSuccessfulSquareApiCall } from "./clients/util";

const SQUARE_ORDER_CACHE_REVALIDATION = {
  next: { tags: ["square", "order"] },
};

type OrderRequest =
  | UpdateOrderRequest
  | CreateOrderRequest
  | CalculateOrderRequest;
type OrderWithoutLocation = Omit<OrderRequest, "order"> & {
  order: Omit<OrderRequest["order"], "locationId">;
};

const locationId = process.env.SQUARE_MAIN_LOCATION_ID ?? "";

export async function callGetCart(orderId: string) {
  return api.getCart(orderId);
}

export async function callCalculateCart(req: OrderWithoutLocation) {
  const nReq: CalculateOrderRequest = {
    ...req,
    order: {
      ...req.order,
      locationId,
    },
  };
  return api.calculateCart(nReq);
}

export async function callUpdateCart(req: OrderWithoutLocation) {
  const nReq = {
    ...req,
    order: {
      ...req.order,
      locationId,
    },
  } as UpdateOrderRequest;
  return api.updateCart(nReq);
}

export async function callCreateCart(req: OrderWithoutLocation) {
  const nReq = {
    ...req,
    order: {
      ...req.order,
      locationId,
    },
  } as CreateOrderRequest;
  return api.createCart(nReq);
}

class Carts {
  catalogApi: typeof square.catalog;
  ordersApi: typeof square.orders;
  constructor() {
    this.catalogApi = square.catalog;
    this.ordersApi = square.orders;
  }

  async createCart(req: CreateOrderRequest): Promise<CartOpResponse> {
    const { order } = await this.ordersApi.create(req);
    const data = await this.getLineItemCatalogData(order?.lineItems ?? []);
    return {
      order: order,
      ...data,
    };
  }

  async calculateCart(req: CalculateOrderRequest): Promise<CartOpResponse> {
    const { order } = await this.ordersApi.calculate(req);
    const data = await this.getLineItemCatalogData(order?.lineItems ?? []);
    return {
      order: order,
      ...data,
    };
  }

  async updateCart(
    ...req: Parameters<typeof this.ordersApi.update>
  ): Promise<CartOpResponse> {
    const { order } = await this.ordersApi.update(...req);

    const data = await this.getLineItemCatalogData(order?.lineItems ?? []);
    return {
      order: order,
      ...data,
    };
  }

  async getCart(orderId: string): Promise<CartOpResponse> {
    const result: CartOpResponse = {};
    if(!orderId) return result

    const res = await this.ordersApi.get({ orderId }).catch((err) => err as Square.Error_);
    if(!isSuccessfulSquareApiCall(res)) return result

    const { order } = res

    const { variationToImageMap, options, relatedObjects } =
      await this.getLineItemCatalogData(order?.lineItems ?? []);

    result.order = order;
    result.relatedObjects = relatedObjects;
    result.imageMap = variationToImageMap;
    result.options = options;

    return result;
  }

  async getLineItemCatalogData(lineItems: OrderLineItem[]): Promise<{
    options: Record<string, Record<string, (CatalogObject | undefined)[]>>;
    relatedObjects: CatalogObject[];
    variationToImageMap: { [id: string]: CatalogImage | undefined };
  }> {
    lineItems = lineItems.filter((item) => item.itemType === "ITEM");
    if (lineItems.length == 0) {
      return {
        options: {},
        relatedObjects: [],
        variationToImageMap: {},
      };
    }
    const objIds = lineItems
      .map(({ catalogObjectId }) => catalogObjectId)
      .filter((x): x is string => typeof x === "string");
    const { objects: itemVariationObjs = [], relatedObjects = [] } =
      await this.catalogApi.batchGet({
        objectIds: objIds,
        includeRelatedObjects: true,
      });

    const variationToOptionTree = itemVariationObjs.reduce<{
      [id: string]: {
        [id: string]: string[];
      };
    }>((acc, variationObj) => {
      if (variationObj.type !== "ITEM_VARIATION") {
        return acc;
      }

      const { id, itemVariationData } = variationObj;
      const itemOptionValues = itemVariationData?.itemOptionValues;
      acc[id] = {};
      if (!itemOptionValues) return acc;

      itemOptionValues.forEach(({ itemOptionId, itemOptionValueId }) => {
        const optId = itemOptionId ?? "";
        const valId = itemOptionValueId ?? "";

        if (!acc[id][optId]) acc[id][optId] = [valId];
        else acc[id][optId].push(valId);
      });

      return acc;
    }, {});

    // links item obj to obj
    const itemToVariationAndImageMap = relatedObjects
      .filter((item): item is CatalogObject.Item => item.type === "ITEM")
      .reduce<Record<string, { variationIds: string[]; imageIds: string[] }>>(
        (acc, item) => {
          return {
            ...acc,
            [item.id]: {
              variationIds: objIds.filter((id) =>
                item.itemData?.variations?.map(({ id }) => id).includes(id),
              ),
              imageIds: item.itemData?.imageIds ?? [],
            },
          };
        },
        {},
      );

    const imageIds = Array.from(
      new Set(
        relatedObjects
          .filter((item): item is CatalogObject.Item => item.type === "ITEM")
          .map((item) => item.itemData?.imageIds ?? [])
          .flat(),
      ),
    );

    const catalogObjs = (
      await this.catalogApi.batchGet({
        objectIds: [
          ...imageIds,
          ...(Object.values(variationToOptionTree)
            .map((obj) => Object.values(obj).flat())
            .flat() as string[]),
        ],
      })
    ).objects;

    const optValueObjs = catalogObjs?.filter(
      (obj): obj is CatalogObject.ItemOptionVal =>
        obj.type === "ITEM_OPTION_VAL",
    );
    const imgObjs = catalogObjs?.filter(
      (obj): obj is CatalogObject.Image => obj.type === "IMAGE",
    );

    const options = Object.fromEntries(
      Object.entries(variationToOptionTree).map(([itemId, obj]) => {
        return [
          itemId,
          Object.fromEntries(
            Object.entries(obj).map(([id, arr]) => {
              const newArr = arr.map((id) =>
                optValueObjs?.find(({ id: objId }) => id === objId),
              );
              return [id, newArr];
            }),
          ),
        ];
      }),
    );

    const variationToImageMap = Object.values(
      itemToVariationAndImageMap,
    ).reduce<{ [id: string]: CatalogImage | undefined }>(
      (acc, { variationIds: [id], imageIds: [imageId] }) =>
        !imgObjs
          ? acc
          : {
              ...acc,
              [id]: imgObjs.find(({ id }) => id === imageId)?.imageData,
            },
      {},
    );

    return {
      options,
      relatedObjects,
      variationToImageMap,
    };
  }
}

type CartOpResponse = {
  imageMap?: { [id: string]: CatalogImage | undefined };
  relatedObjects?: CatalogObject[];
  // options?: Simplify<Simplify<CatalogObject[]>>;
  options?: any;
  order?: Order;
};

const api = new Carts();
