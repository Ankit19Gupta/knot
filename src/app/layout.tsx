import "./globals.css";
import { roslindale } from "./font";
import ClientLayout from "./ClientLayout";

export const metadata = {
  title: " The Knot & Narratives.in",
  description: "Plan your dream wedding",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${roslindale.className} ${roslindale.variable} antialiased`}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
