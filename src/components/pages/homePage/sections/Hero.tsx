"use client";

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[90vh] md:h-screen w-full bg-gradient-to-br from-pink-50 via-white to-rose-50 text-center px-6">
      <p className="text-rose-400 text-sm md:text-lg tracking-[0.3em] uppercase mb-4">
        The Knot & Narratives.in
      </p>

      <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-800 leading-snug">
        Celebrate <span className="text-rose-500">&</span> Cherish <br />
        Every Moment of Love
      </h1>

      <p className="mt-6 max-w-2xl text-sm md:text-lg text-gray-500 font-light">
        Crafting timeless memories with elegance, grace, and the essence of
        togetherness. Because your wedding deserves nothing less than magic.
      </p>

      <div className="mt-8">
        <button
          onClick={() => {
            const section = document.getElementById("packages");
            if (section) {
              section.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-rose-400 to-pink-500 text-white text-sm md:text-base font-medium shadow-lg hover:shadow-xl transition-all cursor-pointer"
        >
          Explore Packages
        </button>
      </div>
    </div>
  );
};

export default Hero;
