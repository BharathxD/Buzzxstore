import siteConfig from "@/config/site";

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate =
    siteConfig.copyrights + (currentYear > 2023 ? `-${currentYear}` : "");
  const copyrightName = siteConfig.name;

  return (
    <footer className="text-sm text-neutral-400">
      <div className="border-t border-neutral-700 py-6 text-sm">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-1 px-4 md:flex-row md:gap-0 md:px-4 min-[1320px]:px-0">
          <p>
            &copy; {copyrightDate} {copyrightName}
            {copyrightName.length && !copyrightName.endsWith(".")
              ? "."
              : ""}{" "}
            All rights reserved.
          </p>
          <hr className="mx-4 hidden h-4 w-[1px] border-l border-neutral-400 md:inline-block" />
          <p>Designed in Hyderabad</p>
          <p className="md:ml-auto">
            Crafted by{" "}
            <a href="https://buzzxstore.in" className="text-white">
              Buzzxstore
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
