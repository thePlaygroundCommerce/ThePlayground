import type { MetadataRoute } from "next";
import { getCatalogInfo, searchItems } from "@/api/catalogApi";
import { client } from "@/api/clients";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://theplaygroundtravel.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // --- Static routes ---
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/shop`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/explore`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/log`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/faqs`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/returns`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/shipping`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/terms-and-conditions`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/work`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];

  // --- Dynamic: category pages ---
  let categoryRoutes: MetadataRoute.Sitemap = [];
  try {
    const { categoryNameMap } = await getCatalogInfo();
    categoryRoutes = Object.keys(categoryNameMap).map((name) => ({
      url: `${BASE_URL}/shop/${encodeURIComponent(name.trim().replace(/ /g, "").toLowerCase())}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch {
    // catalog unavailable — skip category routes
  }

  // --- Dynamic: product pages ---
  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const { objects = [] } = await searchItems({});
    productRoutes = objects
      .filter((obj) => obj.type === "ITEM" && obj.id)
      .map((obj) => ({
        url: `${BASE_URL}/shop/product/${obj.id}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));
  } catch {
    // catalog unavailable — skip product routes
  }

  // --- Dynamic: blog posts ---
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const blogs = await client.getAllByType("blog_post");
    blogRoutes = blogs.map((blog) => ({
      url: `${BASE_URL}/log/${blog.uid}`,
      lastModified: new Date(blog.last_publication_date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch {
    // Prismic unavailable — skip blog routes
  }

  return [...staticRoutes, ...categoryRoutes, ...productRoutes, ...blogRoutes];
}
