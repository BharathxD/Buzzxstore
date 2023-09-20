"use server";

import { Suspense } from "react";
import getAllProducts from "@/actions/getAllProducts";

import ProductSkeleton from "@/components/ui/product-skeleton";
import ProductDisplayServer from "@/components/product-display-server";

const Home = () => {
  return (
    <Suspense fallback={<ProductSkeleton />}>
      <ProductDisplayServer
        productPromise={() => getAllProducts()}
        isHomepage
      />
    </Suspense>
  );
};

export default Home;
