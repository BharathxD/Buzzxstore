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
      className={clsx("flex rounded-lg w-full @container/label mt-4", {
        "lg:px-20 lg:pb-[35%]": position === "center",
      })}
    >
      <div className="flex items-center w-full text-white">
        <h3 className="mr-4 px-2 line-clamp-2 flex-grow leading-2 text-lg tracking-tight">
          {title}
        </h3>
        <Price
          className="flex items-center justify-center bg-blue-600 rounded-md h-full p-4 text-white"
          amount={amount}
        />
      </div>
    </div>
  );
};

export default Label;
