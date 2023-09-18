import getProducts from "@/actions/getProducts";
import { Carousel } from "@/components/carousel";
import EmptyState from "@/components/not-found";
import ProductSkeleton from "@/components/ui/product-skeleton";
import { Suspense } from "react";

interface ProductsProps {
  params: {
    categoryId: string;
  };
}

const Products = async ({ params: { categoryId } }: ProductsProps) => {
  const products = await getProducts({ categoryId });
  if (!products || products.length === 0) return <EmptyState showReset />;
  return (
    <Suspense fallback={<ProductSkeleton />}>
      <Carousel products={products} />
    </Suspense>
  );
};

export default Products;
