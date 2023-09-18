import clsx from "clsx";

const Price = ({
  amount,
  className,
}: {
  amount: string;
  className?: string;
} & React.ComponentProps<"p">) => (
  <p suppressHydrationWarning={true} className={className}>
    <span className={clsx("ml-1 inline")}>&#x20B9;</span>
    <span>{amount}</span>
  </p>
);

export default Price;
