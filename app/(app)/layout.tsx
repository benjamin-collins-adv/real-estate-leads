import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { LeadGenerationComponents } from "@/components/lead-generation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "PrimeRealty - Find Your Dream Home",
    template: "%s | PrimeRealty",
  },
  description: "Discover premium properties and find your perfect home with PrimeRealty. Expert real estate services for buying, selling, and renting.",
  keywords: ["real estate", "properties", "homes for sale", "homes for rent", "real estate listings", "property search"],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "PrimeRealty",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "/",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LeadGenerationComponents />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
