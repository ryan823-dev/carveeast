import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import "./print.css";
import { PerformanceMonitor } from "@/components/PerformanceMonitor";
import { FeedbackWidget } from "@/components/FeedbackWidget";
import { ServiceWorkerRegistration } from "@/components/ServiceWorkerRegistration";
import { Analytics } from "@/components/Analytics";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";
import { OrganizationStructuredData, WebSiteStructuredData } from "@/components/StructuredData";
import { CartProvider } from "@/lib/cart-context";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CarveEast | Discover Contemporary Chinese Art",
  description: "A curated platform connecting discerning collectors with exceptional Chinese artists. Explore seal engraving, calligraphy, ceramics, and ink painting.",
  keywords: ["Chinese art", "seal engraving", "calligraphy", "ceramics", "ink painting", "contemporary art", "art collecting"],
  authors: [{ name: "CarveEast" }],
  creator: "CarveEast",
  publisher: "CarveEast",
  metadataBase: new URL("https://carveeast.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "CarveEast | Discover Contemporary Chinese Art",
    description: "Where tradition meets expression. Discover exceptional Chinese artists and build your collection.",
    type: "website",
    locale: "en_US",
    siteName: "CarveEast",
  },
  twitter: {
    card: "summary_large_image",
    title: "CarveEast | Discover Contemporary Chinese Art",
    description: "Where tradition meets expression. Discover exceptional Chinese artists and build your collection.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Replace with actual code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <OrganizationStructuredData />
        <WebSiteStructuredData />
      </head>
      <body
        className={`${playfairDisplay.variable} ${inter.variable} antialiased bg-[#FAFAF8] text-[#1A1A1A]`}
        style={{
          fontFamily: '"Inter", system-ui, sans-serif',
        }}
      >
        <CartProvider>
          {children}
        </CartProvider>
        <PerformanceMonitor />
        <FeedbackWidget />
        <ServiceWorkerRegistration />
        <Analytics />
        <AnalyticsTracker />
      </body>
    </html>
  );
}
