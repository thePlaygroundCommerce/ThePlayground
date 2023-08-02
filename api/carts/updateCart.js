// const { Client, Environment, ApiError } = require("square");

// const squareClient = new Client({
//   accessToken: process.env.SQUARE_ACCESS_TOKEN,
//   environment: Environment.Sandbox,
// });

// const { ordersApi } = squareClient;

// const updateOrder = async ({ orderID, order }) => {
//   try {
//     const response = await ordersApi.updateOrder(orderID, {
//       order: { locationId: "LFX4KWJMYHQZ3", ...order },
//     });

//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export default async (req, res) => {
//   const order = await updateOrder(req.body);

//   res.json({
//     order: JSON.stringify(order.result.order),
//   });
// };

// export { updateOrder };
