import type { Metadata } from "next";
import { Playfair_Display, Inter, Cormorant_Garamond, Noto_Serif_Armenian } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const notoArmenian = Noto_Serif_Armenian({
  variable: "--font-armenian",
  subsets: ["armenian"],
  weight: ["400", "600", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Անի & Արման | Հարսանյաց Հրավեր",
  description: "Անի և Արմանի հարսանյաց հրավերը · 20 Սեպտեմբերի 2026",
  openGraph: {
    title: "Անի & Արման | Հարսանյաց Հրավեր",
    description: "Սիրով սպասում ենք Ձեզ",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="hy">
      <body className={`${playfair.variable} ${cormorant.variable} ${inter.variable} ${notoArmenian.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
