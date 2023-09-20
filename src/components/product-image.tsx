import Image from "next/image";

interface ProductImageProps {
  imageUrl: string;
  alt: string;
}

const ProductImage = ({ imageUrl, alt }: ProductImageProps) => {
  return (
    <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden rounded-lg">
      <Image
        className="h-full w-full rounded-lg object-contain"
        sizes="(min-width: 1024px) 66vw, 100vw"
        alt={alt}
        src={imageUrl}
        priority={true}
        fill
      />
    </div>
  );
};

export default ProductImage;
