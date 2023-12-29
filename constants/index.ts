export const DEFAULT_FETCH_INIT = {
  next: { revalidate: 0 },
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export const SQUARE_URL = process.env.SQUARE_URL
