import { ensureStartsWith } from "@/lib/utils";
import Navbar from "@/components/navbar";
import { Poppins } from "next/font/google";
import { ReactNode, Suspense } from "react";
import "./globals.css";
import RtkProvider from "@/providers/rtk-provider";
import SecondaryNav from "@/components/secondary-nav";
import getCategories from "@/actions/getCategories";
import { Metadata } from "next";
import siteConfig from "@/config/site";

/**
 * Metadata object for the Next.js page.
 * @type {Metadata}
 * @see {@link https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function}
 */
export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  // Icon URLs for various platforms
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-32x32.png",
  },
  description: siteConfig.description,
  // Keywords relevant to the website's content
  keywords: [
    "Online Shopping",
    "Affiliate Store",
    "Retailer Products",
    "One-Stop Shopping",
    "Online Retailers",
    "Shopping Destination",
    "Product Variety",
    "Top Brands",
    "Convenient Shopping",
    "Buzzxstore",
  ],
  // Authors and creator information
  authors: [
    {
      name: "Buzzxstore",
      url: "https://instagram.com/buzzx.store?igshid=MzMyNGUyNmU2YQ==",
    },
  ],
  creator: "Buzzxstore",
  // Theme color options based on user's color scheme preference
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "black" }],
  // OpenGraph metadata for social media sharing
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  // Twitter card metadata for Twitter sharing
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/images/opengraph-image.jpg`],
    creator: "@Bharath_uwu",
  },
};

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const categories = await getCategories();
  return (
    <html lang="en" className={poppins.className}>
      <body className="text-black selection:bg-teal-300 bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white ">
        <RtkProvider>
          <Navbar />
          <SecondaryNav />
          <Suspense>
            <main className="flex flex-col items-center justify-between mt-[20vh] mb-10 px-5 md:px-20">
              {children}
            </main>
          </Suspense>
        </RtkProvider>
      </body>
    </html>
  );
}
