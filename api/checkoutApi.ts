"use server";

import {
  ApiError,
  ApiResponse,
  BatchRetrieveCatalogObjectsResponse,
  Order,
  OrderLineItem,
  RetrieveOrderResponse,
} from "square";
import { DEFAULT_FETCH_INIT, SQUARE_URL } from "../constants";

export async function getOrderAndCatalogObjects(orderId: string): Promise<
  | {
      order: ApiResponse<RetrieveOrderResponse>;
      objects: ApiResponse<BatchRetrieveCatalogObjectsResponse>;
    }
  | undefined
> {
  try {
    const { order } = await fetch(SQUARE_URL + "checkout/order/" + orderId, {
      next: { revalidate: 0 },
    })
      .then((res) => res.json())
      .then(({ result }) => result)
      .catch((err) => err);

    const lineItemsCatalogIdList = order.lineItems.map(
      (item: any) => item.catalogObjectId
    );

    const objects = await fetch(SQUARE_URL + "catalog", {
      next: { revalidate: 0 },
      method: "POST",
      body: JSON.stringify({
        objectIds: lineItemsCatalogIdList,
        includeRelatedObjects: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((err) => err);
    return {
      order,
      objects,
    };
  } catch (error: unknown) {
    console.log(error);
    // if (error instanceof ApiError) {
    //   return {
    //     error: error.result,
    //   };
    // }
  }
}

export async function getCheckoutOrderUrl(
  id: string,
  redirectUrl: string = "http://localhost:3005/checkout"
) {
  return await fetch(
    SQUARE_URL + `checkout/order/${id}?redirect=${redirectUrl}`,
    {
      next: { revalidate: 0 },
      method: "GET",
    }
  )
    .then((res) => res.json())
    .then(({ result }) => result)
    .catch((err) => console.error(err));
}

export async function getCheckoutItemUrl(
  lineItems: OrderLineItem[],
  redirectUrl: string = "http://localhost:3005/checkout"
) {
  return await fetch(SQUARE_URL + `checkout/item?redirect=${redirectUrl}`, {
    ...DEFAULT_FETCH_INIT,
    next: { revalidate: 0 },
    method: "POST",
    body: JSON.stringify(lineItems),
  })
    .then((res) => res.json())
    .then(({ result }) => result)
    .catch((err) => console.error(err));
}
