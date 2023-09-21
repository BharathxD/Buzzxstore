"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home } from "lucide-react";

import { cn } from "@/lib/utils";

const HomeButton = () => {
  const pathname = usePathname();
  return (
    <Link href="/" className="border-r border-r-neutral-700 pr-4">
      <Home
        className={cn(
          "cursor-pointer text-zinc-400 duration-200 hover:text-zinc-100",
          pathname === "/" && "text-zinc-100"
        )}
      />
    </Link>
  );
};

export default HomeButton;
