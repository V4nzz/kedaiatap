import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

// next/font otomatis self-host, non-blocking, dan gunakan font-display: swap
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-poppins",
  preload: true,
});

export const metadata: Metadata = {
  title: "KEDAI ATAP — Café & Ruang Kolaborasi Bandar Lampung",
  description: "Kedai Atap — café di Kedaton, Bandar Lampung. Kopi specialty, makanan enak, WiFi cepat, dan ruang kolaborasi terbuka.",
  keywords: "café bandar lampung, kopi kedaton, specialty coffee, coworking café, kolaborasi, kedai atap",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={poppins.variable}>
      <head>
        {/* Preload font lokal New Year Coffee untuk rendering cepat */}
        <link
          rel="preload"
          href="/fonts/NewYearCoffee.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        {/* Preload hero image LCP utama */}
        <link
          rel="preload"
          href="/photos/home1.webp"
          as="image"
          type="image/webp"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
