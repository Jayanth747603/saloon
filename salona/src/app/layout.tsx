import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { BookingProvider } from "@/components/BookingProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Salona | Luxury Barbershop",
  description: "Experience modern barbering where classic craftsmanship meets contemporary style.",
  openGraph: {
    title: "Salona | Luxury Barbershop",
    description: "Experience modern barbering where classic craftsmanship meets contemporary style.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${poppins.variable} font-body bg-primary text-white antialiased overflow-x-hidden`}
      >
        <BookingProvider>
          {children}
        </BookingProvider>
      </body>
    </html>
  );
}
