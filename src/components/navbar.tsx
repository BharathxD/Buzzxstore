"use client";

import Link from "next/link";
import SearchBar from "./search-bar";
import Image from "next/image";
import { FaInstagram } from "react-icons/fa";

const Navbar = () => {
  return (
    <header>
      <div
        className={`flex flex-row items-center justify-center fixed inset-x-0 max-h-[10vh] top-0 z-50 bg-neutral-900 duration-200 border-b border-b-neutral-700`}
      >
        <div className="container flex flex-row-reverse items-center justify-between p-6 mx-auto">
          <div className="inline-flex items-center justify-center gap-3">
            <SearchBar />
            <Link
              className="text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-neutral-800 outline outline-neutral-700 rounded-lg p-1.5 inline-flex items-center justify-center md:gap-2"
              href="https://instagram.com/buzzx.store?igshid=MzMyNGUyNmU2YQ=="
              target="_blank"
            >
              <FaInstagram size={30} className="text-white" />
            </Link>
          </div>
          <Link
            href="/"
            className="duration-200 text-zinc-300 hover:text-zinc-100 font-bold"
          >
            <Image
              alt="BuzzXStore logo"
              src="/assets/logo.png"
              height={100}
              width={100}
              className="object-fit"
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
