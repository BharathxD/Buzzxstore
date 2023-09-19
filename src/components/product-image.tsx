import Image from "next/image";

interface ProductImageProps {
  imageUrl: string;
  alt: string;
}

const ProductImage = ({ imageUrl, alt }: ProductImageProps) => {
  return (
    <div className="relative aspect-square w-full h-full max-h-[550px] overflow-hidden rounded-lg">
      <Image
        className="h-full w-full object-contain rounded-lg"
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
