"use client";

import Image from "next/image";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";

import SearchBar from "./search-bar";

const Navbar = () => {
  return (
    <header>
      <div
        className={`fixed inset-x-0 top-0 z-50 flex max-h-[10vh] flex-row items-center justify-center border-b border-b-neutral-700 bg-neutral-900 duration-200`}
      >
        <div className="container mx-auto flex flex-row-reverse items-center justify-between p-6">
          <div className="inline-flex items-center justify-center gap-3">
            <SearchBar />
            <Link
              className="inline-flex items-center justify-center rounded-lg bg-neutral-800 p-1.5 text-sm font-medium outline outline-neutral-700 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 md:gap-2"
              href="https://instagram.com/buzzx.store?igshid=MzMyNGUyNmU2YQ=="
              target="_blank"
            >
              <FaInstagram size={30} className="text-white" />
            </Link>
          </div>
          <Link
            href="/"
            className="font-bold text-zinc-300 duration-200 hover:text-zinc-100"
          >
            <Image
              alt="BuzzXStore logo"
              src="/assets/logo.png"
              height={100}
              width={100}
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
