import type { MetadataRoute } from "next";
import getSitemapData from "@/actions/getSiteMapData";

import siteConfig from "@/config/site";

/**
 * Generates the sitemap for the website.
 * @returns {Promise<MetadataRoute.Sitemap>} The sitemap data.
 */
export default async function generateSitemap(): Promise<MetadataRoute.Sitemap> {
    const { categories, products } = await getSitemapData();

    return [...categories, ...products];
}
