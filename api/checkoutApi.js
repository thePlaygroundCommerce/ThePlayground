

async function getOrderAndCatalogObjects(orderId) {
  try {
    const { order } = await fetch(
      process.env.square[process.env.NODE_ENV].url + "checkout/order/" + orderId, { next: { revalidate: 0} }
    )
      .then((res) => res.json())
      .then(({ result }) => result)
      .catch((err) => err);

    const lineItemsCatalogIdList = order.lineItems.map(
      (item) => item.catalogObjectId
    );

    const objects = await fetch(
      process.env.square[process.env.NODE_ENV].url + "catalog",
      {
        next: { revalidate: 0 },
        method: "POST",
        body: JSON.stringify({
          objectIds: lineItemsCatalogIdList,
          includeRelatedObjects: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .catch((err) => err);
    return {
      order,
      objects,
    };
  } catch (error) {
    return {
      error: error.result,
    };
  }
}

async function getCheckoutUrl(lineItems) {
  return await fetch(
    process.env.square[process.env.NODE_ENV].url + "checkout",
    {
      next: { revalidate: 0 },
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        order: { lineItems },
        checkoutOptions: { redirectUrl: "http://localhost:3005/checkout/" },
      }),
    }
  )
    .then((res) => res.json())
    .then(({ result }) => result.paymentLink.url)
    .catch((err) => console.error(err));
}

module.exports = {
  getOrderAndCatalogObjects,
  getCheckoutUrl,
};
