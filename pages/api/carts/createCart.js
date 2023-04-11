const { Client, Environment, ApiError } = require("square");
const { v4: uidv4 } = require("uuid");

const squareClient = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Sandbox,
});

const { ordersApi } = squareClient;

const createOrder = async ({
  itemVariationID,
  itemModifierID,
  quantity,
  userCookie,
  state,
}) => {
  try {
    const response = await ordersApi.createOrder({
      order: {
        locationId: "LFX4KWJMYHQZ3",
        referenceId: userCookie, //set to cookie
        state: state,
        lineItems: [
          {
            quantity: quantity,
            catalogObjectId: itemVariationID,
          },
        ],
      },
      idempotencyKey: uidv4(),
    });

    console.log(response.result);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default async (req, res) => {
  const order = await createOrder({
    ...req.body,
    userCookie: req.cookies.cartRefID,
  });

  res.json({ cart: order });

};

export { createOrder };
