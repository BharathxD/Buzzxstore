import getProducts from "@/actions/getProducts";
import ProductDisplayServer from "@/components/product-display-server";
import ProductSkeleton from "@/components/ui/product-skeleton";
import { Metadata } from "next";
import { Suspense } from "react";

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
