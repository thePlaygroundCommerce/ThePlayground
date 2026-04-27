import {
  SquareClient as Client,
  SquareEnvironment as Environment,
} from "square";

export default new Client({

  token: process.env.SQUARE_ACCESS_TOKEN,
  logging: {
    silent: false,
  },
  environment:
    process.env.NODE_ENV === "production"
      ? Environment.Production
      : Environment.Sandbox,
});
