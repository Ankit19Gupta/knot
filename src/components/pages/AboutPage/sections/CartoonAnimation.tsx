"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CartoonAnimation = () => {
  const rightImageRef = useRef<HTMLDivElement>(null);
  const leftImageRef = useRef<HTMLDivElement>(null);

  const [leftLoaded, setLeftLoaded] = useState(false);
  const [rightLoaded, setRightLoaded] = useState(false);

  useEffect(() => {
    if (!rightImageRef.current || !leftImageRef.current) return;

    gsap.fromTo(
      leftImageRef.current,
      { opacity: 0, x: -100, y: 50 },
      {
        opacity: 1,
        x: 0,
        y: 50,
        ease: "power2.out",
        scrollTrigger: {
          trigger: leftImageRef.current,
          start: "top 85%",
          end: "top 45%",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      rightImageRef.current,
      { opacity: 0, x: 100, y: -50 },
      {
        opacity: 1,
        x: 0,
        y: -50,
        ease: "power2.out",
        scrollTrigger: {
          trigger: rightImageRef.current,
          start: "top 85%",
          end: "top 45%",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <div className="relative bg-white px-4 py-16 flex flex-col items-center justify-center overflow-hidden">
      {/* Top Center Text */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2">
        <span className="border border-red-300 rounded-full px-3 py-1 text-[7px] sm:text-xs text-red-500 font-mono italic">
          Could you share your thoughts about TWS?
        </span>
      </div>

      {/* Images Section */}
      <div className="relative w-full flex flex-col md:flex-row items-center justify-between gap-40 md:gap-10 md:mt-20">
        {/* Left Image (Bottom Side) */}
        <div
          className="relative w-full max-w-[300px] md:max-w-[400px] 2xl:max-w-[600px] aspect-[1/1] translate-y-12"
          ref={leftImageRef}
        >
          {!leftLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-md" />
          )}
          <Image
            src="/cartoon/1.png"
            alt="Sayan"
            fill
            priority
            className={`object-contain drop-shadow-md transition-opacity duration-300 rounded-md ${
              leftLoaded ? "opacity-100" : "opacity-0"
            }`}
            placeholder="blur"
            blurDataURL="/gallery/left-blur.jpg"
            onLoad={() => setLeftLoaded(true)}
          />
        </div>

        {/* Right Image (Top Side) */}
        <div
          className="relative w-full max-w-[300px] md:max-w-[400px] 2xl:max-w-[600px] aspect-[1/1] -translate-y-12"
          ref={rightImageRef}
        >
          {!rightLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-md" />
          )}
          <Image
            src="/cartoon/2.png"
            alt="Vishal"
            fill
            priority
            className={`object-contain drop-shadow-md transition-opacity duration-300 rounded-md ${
              rightLoaded ? "opacity-100" : "opacity-0"
            }`}
            placeholder="blur"
            blurDataURL="/gallery/right-blur.jpg"
            onLoad={() => setRightLoaded(true)}
          />
        </div>
      </div>
    </div>
  );
};

export default CartoonAnimation;
