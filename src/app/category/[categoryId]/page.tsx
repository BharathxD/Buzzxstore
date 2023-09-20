import { Suspense } from "react";
import type { Metadata } from "next";
import getProducts from "@/actions/getProducts";

import ProductSkeleton from "@/components/ui/product-skeleton";
import ProductDisplayServer from "@/components/product-display-server";

interface CategoryProps {
  params: {
    categoryId: string;
  };
}

export const metadata: Metadata = {
  title: "Buzzxstore | Categories",
  description:
    "Explore a wide range of products in this category at Buzzxstore. Find the latest and greatest items to suit your needs.",
};

const Category = async ({ params: { categoryId } }: CategoryProps) => {
  return (
    <Suspense fallback={<ProductSkeleton />}>
      <ProductDisplayServer
        productPromise={() => getProducts({ categoryId })}
      />
    </Suspense>
  );
};

export default Category;
