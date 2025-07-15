import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Head from "next/head";

import "./globals.css";

import Header from "./components/Header";
import Footer from "./components/footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: [
    "100", "200", "300", "400", "500", "600", "700", "800", "900",
  ],
  style: ["normal"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Noman Khaliq | Full Stack Developer",
  description:
    "Full Stack Developer specializing in building modern web applications with expertise in frontend and backend technologies.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${montserrat.variable} antialiased`}>

      <Head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
      </Head>

      <body>
        <Header />
        {children}
        <Footer />
      </body>

    </html>
  );
}