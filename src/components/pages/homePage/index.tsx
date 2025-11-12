"use client";
import ContactPage from "../contactPage";
import PackagesSection from "../PackagesPage";
import Hero from "./sections/Hero";

const HomePage = () => {
  return (
    <div className="space-y-4 md:space-y-8">
      <Hero />
      <PackagesSection />
      <ContactPage />
    </div>
  );
};

export default HomePage;
