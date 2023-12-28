import { SQUARE_URL } from "../constants";
import { DEFAULT_INIT } from ".";
import logger from "util/logger";

const BASE_PATH = SQUARE_URL + "carts";

const processRes = async (promise: Promise<Response>) => {
  let statusText;

  const log = {
    msg: "Cart Operation - " + "",
    backendReq: "",
    backendRes: "",
  };

  return promise
    .then((res) => {
      statusText = res.statusText
      return res.json();
    })
    .then(({ result }) => {
      logger.info(log);
      return result.order;
    })
    .catch((err) => logger.error(err))
    .finally(() => {});
};

export async function callGetCart(orderId: string) {

  return fetch(`${BASE_PATH}/${orderId}`)
    .then((res) => res.json())
    .then(({ result }) => {
      logger.info(result);
      return result.order;
    })
    .catch((err) => logger.error(err));
}

export async function callUpdateCart(
  { orderID, order, fieldsToClear }: any,
  init = DEFAULT_INIT
) {
  return fetch(`${BASE_PATH}/update/${orderID}`, {
    ...DEFAULT_INIT,
    ...init,
    body: JSON.stringify({ order, fieldsToClear }),
  })
    .then((res) => res.json())
    .then(({ result }) => {
      logger.info("Cart Successfully Updated");
      return result.order;
    })
    .catch((err) => logger.error(err));
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
      console.log(order);
      return order.result;
    })
    .catch((err) => console.log(err));
}
