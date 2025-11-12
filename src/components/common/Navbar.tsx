"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Packages", id: "packages", href: "/" },
    { label: "Contact", id: "contact", href: "/" },
    { label: "Terms-and-conditions", href: "/terms-and-conditions" },
  ];

  const handleClick = (item: (typeof navItems)[0]) => {
    setOpen(false);
    if (item.id && pathname === "/") {
      const section = document.getElementById(item.id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      router.push(item.href);
    }
  };

  return (
    <nav className="fixed bottom-10 left-1/2 -translate-x-1/2 w-[90%] max-w-md border-b shadow-lg bg-white md:hidden lg:hidden text-black z-50 rounded-full px-4 pointer-events-none">
      <div className="flex items-center justify-between px-4 py-3.5 relative pointer-events-auto">
        <button
          onClick={() => setOpen(true)}
          className="bg-black text-white text-sm font-medium rounded-full px-4 py-1 border border-black shadow-sm"
        >
          Menu
        </button>

        <div className="absolute left-1/2 -translate-x-1/2 pointer-events-auto">
          <Link href={"/"}>
            {" "}
            <Image
              src={"/logo/logo2.png"}
              alt="Logo"
              width={90}
              height={90}
              className="object-contain"
            />
          </Link>
        </div>

        <button
          onClick={() => {
            const section = document.getElementById("contact");
            if (section) {
              section.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }}
          className="bg-red-600 text-white text-sm font-medium rounded-full px-4 py-1 shadow-sm"
        >
          Contact
        </button>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="bottom"
          className="rounded-t-2xl bg-black text-white p-6"
        >
          <SheetHeader className="flex items-center justify-between">
            <SheetTitle className="text-lg font-semibold">Menu</SheetTitle>
            <button
              onClick={() => setOpen(false)}
              className="bg-white text-black text-xs rounded-full px-3 py-1"
            >
              Close
            </button>
          </SheetHeader>

          <ul className="mt-6 space-y-4 text-base">
            {navItems.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => handleClick(item)}
                  className={`w-full block transition-colors ${
                    pathname === item.href
                      ? "text-white hover:text-red-400 font-semibold p-1 rounded-lg flex items-center justify-center"
                      : "hover:text-red-400 flex items-center justify-center rounded-lg p-1"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
