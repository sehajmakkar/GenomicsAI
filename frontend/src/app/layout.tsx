import type { Metadata } from "next";
// custom font
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { twMerge } from "tailwind-merge";
import faviconImage from '~/assets/tt.png'


const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MutateAI",
  description: "Made with Love by Sehaj Makkar - KryptoKodes",
  icons: {
    icon: '/logo-mutate.png',
    shortcut: '/logo-mutate.png',
    apple: '/logo-mutate.png',
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