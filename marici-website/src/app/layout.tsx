import type { Metadata } from "next";
import { Inter, Syne, Outfit, JetBrains_Mono } from "next/font/google";
import ContentWrapper from "@/components/layout/ContentWrapper";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Marici Technology Pvt. Ltd. | IT Solutions & Digital Transformation",
  description:
    "Marici Technology Pvt. Ltd. provides cutting-edge IT solutions, software development, AI solutions, and digital transformation services.",
  keywords: ["IT Company", "Web Development", "App Development", "Marici Tech", "Digital Transformation"],
  openGraph: {
    title: "Marici Technology Pvt. Ltd.",
    description: "Innovating the future with dynamic IT services.",
    url: "https://maricitechnologies.com",
    siteName: "Marici Technology",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${syne.variable} ${outfit.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background text-foreground selection:bg-accent selection:text-white flex flex-col min-h-screen`}
      >
        <ContentWrapper>{children}</ContentWrapper>
      </body>
    </html>
  );
}
