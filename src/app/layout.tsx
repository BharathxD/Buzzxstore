import { Suspense, type ReactNode } from "react";
import { Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import Navbar from "@/components/navbar";

import "./globals.css";

import { type Metadata } from "next";

import RtkProvider from "@/providers/rtk-provider";
import siteConfig from "@/config/site";
import Footer from "@/components/footer";
import SecondaryNav from "@/components/secondary-nav";

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
    "Best selling smartphone",
    "Best phones",
    "Best mobiles",
    "Best smartphones",
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
    images: [siteConfig.ogImage],
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
  return (
    <html lang="en" className={poppins.className}>
      <body className="bg-neutral-900 text-black selection:bg-teal-300 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white ">
        <RtkProvider>
          <Navbar />
          <SecondaryNav />
          <Suspense>
            <main className="mb-10 mt-[20vh] flex flex-col items-center justify-between px-5 md:px-20">
              {children}
            </main>
          </Suspense>
          <Footer />
        </RtkProvider>
        <Analytics />
      </body>
    </html>
  );
}
