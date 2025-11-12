"use client";

import React, { useEffect, useRef } from "react";
import {
  FaPhoneAlt,
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaWhatsapp,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { GiGreekTemple } from "react-icons/gi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { toast } from "sonner";

gsap.registerPlugin(ScrollTrigger);

const ContactPage = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const socialRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none reset",
          },
        }
      );

      gsap.fromTo(
        subtitleRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: "top 85%",
            toggleActions: "play none none reset",
          },
        }
      );

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reset",
            },
          }
        );
      });

      gsap.fromTo(
        socialRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: socialRef.current,
            start: "top 90%",
            toggleActions: "play none none reset",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const setCardRefs = (el: HTMLDivElement | null, index: number) => {
    cardsRef.current[index] = el;
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = "7005534706";
    const rawMessage =
      "Hello, I am interested in your wedding services and would like to know more about the available packages. Please share the details.";
    const encodedMessage = encodeURIComponent(rawMessage);

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    const webUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    window.open(isMobile ? whatsappUrl : webUrl, "_blank");
  };

  const handleCallClick = (phoneNumber: string) => {
    navigator.clipboard.writeText(phoneNumber);
    toast.success(`Phone number ${phoneNumber} copied to clipboard!`);
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <div
      className="w-full bg-gray-100 py-16 rounded-lg mb-8"
      ref={sectionRef}
      id="contact"
    >
      <div className="px-4 sm:px-6 lg:px-8 flex flex-col items-center min-h-screen">
        <div className="text-center mb-12 px-4 w-full">
          <h1
            ref={headingRef}
            className="text-3xl md:text-5xl font-bold text-gray-900 font-serif tracking-tight mb-2 mt-8"
          >
            Connect With Us
          </h1>
          <div className="w-20 md:w-36 lg:w-40 h-1 bg-red-400 mx-auto mb-6 rounded-full"></div>
          <p
            ref={subtitleRef}
            className="text-sm md:text-lg sm:text-xl text-gray-800 max-w-2xl mx-auto"
          >
            Let&lsquo;s create magical wedding memories together. Reach out to
            our team of expert planners.
          </p>
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
          {[
            {
              phone: "9612471681",
              displayPhone: "9612471681",
              name: "Nilanjan Das",
              type: "call",
            },
            {
              phone: "7005534706",
              displayPhone: "7005534706",
              name: "Nilanjan Das",
              type: "whatsapp",
            },
            {
              icon: <GiGreekTemple />,
              title: "Visit Us",
              content: [
                "Pragati Road Near, ",
                "Deep Ice Cream Factory",
                "Agartala West Tripura",
              ],
            },
            {
              icon: <MdEmail />,
              title: "Email Us",
              content: [
                "Response within 24 hours",
                <span
                  key="email"
                  className="break-all text-gray-600 hover:text-red-500 transition cursor-pointer"
                >
                  theknotandnarratives@gmail.com
                </span>,
              ],
            },
          ].map((item, index) => {
            const isPhone = !!item.phone;
            const isVisitUs = item.title === "Visit Us";

            return (
              <div
                key={index}
                ref={(el) => setCardRefs(el, index)}
                className={`bg-white rounded-xl p-6 border border-gray-200 shadow-sm text-center ${
                  isPhone || isVisitUs
                    ? "cursor-pointer hover:shadow-md transition"
                    : ""
                }`}
                onClick={
                  isVisitUs
                    ? () =>
                        window.open(
                          "https://www.google.com/maps/search/?api=1&query=Pragati+Road+Near+Deep+Ice+Cream+Factory+Agartala+West+Tripura",
                          "_blank"
                        )
                    : undefined
                }
              >
                {isPhone ? (
                  <>
                    <div className="flex justify-center gap-6 mb-4">
                      {item.type === "call" ? (
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCallClick(item.phone);
                          }}
                          className="w-14 h-14 bg-[#EFEFEF] rounded-full flex items-center justify-center text-green-700 text-xl hover:bg-green-100 transition"
                        >
                          <FaPhoneAlt />
                        </div>
                      ) : (
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            handleWhatsAppClick();
                          }}
                          className="w-14 h-14 bg-[#EFEFEF] rounded-full flex items-center justify-center text-green-500 text-xl hover:bg-green-100 transition"
                        >
                          <FaWhatsapp />
                        </div>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {item.displayPhone || item.phone}
                    </h3>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-gray-600">Call or Chat with us</p>
                  </>
                ) : (
                  <>
                    <div className="w-14 h-14 bg-[#EFEFEF] rounded-full flex items-center justify-center mx-auto mb-4 text-red-400 text-xl">
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {item.title}
                    </h3>
                    <div className="flex flex-col space-y-1">
                      {item.content?.map((line, i) => (
                        <div
                          key={i}
                          className={`${
                            item.title === "Email Us" && i === 1
                              ? "w-full overflow-hidden"
                              : ""
                          }`}
                          onClick={() => {
                            if (item.title === "Email Us" && i === 1) {
                              window.location.href = `mailto:theweddingsutra.agt@gmail.com`;
                            }
                          }}
                        >
                          {line}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Social */}
        <div
          className="mt-12 md:mt-16 lg:mt-20 text-center w-full px-4"
          ref={socialRef}
        >
          <h3 className="text-gray-900 text-xl mb-6">Follow Our Journey</h3>
          <div className="flex justify-center space-x-6">
            {[
              {
                icon: <FaInstagram />,
                label: "Instagram",
                link: "https://www.instagram.com/theweddingsutra.in?igsh=dW10Yjd3NW5xaHRu",
              },
              {
                icon: <FaFacebookF />,
                label: "Facebook",
                link: "https://www.facebook.com/Theweddingsuta23?mibextid=wwXIfr",
              },
              {
                icon: <FaPinterestP />,
                label: "Pinterest",
                link: "https://www.pinterest.com",
              },
            ].map((social, i) => (
              <a
                key={i}
                href={social.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-10 h-10 bg-gray-200 hover:bg-red-300 rounded-full flex items-center justify-center text-gray-800 transition"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
