"use client";

import { useRef } from "react";
import Link from "next/link";
import type { Category } from "@prisma/client";
import { ChevronDownIcon } from "lucide-react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { Button } from "./ui/button";

const OtherCategories = ({ categories }: { categories: Category[] }) => {
  const modalRef = useRef(null);
  const triggerClickOutside = () => {
    const outsideElement = document.getElementById("modal-element");
    if (outsideElement) {
      const clickEvent = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      });
      outsideElement.dispatchEvent(clickEvent);
    }
  };
  return (
    <Dialog>
      <DialogTrigger
        className="items-center justify-center gap-2 text-zinc-400 outline-none duration-200 hover:text-zinc-100"
        asChild
      >
        <Button
          id="modal-element"
          variant="link"
          className="inline-flex items-center justify-center text-zinc-400 duration-200 hover:text-zinc-100"
        >
          <span>More</span>
          <ChevronDownIcon />
        </Button>
      </DialogTrigger>
      <DialogContent
        ref={modalRef}
        showClose={false}
        className="max-h-[75vh] w-[80vw] max-w-[90vw] overflow-y-scroll rounded-lg border-neutral-700 bg-neutral-950/80 p-4 backdrop-blur-md md:max-h-[90vh]"
      >
        <div className="grid grid-cols-1 gap-2 md:grid-cols-5">
          {categories.map((item) => {
            return (
              <Link
                key={item.id}
                href={`/category/${item.id}`}
                className="flex items-center justify-center rounded-md border border-neutral-700 bg-neutral-900 p-4 text-center text-xl font-medium text-zinc-200 duration-150 hover:text-zinc-100 group-hover:text-white md:aspect-square lg:text-2xl"
                onClick={triggerClickOutside}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OtherCategories;
