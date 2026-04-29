"use server";

import {
  CreateCustomerRequest,
  CreateCustomerResponse,
  GetCustomerResponse,
  SearchCatalogItemsRequest,
  SearchCustomersRequest,
  UpdateCustomerRequest,
} from "square";
import { DEFAULT_FETCH_INIT, SQUARE_URL } from "../constants";
import { redirect } from "next/navigation";
import { mapArrayToMap, formatNavigationLinks } from "util/index";
import { getCatalogInfo, searchItems } from "./catalogApi";
import Mailgun from "mailgun.js";
import formdata from "form-data";
import square from "./clients/square";

export const getCategoryProducts = async (category: string) => {
  const formattedCategory = formatNavigationLinks(category);
  const { categoryNameMap } = await getCatalogInfo();
  const id = categoryNameMap[formattedCategory];
  const searchPayload: SearchCatalogItemsRequest = {};

  if (!category) searchPayload.categoryIds = [];
  else if (!id) return redirect("/shop");
  else searchPayload.categoryIds = [id];

  const { objects = [] } = await searchItems(searchPayload).catch((err) => {
    console.log(err);
    return { objects: [] };
  });

  return mapArrayToMap(objects);
};

export type RegisterCustomerRequest = {
  emailAddress: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
};

const api = square.customers;

export async function registerCustomer(
  request: RegisterCustomerRequest,
): Promise<CreateCustomerResponse> {
  const { emailAddress, firstName, lastName, phoneNumber } = request;
  let opResult: CreateCustomerResponse = {
    errors: [],
  };

  const searchRequest: SearchCustomersRequest = {
    query: {
      filter: {
        emailAddress: { exact: emailAddress },
        ...(phoneNumber ? { phoneNumber: { exact: phoneNumber } } : {}),
      },
    },
  };

  const { customers, errors } = await api.search(searchRequest);

  if (!customers?.length) {
    const createRequest: CreateCustomerRequest = {
      emailAddress,
      givenName: firstName,
      familyName: lastName,
      phoneNumber,
    };

    opResult = await api.create(createRequest);
  } else {
    opResult = {
      customer: customers[0],
      errors,
    };
  }

  return opResult;
}

export const sendEmail = async ({
  email,
  name,
  message,
}: {
  [id: string]: string;
}) => {
  const mailgun = new Mailgun(formdata).client({
    username: "api",
    key: process.env.MAILGUN_API_KEY ?? "",
  });

  // send mail with defined transport object
  const info = await mailgun.messages.create(
    "sandboxc9209b0f5c7c42269e920a500fec8982.mailgun.org",
    {
      from: "The Playground Team <postmaster@sandboxc9209b0f5c7c42269e920a500fec8982.mailgun.org>",
      to: ["theplaygroundmedia@outlook.com", "matthewmckenzie446@gmail.com"],
      subject: `Contact Inquiry from a Playground User: ${name}`,
      text: message,
      // html: "<h1>Testing some Mailgun awesomness!</h1>",
    },
  );

  console.log("Message sent: %s", info);
};

export async function getCustomer(id: string): Promise<GetCustomerResponse> {
  return api.get({ customerId: id });
}

export async function callToActionCreateForm(req: RegisterCustomerRequest) {
  return await registerCustomer(req);
}

// class CustomerController {
//   customersApi = square.customers;

//   async getCustomer(customerId: string) {
//     return await this.customersApi.get({ customerId });
//   }

//   async deleteCustomer({ customerId }: { customerId: string }) {
//     return await this.customersApi.delete({ customerId });
//   }

//   async updateCustomer(req: UpdateCustomerRequest) {
//     return await this.customersApi.update(req);
//   }

//   async searchCustomers(body: SearchCustomersRequest) {
//     const res = await this.customersApi.search(body);
//   }

//   async createCustomer(@Body() newCustomer: CreateCustomerRequest) {
//     return await this.customersApi.createCustomer(newCustomer);
//   }

//   async registerCustomer(
//     @Body()
//     {
//       emailAddress,
//       phoneNumber,
//     }: {
//       emailAddress: string;
//       firstName?: string;
//       lastName?: string;
//       phoneNumber?: string;
//     },
//   ) {
//     let opResult: CreateCustomerResponse = {
//       errors: [],
//     };

//     const {
//       result: { customers, ...rest },
//     } = await this.customersApi.searchCustomers({
//       query: {
//         filter: {
//           emailAddress: { exact: emailAddress },
//           phoneNumber: { exact: phoneNumber },
//         },
//       },
//     });

//     if (!customers) {
//       const { result } = await this.customersApi.createCustomer({
//         emailAddress,
//         phoneNumber,
//       });

//       opResult = result;
//     } else {
//       opResult = {
//         customer: customers[0],
//         ...rest,
//       };
//     }

//     return opResult;
//   }
// }
