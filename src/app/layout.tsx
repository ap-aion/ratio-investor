import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "./sections/_cursor";
import { SmoothScrollProvider } from "./sections/_smooth-scroll";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ratio Labs — The World Model Company",
  description:
    "Investor brief · Geometry-native AI for the structured world. Five orders of magnitude faster than the reference solver.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0C0C0B",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plexSans.variable} ${plexMono.variable} antialiased`}
    >
      <body>
        <SmoothScrollProvider />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
