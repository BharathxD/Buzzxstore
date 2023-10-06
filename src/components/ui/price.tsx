import clsx from "clsx";

import { cn } from "@/lib/utils";

const Price = ({
  amount,
  mrp,
  off,
  className,
  isProductPage = false,
}: {
  amount: number;
  mrp?: string;
  off?: string;
  className?: string;
  isProductPage?: boolean;
} & React.ComponentProps<"div">) =>
  isProductPage ? (
    <div
      suppressHydrationWarning={true}
      className={cn("flex flex-col gap-2", className)}
    >
      <div className="flex flex-row gap-2">
        <span className={clsx("inline")}>
          &#x20B9;
          {amount}
        </span>
        <span className="h-fit w-fit rounded-md border border-zinc-600 bg-zinc-700 px-1 text-base">
          {off}%
        </span>
      </div>
      <span className="w-fit rounded-md px-1 text-base line-through">
        &#x20B9;{mrp}
      </span>
    </div>
  ) : (
    <span className={clsx("inline")}>
      &#x20B9;
      {amount}
    </span>
  );

export default Price;
