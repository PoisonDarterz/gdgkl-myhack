import type { Metadata } from "next";
import { Geist, Geist_Mono, Courier_Prime, Instrument_Serif, Workbench, Google_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/src/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const courierPrime = Courier_Prime({
  variable: "--font-courier-prime",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

const workbench = Workbench({
  variable: "--font-workbench",
  subsets: ["latin"],
});

const googleSans = Google_Sans({
  variable: "--font-google-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Build With AI KL 2026",
  description: "Build With AI Kuala Lumpur — 2026 developer community event",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className={`${courierPrime.variable} ${instrumentSerif.variable} ${workbench.variable} ${googleSans.variable} font-mono min-h-screen`}>
          <div className="noise-overlay" aria-hidden="true" />
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
