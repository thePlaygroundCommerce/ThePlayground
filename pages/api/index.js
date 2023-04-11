// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const { Client, Environment, ApiError } = require("square");

const squareClient = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Sandbox,
});

// export const { catalogApi, ordersApi } = squareClient;

export { squareClient, ApiError }
export { cartApi as default } from './carts'
