import type { Metadata } from "next";
// custom font
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { twMerge } from "tailwind-merge";


const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MutateAI",
  description: "Made with Love by Sehaj Makkar - KryptoKodes",
  icons: {
    icon: '/favi.png',
    shortcut: '/favi.png',
    apple: '/favi.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={
          twMerge(
            inter.className, 
            "antialiased bg-[#EAEEFE]"
          )  
        }
      >
        {children}
      </body>
    </html>
  );
}