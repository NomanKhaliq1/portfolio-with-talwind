import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal"],
  variable: "--font-montserrat",
});

// ✅ SEO metadata
export const metadata: Metadata = {
  title: "Noman Khaliq | Full Stack Developer",
  description:
    "I’m Noman Khaliq, a full stack developer building sleek, scalable web applications using React, Next.js, Tailwind, and WordPress.",
  keywords: [
    "Noman Khaliq",
    "Full Stack Developer",
    "Next.js Developer",
    "React Developer",
    "TailwindCSS Developer",
    "Freelance Web Developer",
    "Portfolio",
    "Web Design",
    "Modern Web Apps",
  ],
  authors: [{ name: "Noman Khaliq", url: "https://nomankhaliq.dev" }],
  creator: "Noman Khaliq",
  metadataBase: new URL("https://nomankhaliq.dev"),
  alternates: {
    canonical: "https://nomankhaliq.dev",
  },
  openGraph: {
    type: "website",
    url: "https://nomankhaliq.dev",
    title: "Noman Khaliq | Full Stack Developer",
    description:
      "Crafting modern, high-performance websites and web apps with React, Next.js, and WordPress.",
    siteName: "Noman Khaliq Portfolio",
    images: [
      {
        url: "/og-image.jpg", // 💡 Add this image in your public folder
        width: 1200,
        height: 630,
        alt: "Noman Khaliq - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Noman Khaliq | Full Stack Developer",
    description:
      "Crafting modern, scalable web apps with React, Next.js, and WordPress.",
    creator: "@nomankhaliq_",
    images: ["/og-image.jpg"], // Same as Open Graph
  },
  icons: {
    icon: "/favicon.ico", // Place favicon.ico in /public
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={montserrat.variable}>
      <head>
        {/* Optional: Add additional meta here if needed */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
