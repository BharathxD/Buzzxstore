"use server";

import getAllProducts from "@/actions/getAllProducts";
import ProductDisplayServer from "@/components/product-display-server";
import ProductSkeleton from "@/components/ui/product-skeleton";
import { Suspense } from "react";

interface HomeProps {
  searchParams: {
    category: string;
  };
}

export default async function Home({ searchParams: { category } }: HomeProps) {
  return (
    <Suspense fallback={<ProductSkeleton />}>
      <ProductDisplayServer
        productPromise={() => getAllProducts()}
        isHomepage
      />
    </Suspense>
  );
}
