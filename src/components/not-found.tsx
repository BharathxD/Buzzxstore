"use client";

import { useRouter } from "next/navigation";
import { FC } from "react";
import Heading from "./heading";
import { Button } from "./ui/button";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
  resetLabel?: string;
}

const EmptyState: FC<EmptyStateProps> = ({
  title = "No products found with the given category",
  subtitle = "Try changing category",
  showReset,
  resetLabel = "Reset the category",
}) => {
  const router = useRouter();
  return (
    <div className="h-[70vh] flex flex-col gap-2 justify-center items-center">
      <Heading title={title} subtitle={subtitle} center />
      <div className="w-48 mt-4 flex items-center justify-center">
        {showReset && (
          <Button onClick={() => router.push("/")} variant="outline">
            {resetLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
