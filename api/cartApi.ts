import { processRes } from "api";
import { DEFAULT_FETCH_INIT, SQUARE_URL } from "../constants";

import logger from "util/logger";
import { revalidatePath } from "next/cache";

import {
  ApiResponse,
  CalculateOrderRequest,
  CalculateOrderResponse,
  CatalogImage,
  CatalogObject,
  CreateOrderResponse,
  Order,
  RetrieveOrderResponse,
  UpdateOrderRequest,
  UpdateOrderResponse,
} from "square";
import { Simplify } from "prismicio-types";

const BASE_PATH = SQUARE_URL + "carts";
const SQUARE_ORDER_CACHE_REVALIDATION = {
  next: { tags: ["square", "order"] },
};

export async function callGetCart(
  orderId: string
): Promise<{ order?: Order, options: CatalogObject[], relatedObjects: CatalogObject[], imageMap?: Simplify<CatalogImage> }> {
  return fetch(`${BASE_PATH}/${orderId}`, { cache: "no-store" })
    .then((res) => res.json())
    .then((result) => {
      processRes(
        result,
        "Cart Successfully Retrieved!",
        "Cart Retrieval Failed"
      );
      return result;
    })
    .catch((err) => {
      logger.error(err);
      throw err;
    });
}

export async function calculateCart(
  req: CalculateOrderRequest,
  init = DEFAULT_FETCH_INIT,
): Promise<ApiResponse<CalculateOrderResponse>> {
  return fetch(`${BASE_PATH}/calculate`, {
    ...DEFAULT_FETCH_INIT,
    ...init,
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((result) => {
      processRes(
        result,
        "Cart Successfully Calculated",
        "Cart Calculation Failed"
      );
      return result;
    })
    .catch((err) => {
      logger.error(err);
      throw err;
    });
}

export async function callUpdateCart(
  { orderId, order, fieldsToClear }: any,
  init = DEFAULT_FETCH_INIT
): Promise<ApiResponse<UpdateOrderResponse>> {
  return fetch(`${BASE_PATH}/update/${orderId}`, {
    ...DEFAULT_FETCH_INIT,
    ...init,
    body: JSON.stringify({ order, fieldsToClear }),
  })
    .then((res) => res.json())
    .then((result) => {
      processRes(result, "Cart Successfully Updated", "Cart Update Failed");
      return result;
    })
    .catch((err) => {
      logger.error(err);
      throw err;
    });
}

export async function callCreateCart(
  catalogOrder: any,
  init = DEFAULT_FETCH_INIT
): Promise<ApiResponse<CreateOrderResponse>> {
  return fetch(`${BASE_PATH}/create`, {
    ...init,
    body: JSON.stringify(catalogOrder),
  })
    .then((res) => {
      return res.json();
    })
    .then((result: ApiResponse<CreateOrderResponse>) => {
      processRes(result, "Cart Successfully Created", "Cart Creation Failed");
      return result;
    })
    .catch((err) => {
      logger.error(err);
      throw err;
    });
}
