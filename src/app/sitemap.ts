import type { MetadataRoute } from "next";
import { universes } from "@/universes";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: SITE }, ...universes.map((u) => ({ url: `${SITE}/${u.slug}` }))];
}
