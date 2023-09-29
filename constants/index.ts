export const DEFAULT_FETCH_INIT = {
  next: { revalidate: 0 },
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};
export const CONFIG = {
  square: {
    development: {
      url: "http://localhost:3000/",
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
