"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ViewAllPackage = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
              toggleActions: "play reverse play reverse",
              scrub: false,
              markers: false,
            },
          }
        );
      }

      if (subheadingRef.current) {
        gsap.fromTo(
          subheadingRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            delay: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: subheadingRef.current,
              start: "top 85%",
              toggleActions: "play reverse play reverse",
              scrub: false,
              markers: false,
            },
          }
        );
      }

      if (buttonsRef.current) {
        gsap.fromTo(
          buttonsRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: buttonsRef.current,
              start: "top 85%",
              toggleActions: "play reverse play reverse",
              scrub: false,
              markers: false,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      className="relative w-full h-[50vh] md:h-[70vh] lg:h-[80vh]"
      ref={sectionRef}
    >
      <div className="absolute inset-0 w-full h-full overflow-hidden rounded-lg">
        <Image
          src="/gallery/6.jpg"
          alt="Wedding Packages"
          fill
          className="object-cover"
          priority
          quality={100}
          sizes="100vw"
        />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 text-white w-full h-full rounded-lg">
        <div className="text-center max-w-2xl 2xl:max-w-none px-4">
          <h2
            ref={headingRef}
            className="text-2xl md:text-4xl lg:text-5xl 2xl:text-7xl font-bold mb-4 md:mb-6 lg:mb-6 hover:text-red-500 cursor-pointer transition-all"
          >
            Explore Our Packages
          </h2>

          <p
            ref={subheadingRef}
            className="text-sm md:text-xl 2xl:text-3xl mb-6 md:mb-8 hover:text-red-500 cursor-pointer transition-all"
          >
            Discover our exclusive wedding packages tailored to make your
            special day perfect.
          </p>

          <div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link
              href="/packages"
              className="inline-block bg-white text-black px-6 py-2 rounded-md font-medium hover:bg-opacity-90 transition-all duration-300 text-xs sm:text-sm md:text-lg lg:text-lg hover:bg-red-500 hover:text-white"
            >
              View All Packages
            </Link>
            <Link
              href="/contact"
              className="inline-block bg-white text-black px-6 py-2 rounded-md font-medium hover:bg-opacity-90 transition-all duration-300 text-xs sm:text-sm md:text-lg lg:text-lg hover:bg-red-500 hover:text-white"
            >
              Talk to a Planners
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAllPackage;
