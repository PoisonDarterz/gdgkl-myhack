import type { Metadata } from "next";
import { Geist, Geist_Mono, Courier_Prime, Instrument_Serif, Workbench } from "next/font/google";
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className={`${courierPrime.variable} ${instrumentSerif.variable} ${workbench.variable} font-mono min-h-screen`}>
          <div className="noise-overlay" aria-hidden="true" />
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
