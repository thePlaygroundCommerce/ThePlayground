export const DEFAULT_FETCH_INIT: {
  next?: any;
  method: "POST" | "PUT" | "GET";
  headers?: Headers;
} = {
  next: { revalidate: process.env.NODE_ENV == "production" ? 21600 : 0 },
  method: "POST",
  headers: new Headers({
    "Content-Type": "application/json",
  }),
};

export const SQUARE_URL = process.env.SQUARE_URL;
