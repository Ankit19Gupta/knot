import Image from "next/image";
import { InfiniteSlider } from "../../../../../components/motion-primitives/infinite-slider";
import Link from "next/link";

const col1 = [
  {
    title: "Ambika & Gourav Pre Wedding",
    year: 2017,
    image: "/iconic/1.jpg",
    url: "https://www.facebook.com/share/p/1AqfqHdXvM/",
  },
  {
    title: "Blessing of Sanjukta & Debajyoti",
    year: 2017,
    image: "/iconic/2.jpg",
    url: "https://www.facebook.com/share/p/19c7SgHUp9/",
  },
  {
    title: "Reception Potrites of Sushmita",
    year: 2017,
    image: "/iconic/3.jpg",
    url: "https://www.facebook.com/share/p/1K7xdVUCPx/",
  },
  {
    title: "Reception Potrites of Koushik & Priyanka",
    year: 2017,
    image: "/iconic/4.jpg",
    url: "https://www.facebook.com/share/p/1CbzhedWcr/",
  },
  {
    title: "Pre Wedding of Joydeep & Krishna",
    year: 2017,
    image: "/iconic/5.jpg",
    url: "https://www.facebook.com/share/p/15no72gu1h/",
  },
  {
    title: "Reception Potrites of Koushik & Priyanka",
    year: 2017,
    image: "/iconic/6.jpg",
    url: "https://www.facebook.com/share/p/1CbzhedWcr/",
  },
  {
    title: "Wedding Moments of Sanjukta & Debajyoti",
    year: 2017,
    image: "/iconic/7.jpg",
    url: "https://www.facebook.com/share/p/1EGPPvA7EV/",
  },
  {
    title: "Wedding Moments of Parik & Barnita",
    year: 2017,
    image: "/iconic/8.jpg",
    url: "https://www.facebook.com/share/p/18LXgPFLU9/",
  },
  {
    title: "Wedding Potrites of Manisha",
    year: 2017,
    image: "/iconic/9.jpg",
    url: "https://www.facebook.com/share/p/167EMSgafx/",
  },
  {
    title: "Pre Wedding of Sanu & Debjani",
    year: 2017,
    image: "/iconic/10.jpg",
    url: "https://www.facebook.com/share/p/1A5cCCkMCm/",
  },
  {
    title: "Reception Potrites of Ashish & Surabhi",
    year: 2017,
    image: "/iconic/11.jpg",
    url: "https://www.facebook.com/share/p/1RgtNkbvFA/",
  },
  {
    title: "Bridhi Looks of Surabhi",
    year: 2017,
    image: "/iconic/12.jpg",
    url: "https://www.facebook.com/share/p/19VLY7oMqW/",
  },
];

const col2 = [
  {
    title: "Bridhi Looks of Sushmita",
    year: 2017,
    image: "/iconic/13.jpg",
    url: "https://www.facebook.com/share/p/1C9QFrqxwv/",
  },
  {
    title: "Wedding Couples of Jayasree & Joykishan",
    year: 2017,
    image: "/iconic/14.jpg",
    url: "https://www.facebook.com/share/p/1LtYQNLafL/",
  },
  {
    title: "Bridhi Looks of Sritapa",
    year: 2017,
    image: "/iconic/15.jpg",
    url: "https://www.facebook.com/share/p/1KXtTXoEVG/",
  },
  {
    title: "Bridhi Looks of Sanjukta",
    year: 2017,
    image: "/iconic/16.jpg",
    url: "https://www.facebook.com/share/p/1AqFNcBMoB/",
  },
  {
    title: "Pre Wedding of Ashish & Surabhi",
    year: 2017,
    image: "/iconic/17.jpg",
    url: "https://www.facebook.com/share/p/1FEz87WUA6/",
  },
  {
    title: "Pre Wedding of Tama & Subhrajit",
    year: 2017,
    image: "/iconic/18.jpg",
    url: "https://www.facebook.com/share/p/1Vd5QjpufP/",
  },
  {
    title: "Pre Wedding of Tama & Subhrajit",
    year: 2017,
    image: "/iconic/19.jpg",
    url: "https://www.facebook.com/share/p/1ExrDtzBfX/",
  },
  {
    title: "Blessing Potraits of Sneha",
    year: 2017,
    image: "/iconic/20.jpg",
    url: "https://www.facebook.com/share/p/18TJEnbgVC/",
  },
  {
    title: "Wedding Potraits of Subham & Sayandita",
    year: 2017,
    image: "/iconic/21.jpg",
    url: "https://www.facebook.com/share/p/1GUpUbEUcM/",
  },
  {
    title: "Haldi Looks of Anashi",
    year: 2017,
    image: "/iconic/22.jpg",
    url: "https://www.facebook.com/share/p/1KnEnTReYu/",
  },
  {
    title: "Pre Wedding of Ankita & Rakesh",
    year: 2017,
    image: "/iconic/23.jpg",
    url: "https://www.facebook.com/share/p/19dCDr8XkT/",
  },
  {
    title: "Blessing Potraits of Ankita",
    year: 2017,
    image: "/iconic/24.jpg",
    url: "https://www.facebook.com/share/p/19UXqPmbH4/",
  },
];

const col3 = [
  {
    title: "The Wedding Series of debashis & Tammana",
    year: 2017,
    image: "/iconic/25.jpg",
    url: "https://www.facebook.com/share/p/1B1BUy6C2F/",
  },
  {
    title: "Blessing Potraits of Anashi & Subham",
    year: 2017,
    image: "/iconic/26.jpg",
    url: "https://www.facebook.com/share/p/19uk7BVyhM/",
  },
  {
    title: "Briddhi Looks of Sunayana",
    year: 2017,
    image: "/iconic/27.jpg",
    url: "https://www.facebook.com/share/p/19jrao9jnE/",
  },
  {
    title: "Wedding Potraits of Susmita",
    year: 2017,
    image: "/iconic/28.jpg",
    url: "https://www.facebook.com/share/p/18T6EVK3E8/",
  },
  {
    title: "Haldi Series of Sanjukta",
    year: 2017,
    image: "/iconic/29.jpg",
    url: "https://www.facebook.com/share/p/14FfJ6rj2EM/",
  },
  {
    title: "Blassing Potraits of Paramita & Sourav",
    year: 2017,
    image: "/iconic/30.jpg",
    url: "https://www.facebook.com/share/p/1CYPfDaWpt/",
  },
  {
    title: "Reception Potrites of Ambika",
    year: 2017,
    image: "/iconic/31.jpg",
    url: "https://www.facebook.com/share/p/16kSpXDtPK/",
  },
  {
    title: "Pre Wedding of Debashis & Tmannah",
    year: 2017,
    image: "/iconic/32.jpg",
    url: "https://www.facebook.com/share/p/19Wbe64WdH/",
  },
  {
    title: "Wedding Potrites of Amrit & Sneha",
    year: 2017,
    image: "/iconic/33.jpg",
    url: "https://www.facebook.com/share/p/1B78X4hjV1/",
  },
  {
    title: "Pre Wedding Series of Subham & Sayandita",
    year: 2017,
    image: "/iconic/34.jpg",
    url: "https://www.facebook.com/share/p/1LgQzvPotL/",
  },
  {
    title: "Indore Shoot Series of Subham & Sayandita",
    year: 2017,
    image: "/iconic/35.jpg",
    url: "https://www.facebook.com/share/p/1Hz5zLDed4/",
  },
  {
    title: "Blessing Potraits of Rabin & Susmita",
    year: 2017,
    image: "/iconic/36.jpg",
    url: "https://www.facebook.com/Theweddingsuta23/posts/pfbid02xLRGgVYxKiTq8o7C2QMUX8se6SAm5jmTQ3qpzuYAcT8dqPkNqkfnwPcgmC1uxDRil",
  },
];
export function InfiniteSliderHoverSpeed() {
  return (
    <div className="overflow-hidden space-y-6">
      <h2
        className="text-2xl md:text-3xl 2xl:text-4xl font-bold mb-6"
        data-aos="fade-right"
      >
        Iconic Wedding Moments
      </h2>
      <InfiniteSlider
        speedOnHover={20}
        gap={24}
        className="w-full overflow-hidden"
      >
        {/* {col1.map(({ image, title, url }, index) => (
          <Link href={url} key={index} target="_blank">
            <div>
              <Image
                src={image}
                alt={title}
                height={380}
                width={380}
                className="aspect-4/5 object-cover 2xl:aspect-4/5 2xl:w-80 2xl:h-96 w-56 h-72"
              />
              {title}
            </div>
          </Link>
        ))} */}

        {col1.map(({ image, title, url }, index) => (
          <Link href={url} key={index} target="_blank">
            <div className="relative">
              {/* Image */}
              <Image
                src={image}
                alt={title}
                height={380}
                width={380}
                className="aspect-4/5 object-cover 
                   2xl:w-80 2xl:h-96 w-56 h-72
                    shadow-md"
              />

              {/* Title Overlay (Top Inside Image) */}
              <div
                className="absolute bottom-0 left-0 w-full
                   bg-black/20 text-white text-center
                   py-2 px-1 text-xs sm:text-sm md:text-base
                   font-medium"
              >
                {title}
              </div>
            </div>
          </Link>
        ))}
      </InfiniteSlider>
      <InfiniteSlider
        speedOnHover={20}
        gap={24}
        reverse
        className="w-full overflow-hidden"
      >
        {col2.map(({ image, title, url }, index) => (
          <Link href={url} key={index} target="_blank">
            <div className="relative">
              <Image
                src={image}
                alt={title}
                height={380}
                width={380}
                className="aspect-4/5 object-cover 2xl:aspect-4/5 2xl:w-80 2xl:h-96 w-56 h-72"
              />
              <div
                className="absolute bottom-0 left-0 w-full
                   bg-black/20 text-white text-center
                   py-2 px-1 text-xs sm:text-sm md:text-base
                   font-medium"
              >
                {title}
              </div>
            </div>
          </Link>
        ))}
      </InfiniteSlider>
      <InfiniteSlider
        speedOnHover={20}
        gap={24}
        className="w-full overflow-hidden"
      >
        {col3.map(({ image, title, url }, index) => (
          <Link href={url} key={index} target="_blank">
            <div className="relative">
              <Image
                src={image}
                alt={title}
                height={380}
                width={380}
                className="aspect-4/5 object-cover 2xl:aspect-4/5 2xl:w-80 2xl:h-96 w-56 h-72"
              />
              <div
                className="absolute bottom-0 left-0 w-full
                   bg-black/20 text-white text-center
                   py-2 px-1 text-xs sm:text-sm md:text-base
                   font-medium"
              >
                {title}
              </div>
            </div>
          </Link>
        ))}
      </InfiniteSlider>
    </div>
  );
}
