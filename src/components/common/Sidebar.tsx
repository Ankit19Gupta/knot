"use client";

import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import Image from "next/image";
import MobileBorder from "./mobileBorder";

export default function NavbarComponent() {
  const isMobile = useIsMobile();
  const router = useRouter();
  const pathname = usePathname();

  const handleScroll = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const menuItems = [
    { name: "Packages", id: "packages" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <nav
      className={cn(
        "bg-white text-black w-full shadow-md fixed top-0 left-0 z-50 hidden md:block"
      )}
    >
      <div className="flex items-center justify-between px-4 sm:px-6 md:px-10 h-16 sm:h-18 md:h-20">
        <div
          className="cursor-pointer flex items-center"
          onClick={() => router.push("/")}
        >
          <Image
            src={"/logo/logo2.png"}
            width={150}
            height={150}
            alt="Desktop Logo"
            className="hidden md:block"
          />
        </div>

        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center">
            {menuItems.map((item, index) => (
              <button
                key={`${item.id}-${index}`}
                onClick={() => handleScroll(item.id)}
                className={cn(
                  "flex items-center gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-md text-sm sm:text-base transition-colors text-black cursor-pointer"
                )}
              >
                {item.name}
              </button>
            ))}
          </div>

          <div>
            <button
              onClick={() => {
                if (pathname === "/") {
                  router.push("/terms-and-conditions");
                } else {
                  router.push("/terms-and-conditions");
                }
              }}
              className={cn(
                "transition-colors h-full hover:bg-transparent flex items-center"
              )}
            >
              {isMobile ? <MobileBorder /> : <MobileBorder />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
