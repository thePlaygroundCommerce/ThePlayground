"use server"

import {
  ApiError,
  ApiResponse,
  BatchRetrieveCatalogObjectsResponse,
  RetrieveOrderResponse,
} from "square";
import { SQUARE_URL } from "../constants";

export async function getOrderAndCatalogObjects(orderId: string): Promise<
  | {
      order: ApiResponse<RetrieveOrderResponse>;
      objects: ApiResponse<BatchRetrieveCatalogObjectsResponse>;
    }
  | undefined
> {
  try {
    const { order } = await fetch(
      SQUARE_URL + "checkout/order/" + orderId,
      { next: { revalidate: 0 } }
    )
      .then((res) => res.json())
      .then(({ result }) => result)
      .catch((err) => err);

    const lineItemsCatalogIdList = order.lineItems.map(
      (item: any) => item.catalogObjectId
    );

    const objects = await fetch(
      SQUARE_URL + "catalog",
      {
        next: { revalidate: 0 },
        method: "POST",
        body: JSON.stringify({
          objectIds: lineItemsCatalogIdList,
          includeRelatedObjects: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
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

export async function getCheckoutUrl(lineItems: any) {
  return await fetch(SQUARE_URL + "checkout", {
    next: { revalidate: 0 },
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      order: { lineItems },
      checkoutOptions: { redirectUrl: "http://localhost:3005/checkout/" },
    }),
  })
    .then((res) => res.json())
    .then(({ result }) => result.paymentLink.url)
    .catch((err) => console.error(err));
}
