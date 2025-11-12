import localFont from "next/font/local";
import { Poppins } from "next/font/google";

export const roslindale = localFont({
  src: "../../public/fonts/RoslindaleVariable-VF-Testing.ttf",
  variable: "--font-roslindale",
  display: "swap",
});

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});
