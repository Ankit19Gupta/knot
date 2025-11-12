import HomePage from "@/components/pages/homePage";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: " The Knot & Narratives.in",
  description: " The Knot & Narratives.in",
};
const Home = () => {
  return (
    <div>
      <HomePage />
    </div>
  );
};

export default Home;
