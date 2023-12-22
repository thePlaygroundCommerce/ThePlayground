"use server"
import { DEFAULT_INIT } from "./";
import { CONFIG } from "../constants"



export async function createCustomer(request: Record<string, FormDataEntryValue>) {
  const fetchUrl = `${
    CONFIG.square[process.env.NODE_ENV].url
  }customers/create`;
  const init = {
    ...DEFAULT_INIT,
    body: JSON.stringify(request),
    next: { revalidate: 60 * 15  }, // TODO must set to appropriate value in prod
  };

  return await fetch(fetchUrl, init)
    .then((res) => res.json())
    .then((data) => data.result)
    .catch((err) => err);
}

export async function callToActionCreateForm(formData: FormData) {

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
