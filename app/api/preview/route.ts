import { draftMode } from "next/headers";
import { NextRequest } from "next/server";
import { redirectToPreviewURL } from "@prismicio/next";
import { client } from "api/clients";

export async function GET(request: NextRequest) {

  (await draftMode()).enable();

  await redirectToPreviewURL({ client: await client, request });
}
