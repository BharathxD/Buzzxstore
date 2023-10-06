type SiteConfig = {
  name: string;
  description: string;
  keywords: string[],
  url: string;
  copyrights: number;
  ogImage: string;
};

/**
 * Configuration object for the DevCircle website.
 * @type {SiteConfig}
 * @property {string} name - The name of the website
 * @property {string} description - A brief description of the website.
 * @property {string} url - The URL of the website.
 * @property {number} copyrights - The copyright year for the website content.
 * @property {string} ogImage - The URL of the OpenGraph image for social media sharing.
 */
const siteConfig: SiteConfig = {
  name: "Buzzxstore",
  description:
    "Explore Buzzxstore, your ultimate destination for online shopping! As a trusted affiliate store, we offer a wide range of products from top online retailers, providing you with a convenient one-stop shopping experience. Discover an extensive selection of items from your favorite brands today.",
  keywords: [
    "buzzxstore.in",
    "buzzxstore",
    "Online Shopping",
    "online shopping india",
    "india shopping online",
    "buzzxstore india",
    "buzzx",
    "buy online",
    "buy mobiles online",
    "buy books online",
    "buy movie dvd's online",
    "kindle",
    "kindle fire hd",
    "kindle e-readers",
    "ebooks",
    "computers",
    "laptop",
    "toys",
    "trimmers",
    "watches",
    "fashion jewellery",
    "home",
    "kitchen",
    "small appliances",
    "beauty",
    "Sports",
    "Fitness & Outdoors"
  ],
  url: "https://buzzxstore.in",
  copyrights: 2023,
  ogImage: "https://buzzxstore.in/assets/opengraph-image.jpg",
};

export default siteConfig;
