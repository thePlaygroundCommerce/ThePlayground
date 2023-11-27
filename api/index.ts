export const DEFAULT_INIT: {
  method: string;
  headers?: Headers;
} = {
  method: "POST",
  headers: new Headers({
    "Content-Type": "application/json",
  }),
};
