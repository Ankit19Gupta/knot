/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsMobile } from "@/hooks/use-mobile";

gsap.registerPlugin(ScrollTrigger);

const FadeAnimated = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (textRef.current && containerRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom top",
          scrub: 2,
          markers: false,
        },
      });

      tl.fromTo(
        textRef.current,
        { x: "-55vw", opacity: 0.2 },
        { x: "55vw", opacity: 0.5, ease: "power2.inOut" }
      );
    }
  }, []);

  return (
    <div
      className={`w-full flex ${
        isMobile ? "h-[20vh]" : "h-[80vh]"
      } items-center justify-center relative my-10 px-4`}
    >
      <div
        ref={containerRef}
        className="relative w-full max-w-4xl 2xl:max-w-5xl h-[220px] sm:h-[320px] md:h-[420px] lg:h-[520px] xl:h-[600px] flex items-center justify-center md:mt-10"
      >
        <img
          src="https://res.cloudinary.com/ankitgupta/image/upload/v1756106084/THE_WEDDING_SUTRA-85_qmg1fp.jpg"
          alt="Background"
          className="w-full h-full object-cover rounded-xl shadow-lg z-10"
        />

        {/* Animated Text */}
        <div
          ref={textRef}
          className="absolute text-red-600 text-[28px] sm:text-[60px] md:text-[100px] 2xl:text-[200px] font-extrabold drop-shadow-lg whitespace-nowrap z-0"
        >
          2025
        </div>
      </div>
    </div>
  );
};

export default FadeAnimated;
