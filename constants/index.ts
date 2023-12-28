export const DEFAULT_FETCH_INIT = {
  next: { revalidate: 0 },
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export const SQUARE_URL = process.env.SQUARE_ENV
export const CONFIG = {
  square: {
    development: {
      // url: "http://localhost:3000/",
      url: "https://square-backend-stage-ac8a01ff6dd6.herokuapp.com/",
    },
    production: {
      url: "https://square-backend.herokuapp.com/",
    },
    test: {
      url: "",
    },
  },
};

// export { default as SOCIAL_MEDIA_COMPONENT_MAP } from "./SocialMediaComponentMap";
