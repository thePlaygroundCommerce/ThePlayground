import { draftMode } from "next/headers";
import { NextRequest } from "next/server";
import { redirectToPreviewURL } from "@prismicio/next";

import { createClient } from "../../../prismicio";

export async function GET(request: NextRequest) {
  const client = createClient();

  (await draftMode()).enable();

  await redirectToPreviewURL({ client, request });
}
