import getProducts from "@/actions/getProducts";
import { Carousel } from "@/components/carousel";
import EmptyState from "@/components/not-found";

interface ProductsProps {
  params: {
    categoryId: string;
  };
}

const Products = async ({ params: { categoryId } }: ProductsProps) => {
  const products = await getProducts({ categoryId });
  if (!products || products.length === 0) return <EmptyState showReset />;
  return <Carousel products={products} />;
};

export default Products;
