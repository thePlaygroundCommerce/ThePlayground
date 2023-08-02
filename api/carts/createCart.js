// const { Client, Environment, ApiError } = require("square");
// const { v4: uidv4 } = require("uuid");

// const squareClient = new Client({
//   accessToken: process.env.SQUARE_ACCESS_TOKEN,
//   environment: Environment.Sandbox,
// });

// const { ordersApi } = squareClient;

// const createOrder = async ({
//   catalogObjectId,
//   quantity,
//   state = "DRAFT",
// }) => {
//   try {
//     const response = await ordersApi.createOrder({
//       order: {
//         locationId: "LFX4KWJMYHQZ3",
//         state: state,
//         lineItems: [
//           {
//             quantity: quantity,
//             catalogObjectId: catalogObjectId,
//           },
//         ],
//       },
//       idempotencyKey: uidv4(),
//     });

//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export default async (req, res) => {

//   const order = await createOrder({
//     ...req.body,
//   });

//   res.json({ order: JSON.stringify(order.result.order) });

// };

// export { createOrder };
