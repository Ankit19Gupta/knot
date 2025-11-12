import TermsAndConditions from "@/components/pages/terms-and-conditions.tsx";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "The Wedding Sutra.in",
  description: "The-Wedding-Sutra",
};
const page = () => {
  return (
    <div>
      <TermsAndConditions />
    </div>
  );
};

export default page;
