"use server";

import getAllProducts from "@/actions/getAllProducts";
import { Carousel } from "@/components/carousel";
import EmptyState from "@/components/not-found";

interface HomeProps {
  searchParams: {
    category: string;
  };
}

export default async function Home({ searchParams: { category } }: HomeProps) {
  const products = await getAllProducts();
  if (!products || products.length === 0)
    return <EmptyState title="No products found" />;
  return <Carousel products={products} />;
}
