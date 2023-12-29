export const DEFAULT_FETCH_INIT = {
  next: { revalidate: 0 },
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export const SQUARE_URL = process.env.NEXT_PUBLIC_SQUARE_ENV


// export { default as SOCIAL_MEDIA_COMPONENT_MAP } from "./SocialMediaComponentMap";
