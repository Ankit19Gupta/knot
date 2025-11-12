/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

const photos = [
  "/details/sayan/1.JPG",
  "/details/sayan/2.jpg",
  "/details/sayan/3.jpg",
  "/details/sayan/4.jpg",
  "/details/sayan/5.jpg",
  "/details/sayan/6.jpeg",
];

export default function CameraPoster() {
  const polaroidRefs = useRef<HTMLDivElement[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-modern-slide");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      const elements = sectionRef.current.querySelectorAll(".reveal-on-scroll");
      elements.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  const handleWhatsAppClick = () => {
    const phoneNumber = "8787463304";
    const rawMessage =
      "Hello, I am interested in your wedding services and would like to know more about the available packages. Please share the details.";
    const encodedMessage = encodeURIComponent(rawMessage);

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    const webUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    window.open(isMobile ? whatsappUrl : webUrl, "_blank");
  };

  return (
    <section
      ref={sectionRef}
      className="w-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 py-10 px-4"
    >
      <div className="w-full max-w-7xl 2xl:max-w-[60vw] grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left: Photo Gallery */}
        <div className="reveal-on-scroll p-4">
          {/* Wooden Rail */}
          <div className="relative mb-6">
            <div className="w-full h-4 bg-gradient-to-r from-amber-800 via-amber-700 to-amber-800 rounded-full shadow-lg" />
            <div
              className="absolute inset-0 w-full h-4 bg-amber-900/10 rounded-full"
              style={{
                backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(69,26,3,0.1) 2px, rgba(69,26,3,0.1) 4px)`,
              }}
            />
          </div>

          {/* Photos */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {photos.map((photo, i) => (
              <div
                key={i}
                className={`reveal-on-scroll stagger-${i + 1} relative group`}
              >
                {/* Hanging String */}
                <div className="absolute top-[-28px] left-1/2 -translate-x-1/2 w-0.5 bg-slate-400 h-7" />
                <div
                  className="absolute top-[-34px] left-1/2 -translate-x-1/2 w-4 h-3 bg-slate-700 rounded-sm shadow-sm"
                  style={{ animationDelay: `${i * 0.5}s` }}
                />

                <div
                  ref={(el) => {
                    if (el) polaroidRefs.current[i] = el;
                  }}
                  className="swing bg-white rounded-lg border-2 border-white overflow-hidden aspect-[3/4] shadow-md"
                  style={{ animationDelay: `${i * 0.3}s` }}
                >
                  <div className="relative w-full h-4/5 overflow-hidden">
                    <img
                      src={photo}
                      alt={`Sayan Saha Photography ${i + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="h-1/5 flex items-center justify-center bg-white">
                    <div className="w-4 h-0.5 bg-slate-200 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Profile Info */}
        <div className="reveal-on-scroll p-6 bg-white/70 backdrop-blur-md rounded-xl shadow-sm flex flex-col justify-center">
          <div className="space-y-6">
            {/* Name & Title */}
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl 2xl:text-5xl font-serif tracking-wider text-slate-800 mb-2">
                SAYAN SAHA
              </h1>
              <p className="text-slate-600 text-sm leading-relaxed">
                A professional photographer and the Founder of the team
              </p>
            </div>

            {/* Personal Details */}
            <div className="space-y-3 bg-white/90 p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                <span className="text-slate-700 font-medium text-sm">
                  Place of Birth
                </span>
                <span className="text-accent font-semibold text-sm">
                  Agartala, Tripura
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                <span className="text-slate-700 font-medium text-sm">
                  D.O.B
                </span>
                <span className="text-accent font-semibold text-sm">
                  14.03.1999
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-700 font-medium text-sm">
                  Currently
                </span>
                <span className="text-accent font-semibold text-sm">
                  Agartala, India
                </span>
              </div>
            </div>

            {/* Social Buttons */}
            <div className="space-y-3 md:flex md:items-center md:justify-between">
              <button
                className="flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md transition-all duration-300 focus:outline-none cursor-pointer w-full sm:w-auto"
                onClick={handleWhatsAppClick}
              >
                <FaWhatsapp className="text-[#25D366] text-lg sm:text-xl" />
                <span className="ml-3 sm:ml-4 font-medium text-gray-700 text-sm sm:text-base">
                  Whatsapp
                </span>
                <span className="ml-4 sm:ml-5 text-gray-400 transform transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
              <Link
                href={
                  "https://www.instagram.com/sayanphotograph_official?igsh=ZmxkY3o4YThqNzEz"
                }
                target="_blank"
              >
                <button className="flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md transition-all duration-300 focus:outline-none cursor-pointer w-full sm:w-auto">
                  <FaInstagram className="text-[#E1306C] text-lg sm:text-xl" />
                  <span className="ml-3 sm:ml-4 font-medium text-gray-700 text-sm sm:text-base">
                    Instagram
                  </span>
                  <span className="ml-4 sm:ml-5 text-gray-400 transform transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
