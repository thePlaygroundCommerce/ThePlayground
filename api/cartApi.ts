import { CONFIG } from "../constants";

import { DEFAULT_INIT } from "."

const BASE_PATH = CONFIG.square[process.env.NODE_ENV].url + "carts";

export async function callGetCart(orderId: string) {
  return fetch(`${BASE_PATH}/${orderId}`)
    .then((res) => res.json())
    .then(({ result }) => {

      return result.order;
    })
    .catch((err) => console.log(err));
}

export async function callUpdateCart({ orderID, order, fieldsToClear } : any, init = DEFAULT_INIT ) {
  return fetch(`${BASE_PATH}/update/${orderID}`, {
    ...DEFAULT_INIT,
    ...init,
    body: JSON.stringify({order, fieldsToClear}),
  })
    .then((res) => res.json())
    .then(({ result }) => {
      console.log("Cart Successfully Updated");
      return result.order;
    })
    .catch((err) => console.log(err));
}

export async function callCreateCart(catalogOrder: any, init = DEFAULT_INIT) {
  return fetch(`${BASE_PATH}/create`, {
    ...init,
    method: "POST",
    body: JSON.stringify(catalogOrder),
  })
    .then((res) => {
      return res.json();
    })
    .then((order) => {
      console.log("Cart Successfully Created");
      return order.result;
    })
    .catch((err) => console.log(err));
}