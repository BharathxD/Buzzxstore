import siteConfig from "@/config/site";
import database from "@/lib/database";

type ReturnType = {
  url: string;
  lastModified: string;
};

/**
 * Fetches the data needed for generating the sitemap.
 * @returns {Promise<{ posts: PostData[], forums: ForumData[], users: UserData[] }>} The fetched data.
 */
const getSitemapData = async (): Promise<{
  categories: ReturnType[];
  products: ReturnType[];
}> => {
  const categories = await database.category.findMany({});
  const products = await database.product.findMany({});

  return {
    categories: categories.map((category) => ({
      url: `${siteConfig.url}/category/${category.id}`,
      lastModified: new Date().toISOString(),
    })),
    products: products.map((product) => ({
      url: `${siteConfig.url}/product/${product.id}`,
      lastModified: new Date().toISOString(),
    })),
  };
};

export default getSitemapData;
