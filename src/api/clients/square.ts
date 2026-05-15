import {
  SquareClient as Client,
  SquareEnvironment as Environment,
} from "square";

console.log(process.env.SQUARE_ACCESS_TOKEN)
console.log(process.env.VERCEL_ENV)

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
