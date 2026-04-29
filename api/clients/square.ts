import {
  SquareClient as Client,
  SquareEnvironment as Environment,
} from "square";

export default new Client({
  token: process.env.SQUARE_ACCESS_TOKEN,
  logging: {
    silent: true,
  },
  environment:
    process.env.VERCEL_ENV === "production"
      ? Environment.Production
      : Environment.Sandbox,
});
