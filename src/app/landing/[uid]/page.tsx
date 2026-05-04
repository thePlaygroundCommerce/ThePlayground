import type { Metadata } from "next";
import { SliceZone } from "@prismicio/react";
import { components } from "@/app/slices";
import { client } from "@/api/clients";
import { notFound } from "next/navigation";

type LANDING_URL = "/landing/[uid]"

export default async function Page({ params }: PageProps<LANDING_URL>) {
  const { uid } = await params;
  const page = await client.getByUID("product_landing_page", uid).catch(notFound);

  return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateMetadata({
  params,
}: PageProps<LANDING_URL>): Promise<Metadata> {
  const { uid } = await params;
  const page = await client.getByUID("product_landing_page", uid);

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: page.data.meta_image.url ?? "" }],
    },
  };
}

export async function generateStaticParams() {
  const pages = await client.getAllByType("product_landing_page");

  return pages.map((page) => ({ uid: page.uid }));
}