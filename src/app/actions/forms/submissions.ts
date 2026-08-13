"use server";

import * as z from "zod";
import { Forminit } from "forminit";
import { MdOutlineBluetoothConnected } from "react-icons/md";
import { redirect } from "next/navigation";
import { convertServerPatchToFullTree } from "next/dist/client/components/segment-cache/navigation";

const TravelLeadSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  activity: z.string(),
  email: z.email(),
  phone: z.coerce.number(),
  postcode: z.coerce.number(),
});

export const submitTravelLeadForm = async (formData: FormData) => {
  const FORM_ID = formData.get("formId");
  let redir: boolean;

  if (!FORM_ID || typeof FORM_ID !== "string") throw Error("Invalid form id!");

  // 1. Convert FormData to a standard key-value object
  const rawData = Object.fromEntries(formData.entries());

  // 2. Create an empty, fresh FormData instance
  const cleanFormData = new FormData();

  // 3. Loop and append only non-Next.js internal fields
  for (let [key, value] of Object.entries(rawData)) {
    if (key.startsWith("fi")) {
      // value is a FormDataEntryValue (string or File)
      if (key.includes("phone")) value = "+1" + (value as string);
      cleanFormData.append(key, value);
    }
  }

  try {
    TravelLeadSchema.parse(cleanFormData);
  } catch (error) {
    console.error(error);
    redir = true;
  }



  if (redir) return redirect("?error=Invalid form input! Please try again.");

  const { error } = await new Forminit({
    apiKey: process.env.FORMINIT_API_KEY,
  }).submit(FORM_ID, cleanFormData);

  if (error) {
    console.error(error, error.message);
  }
};

export const submitNewsletterForm = async (data: FormData) => {
  const PORTAL_ID = process.env.HUBSPOT_PORTAL_ID ?? "246922784";
  const FORM_ID = data.get("formId") ?? "645d1e4a-51a5-42a1-a9fe-6662ff718593";

  const hubspotUrl = `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_ID}`;

  const payload = {
    fields: [
      {
        objectTypeId: "0-1",
        name: "email",
        value: "matthewmckenzie446.com",
      },
      //   { objectTypeId: "0-1", name: "firstName", value: "Matthew" },
      { objectTypeId: "0-1", name: "lastName", value: "McKenzie" },
    ],
  };

  fetch(hubspotUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
    .then((res) => {
      console.log(data, res, FORM_ID, PORTAL_ID);
      return res.json();
    })
    .then((data) => console.log(data));
};
