import { Fraunces, Caveat, Inter } from "next/font/google";
import "./globals.css";

const title = Fraunces({ subsets: ["latin"], variable: "--font-title" });
const hand = Caveat({ subsets: ["latin"], variable: "--font-hand" });
const body = Inter({ subsets: ["latin"], variable: "--font-body" });

export const metadata = {
  title: "Arpit Joshi | Living Book Portfolio",
  description: "A pop-up storybook portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${title.variable} ${hand.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}