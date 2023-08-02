// const { Client, Environment, ApiError } = require("square");

// const squareClient = new Client({
//   accessToken: process.env.SQUARE_ACCESS_TOKEN,
//   environment: Environment.Sandbox,
// });

// const { ordersApi } = squareClient;

// const getOrder = async (orderID) => {
//   try {
//     const response = await ordersApi.retrieveOrder(orderID);

//     return JSON.parse(JSON.stringify( response.result ));
//   } catch (error) {
//     return error;
//   }
// };
// const searchOrder = async () => {
//   try {
//     const response = await ordersApi.searchOrders({
//       locationIds: ["LFX4KWJMYHQZ3"],
//       query: {
//         filter: {

//         }
//       }
//     })    
//   } catch (error) {
//     return error
//   }
// }

// export default async (req, res) => {
//   try {
//     const { order } = await getOrder(req.cookies.cartID);

//     res.json({ order: JSON.stringify(order, stringifyBigIntReplacer) });
//   } catch (error) {
//     console.error(error)
//     res.json({ error });
//   }
// };

// export { getOrder } ;
// export { default as createOrder } from "./createCart";
// export { default as updateOrder } from "./updateCart";
