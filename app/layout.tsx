import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
