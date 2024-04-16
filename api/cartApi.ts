"use server";

import { processRes } from "api";
import { DEFAULT_FETCH_INIT, SQUARE_URL } from "../constants";

import logger from "util/logger";

const BASE_PATH = SQUARE_URL + "carts";
const SQUARE_ORDER_CACHE_REVALIDATION = {
  next: { tags: ["square", "order"] },
};

export async function callGetCart(orderId: string) {
  return fetch(`${BASE_PATH}/${orderId}`)
    .then((res) => res.json())
    .then(({ result }) => {
      processRes(
        result,
        "Cart Successfully Retrieved!",
        "Cart Retrieval Failed"
      );
      return result.order;
    })
    .catch((err) => logger.error(err));
}

export async function callUpdateCart(
  { orderID, order, fieldsToClear }: any,
  init = DEFAULT_FETCH_INIT
) {
  return fetch(`${BASE_PATH}/update/${orderID}`, {
    ...DEFAULT_FETCH_INIT,
    ...init,
    body: JSON.stringify({ order, fieldsToClear }),
  })
    .then((res) => res.json())
    .then(({ result }) => {
      processRes(result, "Cart Successfully Updated", "Cart Update Failed");
      return result.order;
    })
    .catch((err) => logger.error(err));
}

export async function callCreateCart(
  catalogOrder: any,
  init = DEFAULT_FETCH_INIT
) {
  return fetch(`${BASE_PATH}/create`, {
    ...init,
    body: JSON.stringify(catalogOrder),
  })
    .then((res) => {
      return res.json();
    })
    .then(({ result }) => {
      processRes(result, "Cart Successfully Created", "Cart Creation Failed");
      return result;
    })
    .catch((err) => console.log(err));
}
