import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Անի ♥ Արման | Հարսանյաց Հրավեր",
  description: "Անի և Արմանի հարսանյաց հրավերը՝ 20 Սեպտեմբերի 2026",
  openGraph: {
    title: "Անի ♥ Արման | Հարսանյաց Հրավեր",
    description: "Սիրով սպասում ենք Ձեզ",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="hy"
      className={`${playfair.variable} ${inter.variable}`}
    >
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
