"use server";

import logger from "util/logger";

import {
  CalculateOrderRequest,
  CatalogImage,
  CatalogObject,
  CreateOrderRequest,
  Order,
  OrderLineItem,
} from "square";
import { Square } from "./clients";

const SQUARE_ORDER_CACHE_REVALIDATION = {
  next: { tags: ["square", "order"] },
};

export async function callGetCart(orderId: string) {
  return (
    api
      .getCart(orderId)
      // .then((result) => {
      //   processRes(
      //     result,
      //     "Cart Successfully Retrieved!",
      //     "Cart Retrieval Failed",
      //   );
      //   return result;
      // })
      .catch((err) => {
        logger.error(err);
        throw err;
      })
  );
}

export async function callCalculateCart(req: CalculateOrderRequest) {
  return api.calculateCart(req);
}

export async function callUpdateCart({ orderId, order, fieldsToClear }: any) {
  return api.updateCart({ order, fieldsToClear }, orderId);
}

export async function callCreateCart(catalogOrder: CreateOrderRequest) {
  catalogOrder.order = {
    ...catalogOrder.order,
    locationId: process.env.SQUARE_MAIN_LOCATION_ID ?? "",
  };
  return api.createCart(catalogOrder);
}

class Carts {
  catalogApi: typeof Square.catalog;
  ordersApi: typeof Square.orders;
  constructor() {
    this.catalogApi = Square.catalog;
    this.ordersApi = Square.orders;
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
    req: {
      order: Order;
      fieldsToClear: string[];
    },
    orderId: string,
  ): Promise<CartOpResponse> {
    const { order } = await this.ordersApi.update({ orderId, ...req });

    const data = await this.getLineItemCatalogData(order?.lineItems ?? []);
    return {
      order: order,
      ...data,
    };
  }

  async getCart(orderId: string): Promise<CartOpResponse> {
    const result: CartOpResponse = {};
    const { order } = await this.ordersApi.get({ orderId });

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
