"use client";

import React, { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const InfoWeddingSutra = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const authorRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { scale: 0.2, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: imageRef.current,
              start: "top 90%",
              toggleActions: "play reverse play reverse",
              scrub: false,
              markers: false,
            },
          }
        );
      }

      if (quoteRef.current) {
        gsap.fromTo(
          quoteRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.8,
            delay: 0.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: quoteRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
              scrub: false,
              markers: false,
            },
          }
        );
      }

      if (authorRef.current) {
        gsap.fromTo(
          authorRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.5,
            delay: 0.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: authorRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
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
    <section
      ref={sectionRef}
      className="bg-[#f7f7f7] py-16 px-4 overflow-hidden min-h-[40vh] flex items-center justify-center"
    >
      <div className="flex flex-col items-center text-center gap-6">
        <div
          ref={imageRef}
          className="relative w-36 h-36 sm:w-40 sm:h-40 md:w-48 md:h-48 2xl:w-60 2xl:h-60"
        >
          <Image
            src="/logo/teams4.png"
            alt="Wedding Logo"
            fill
            className="object-contain"
          />
        </div>

        <div className="px-4">
          <p
            ref={quoteRef}
            className="text-sm sm:text-xl md:text-2xl font-serif text-gray-800 leading-relaxed"
          >
            Wedding rituals are not just traditions; they are the poetry of love
            written in sacred gestures.Every ritual tells a story — of love,
            legacy, and lifelong promises. Wedding rituals are the soul of a
            union, grounding love in tradition and community..
          </p>
          <p
            ref={authorRef}
            className="mt-3 text-sm sm:text-base text-amber-600 font-semibold"
          >
            – TheWeddingSutra.in
          </p>
        </div>
      </div>
    </section>
  );
};

export default InfoWeddingSutra;
