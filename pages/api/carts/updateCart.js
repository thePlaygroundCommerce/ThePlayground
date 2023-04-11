const { Client, Environment, ApiError } = require("square");
const { v4: uidv4 } = require("uuid");

const squareClient = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Sandbox,
});

const { ordersApi } = squareClient;

const updateOrder = async ({
  itemVariationID,
  itemModifierID,
  quantity,
  userCookie,
  state,
}) => {
  try {
    const response = await ordersApi.updateOrder({
      order: {
        locationId: "LFX4KWJMYHQZ3",
        state: state,
        lineItems: [
          {
            quantity: quantity,
            catalogObjectId: itemVariationID,
            modifiers: [
              {
                catalogObjectId: itemModifierID,
              },
            ],
            // appliedDiscounts: [
            //   {
            //     discountUid: 'one-dollar-off'
            //   }
            // ]
          },
        ],
      },
      idempotencyKey: uidv4(),
    });

    console.log("hello");
    // console.log(response.result);
  } catch (error) {
    console.log(error);
  }
};

export default async (req, res) => {
  const order = await updateOrder(req.body);

  res.json({ cart: order });

  // //if no cartOrder is present create one
  // createOrder(catalogOrder)
  // //else update cartOrder
  // updateOrder(catalogOrder)
};

export { updateOrder };
