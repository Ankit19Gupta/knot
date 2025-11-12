"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Text = () => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
            end: "bottom top",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    }, textRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={textRef}
      className="my-6 px-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-wide leading-snug"
    >
      <div className="text-2xl md:text-5xl tracking-wider mb-2 w-screen text-center">
        Our Story Unfolds
      </div>
      <div className="font-light text-sm md:text-base text-wedding-400 tracking-widest w-screen text-center">
        Scroll to relive our precious moments
      </div>
    </div>
  );
};

export default Text;
