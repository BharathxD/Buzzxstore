import getProducts from "@/actions/getProducts";
import CarouselServer from "@/components/carousel-server";
import ProductSkeleton from "@/components/ui/product-skeleton";
import { Suspense } from "react";

interface ProductsProps {
  params: {
    categoryId: string;
  };
}

const Products = async ({ params: { categoryId } }: ProductsProps) => {
  return (
    <Suspense fallback={<ProductSkeleton />}>
      <CarouselServer productPromise={() => getProducts({ categoryId })} />
    </Suspense>
  );
};

export default Products;
