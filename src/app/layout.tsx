import { ensureStartsWith } from "@/lib/utils";
import Navbar from "@/components/navbar";
import { Poppins } from "next/font/google";
import { ReactNode, Suspense } from "react";
import "./globals.css";
import RtkProvider from "@/providers/rtk-provider";
import SecondaryNav from "@/components/secondary-nav";
import getCategories from "@/actions/getCategories";

const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME } = process.env;
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "http://localhost:3000";
const twitterCreator = TWITTER_CREATOR
  ? ensureStartsWith(TWITTER_CREATOR, "@")
  : undefined;
const twitterSite = TWITTER_SITE
  ? ensureStartsWith(TWITTER_SITE, "https://")
  : undefined;

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`,
  },
  robots: {
    follow: true,
    index: true,
  },
  ...(twitterCreator &&
    twitterSite && {
      twitter: {
        card: "summary_large_image",
        creator: twitterCreator,
        site: twitterSite,
      },
    }),
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
