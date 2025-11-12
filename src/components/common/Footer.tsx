import { Facebook, Instagram, Youtube } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const Footer = () => {
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

  return (
    <footer className="bg-white border-t relative z-10 border-gray-200">
      <div className="max-w-7xl mx-auto 2xl:max-w-none flex flex-col md:flex-row md:items-center md:justify-between px-4 sm:px-6 lg:px-8 py-4 gap-4 md:gap-0">
        <div className="text-md 2xl:text-xl text-center md:text-left text-gray-700 md:flex-1">
          &copy; {new Date().getFullYear()} — The Wedding Sutra.in |{" "}
          <span className="font-semibold">Designed & Developed by</span> –{" "}
          <a
            className="text-red-500 font-semibold"
            href="https://www.stackkaroo.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Stackkaroo
          </a>
        </div>

        <div className="flex justify-center md:justify-end flex-wrap items-center gap-2 2xl:gap-3">
          <a
            href="https://www.instagram.com/theweddingsutra.in?igsh=dW10Yjd3NW5xaHRu"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="p-2 rounded-full transition transform hover:scale-110 hover:bg-pink-100 text-pink-600"
          >
            <Instagram className="w-5 h-5 xl:w-7 xl:h-7" />
          </a>

          <a
            href="https://www.facebook.com/Theweddingsuta23?mibextid=wwXIfr"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="p-2 rounded-full transition transform hover:scale-110 hover:bg-blue-100 text-blue-600"
          >
            <Facebook className="w-5 h-5 xl:w-7 xl:h-7" />
          </a>

          <button
            onClick={handleWhatsAppClick}
            aria-label="WhatsApp"
            className="p-2 rounded-full transition transform hover:scale-110 hover:bg-green-100 text-green-600 cursor-pointer"
          >
            <FaWhatsapp className="w-5 h-5 xl:w-7 xl:h-7" />
          </button>

          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="p-2 rounded-full transition transform hover:scale-110 hover:bg-red-100 text-red-600"
          >
            <Youtube className="w-5 h-5 xl:w-7 xl:h-7" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
