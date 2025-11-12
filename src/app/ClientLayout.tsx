// "use client";

// import { Toaster } from "@/components/ui/sonner";
// import { ThemeProvider } from "@/providers/theme-provider";
// import Footer from "@/components/common/Footer";
// import Navbar from "@/components/common/Navbar";
// import { SidebarProvider } from "@/components/ui/sidebar";
// import SidebarComponent from "@/components/common/Sidebar";
// import NextTopLoader from "nextjs-toploader";
// import { AosProvider } from "@/providers/AosProvider";
// import PathWrapper from "@/components/PathWrapper";

// export default function ClientLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <AosProvider>
//       <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
//         <SidebarProvider>
//           <SidebarComponent />
//           <main className="flex-1 md:pt-3 md:pr-3 2xl:pt-6 2xl:pr-6 md:bg-black 2xl:bg-black overflow-x-hidden">
//             <PathWrapper>
//               <Navbar />
//               <div className="min-h-screen">
//                 <NextTopLoader showSpinner={false} height={3} />
//                 {children}
//               </div>
//               <Footer />
//             </PathWrapper>
//           </main>
//           <Toaster />
//         </SidebarProvider>
//       </ThemeProvider>
//     </AosProvider>
//   );
// }

"use client";

import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/providers/theme-provider";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import NextTopLoader from "nextjs-toploader";
import { AosProvider } from "@/providers/AosProvider";
import PathWrapper from "@/components/PathWrapper";
import NavbarComponent from "@/components/common/Sidebar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AosProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <NavbarComponent />

        <Navbar />
        <NextTopLoader showSpinner={false} height={3} />

        <main className="2xl:pt-6 2xl:pr-6 min-h-screen">
          <PathWrapper>{children}</PathWrapper>
        </main>

        <Footer />
        <Toaster />
      </ThemeProvider>
    </AosProvider>
  );
}
