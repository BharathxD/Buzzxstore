import { Suspense } from "react";
import type { Metadata } from "next";
import getProduct from "@/actions/getProduct";

import siteConfig from "@/config/site";
import ProductPageSkeleton from "@/components/ui/product-page-skeleton";
import ProductServer from "@/components/product-server";

interface ProductsProps {
  params: {
    productId: string;
  };
}

const generateMetadata = async ({
  params: { productId },
}: ProductsProps): Promise<Metadata> => {
  if (!productId)
    return {
      title: "Not Found - Product Not Found",
      description:
        "We apologize, but the product you are searching for could not be found.",
    };

  const product = await getProduct({ productId });
  const siteUrl = siteConfig.url;

  const productName = product?.name;
  const productDescription = product?.description;

  if (!product || !productName) {
    return {
      title: "Not Found - Product Not Found",
      description:
        "We apologize, but the product you are searching for could not be found.",
    };
  }

  const ogUrl = new URL(`${siteUrl}/api/og`);
  ogUrl.searchParams.set("title", product.name);

  const metadata = {
    title: productName,
    description: productDescription,
    authors: {
      name: siteConfig.name,
    },
    openGraph: {
      title: productName,
      description: productDescription,
      url: `${siteConfig.url}/product/${product.id}`,
      images: [
        {
          url: ogUrl.toString(),
          width: 800,
          height: 400,
          alt: productName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: productName,
      description: productDescription,
      images: [ogUrl.toString()],
    },
  };

  return metadata;
};

const Products = async ({ params: { productId } }: ProductsProps) => {
  return (
    <Suspense fallback={<ProductPageSkeleton />}>
      <ProductServer productPromise={() => getProduct({ productId })} />
    </Suspense>
  );
};

export { generateMetadata };
export default Products;
