"use client";

import type { FC } from "react";
import { useRouter } from "next/navigation";

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
    <div className="flex h-[70vh] flex-col items-center justify-center gap-2">
      <Heading title={title} subtitle={subtitle} center />
      <div className="mt-4 flex w-48 items-center justify-center">
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
