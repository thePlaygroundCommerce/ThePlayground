// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { stringifyBigIntReplacer } from "util/jsonUtils";
import { squareClient } from "..";
const { v4: uidv4 } = require("uuid");

const getCheckoutURL = async (order) => {
  try {
    const { id, orderId, ...rest } = await squareClient.checkoutApi
      .createPaymentLink({
        idempotencyKey: uidv4(),
        order: { locationId: "LFX4KWJMYHQZ3", lineItems: order.lineItems },
        checkoutOptions: { redirectUrl: "http://localhost:3000/checkout/" },
      })
      .then((res) => res.result.paymentLink);

    const updateResponse = await squareClient.checkoutApi.updatePaymentLink(
      id,
      {
        paymentLink: {
          ...rest,
          checkoutOptions: {
            redirectUrl: "http://localhost:3000/checkout/" + orderId,
          },
        },
      }
    );

    return updateResponse.result;
  } catch (error) {
    console.log(error);
  }
};

export default async (req, res) => {
  const body = JSON.parse(req.body);
  const { paymentLink } = await getCheckoutURL(body);

  res.json({
    paymentLink: JSON.stringify(paymentLink, stringifyBigIntReplacer),
  });
};

export { getCheckoutURL };
