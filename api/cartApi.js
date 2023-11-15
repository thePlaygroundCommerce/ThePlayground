import { CONFIG } from "../constants";

const { DEFAULT_INIT } = require("./")

const BASE_PATH = CONFIG.square[process.env.NODE_ENV].url + "carts";

async function callGetCart(orderId) {
  return fetch(`${BASE_PATH}/${orderId}`)
    .then((res) => res.json())
    .then(({ result }) => {

      return result.order;
    })
    .catch((err) => console.log(err));
}

async function callUpdateCart({ orderID, order, fieldsToClear }, init = DEFAULT_INIT ) {
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

async function callCreateCart(catalogOrder, init = DEFAULT_INIT) {
  console.log(DEFAULT_INIT,  init)
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
      console.log(order)
      return order.result;
    })
    .catch((err) => console.log(err));
}

module.exports = {
  callGetCart,
  callUpdateCart,
  callCreateCart,
};
