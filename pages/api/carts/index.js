const { Client, Environment, ApiError } = require("square");
// const { v4: uidv4 } = require("uuid");

const squareClient = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Sandbox,
});

const { ordersApi } = squareClient;

const getOrder = async (orderID) => {
  try {
    const response = await ordersApi.retrieveOrder(orderID);

    return response;
  } catch (error) {
    return error;
  }
};

export default async (req, res) => {
  try {
    const order = await getOrder(req.cookies.cartRefID);

    res.json({ ...order.result });
  } catch (error) {
    res.json({ error });
  }

  // //if no cartOrder is present create one
  // createOrder(catalogOrder)
  // //else update cartOrder
  // updateOrder(catalogOrder)
};

export { default as createOrder } from "./createCart";
export { default as updateOrder } from "./updateCart";
