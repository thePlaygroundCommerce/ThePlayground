"use server";

import {
  ApiResponse,
  CreateCustomerRequest,
  CreateCustomerResponse,
  Customer,
  RetrieveCustomerResponse,
  SearchCatalogItemsRequest,
} from "square";
import { DEFAULT_FETCH_INIT, SQUARE_URL } from "../constants";
import { redirect } from "next/navigation";
import { mapArrayToMap, formatNavigationLinks } from "util/index";
import { getCatalogInfo, searchItems } from "./catalogApi";

export const searchCatalogItems = async (category: string) => {
  const formattedCategory = formatNavigationLinks(category);
  const { categoryNameMap } = await getCatalogInfo();
  const id = categoryNameMap[formattedCategory];
  const searchPayload: SearchCatalogItemsRequest = {};

  if (!category) searchPayload.categoryIds = [];
  else if (!id) return redirect("/shop");
  else searchPayload.categoryIds = [id];

  const { objects = [] } = await searchItems(searchPayload);

  return mapArrayToMap(objects);
};

export type RegisterCustomerRequest = {
  emailAddress: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
};
export async function registerCustomer(
  request: RegisterCustomerRequest
): Promise<ApiResponse<CreateCustomerResponse>> {
  const fetchUrl = `${SQUARE_URL}customers/register`;
  const init = {
    ...DEFAULT_FETCH_INIT,
    body: JSON.stringify(request),
    next: { revalidate: 60 * 15 }, // TODO must set to appropriate value in prod
  };

  return await fetch(fetchUrl, init)
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => err);
}

export async function getCustomer(
  id: string
): Promise<ApiResponse<RetrieveCustomerResponse>> {
  const fetchUrl = `${SQUARE_URL}customers/${id}`;

  return await fetch(fetchUrl)
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => err);
}

export async function callToActionCreateForm(req: RegisterCustomerRequest) {
  return await registerCustomer(req);
}
