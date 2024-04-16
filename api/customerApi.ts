"use server"

import { DEFAULT_FETCH_INIT, SQUARE_URL } from "../constants"

export async function createCustomer(request: Record<string, FormDataEntryValue>) {
  const fetchUrl = `${
    SQUARE_URL
  }customers/create`;
  const init = {
    ...DEFAULT_FETCH_INIT,
    body: JSON.stringify(request),
    next: { revalidate: 60 * 15  }, // TODO must set to appropriate value in prod
  };

  return await fetch(fetchUrl, init)
    .then((res) => res.json())
    .then((data) => data.result)
    .catch((err) => err);
}

export async function callToActionCreateForm(state: any, formData: FormData) {

  const request: Record<string, FormDataEntryValue> = {};
  for (const [key, value] of formData.entries()) {
    request[key] = value;
  }
  
  await createCustomer(request);
  return {
    isSubmitted: true,
    error: null
  }
}
