import type { Metadata } from "next";
import { Geist, Geist_Mono, Courier_Prime, Instrument_Serif, Workbench } from "next/font/google";
import "./globals.css";

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
        <div className={`${courierPrime.variable} ${instrumentSerif.variable} ${workbench.variable} font-mono min-h-screen`}>
          {children}
        </div>
      </body>
    </html>
  );
}
