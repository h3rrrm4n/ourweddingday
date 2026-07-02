import type { Metadata } from "next";
import { Playfair_Display, Inter, Dancing_Script } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const dancing = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Անի ♥ Արման | Հարսանյաց Հրավեր",
  description: "Անի և Արմանի հարսանյաց հրավերը՝ 20 Սեպտեմբերի 2026",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="hy" className={`${playfair.variable} ${inter.variable} ${dancing.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
