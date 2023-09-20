import clsx from "clsx";

import Price from "./price";

const Label = ({
  title,
  amount,
  position = "bottom",
}: {
  title: string;
  amount: string;
  position?: "bottom" | "center";
}) => {
  return (
    <div
      className={clsx("@container/label mt-4 flex w-full rounded-lg", {
        "lg:px-20 lg:pb-[35%]": position === "center",
      })}
    >
      <div className="flex w-full items-center text-white">
        <h3 className="mr-4 line-clamp-2 grow px-2 text-lg tracking-tight">
          {title}
        </h3>
        <Price
          className="flex h-full items-center justify-center rounded-md bg-blue-600 p-4 text-white"
          amount={amount}
        />
      </div>
    </div>
  );
};

export default Label;
