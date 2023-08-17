export default {
  DEFAULT_FETCH_INIT: {
    next: { revalidate: 0 },
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  },
};
