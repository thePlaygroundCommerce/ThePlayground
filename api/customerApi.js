"use server"

const { DEFAULT_INIT } = require("./")

async function createCustomer(request) {
  const fetchUrl = `${
    process.env.square[process.env.NODE_ENV].url
  }customers/create`;
  const init = {
    ...DEFAULT_INIT,
    body: JSON.stringify(request),
    next: { revalidate: 60 * 15  }, // TODO must set to appropriate value in prod
  };

  return await fetch(fetchUrl, init)
    .then((res) => res.json())
    .then((data) => data.result)
    .catch((err) => err);
}


module.exports = {
  createCustomer,
};
