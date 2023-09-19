import getProducts from "@/actions/getProducts";
import ProductDisplayServer from "@/components/product-display-server";
import ProductSkeleton from "@/components/ui/product-skeleton";
import { Suspense } from "react";

interface CategoryProps {
  params: {
    categoryId: string;
  };
}

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
