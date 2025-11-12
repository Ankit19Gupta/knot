import Package from "@/components/pages/PackagesPage";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "The Wedding Sutra.in",
  description: "The-Wedding-Sutra",
};
const page = () => {
  return (
    <div>
      <Package />
    </div>
  );
};

export default page;
