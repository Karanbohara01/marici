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

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://maricitechnologies.com";

export const metadata: Metadata = {
  title: "Marici Technology Pvt. Ltd. | IT Solutions & Digital Transformation",
  description:
    "Marici Technology Pvt. Ltd. provides cutting-edge IT solutions, software development, AI solutions, and digital transformation services.",
  keywords: ["IT Company", "Web Development", "App Development", "Marici Tech", "Digital Transformation"],
  openGraph: {
    title: "Marici Technology Pvt. Ltd.",
    description: "Innovating the future with dynamic IT services.",
    url: baseUrl,
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Marici Technology Pvt. Ltd.",
              "url": baseUrl,
              "logo": `${baseUrl}/logo.png`,
              "description": "Marici Technology Pvt. Ltd. provides cutting-edge IT solutions, software development, AI solutions, and digital transformation services.",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-9876543210",
                "contactType": "customer service"
              },
              "sameAs": [
                "https://www.linkedin.com/company/marici-technology",
                "https://twitter.com/maricitech"
              ]
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Marici Technology",
              "url": baseUrl,
              "potentialAction": {
                "@type": "SearchAction",
                "target": `${baseUrl}/search?q={search_term_string}`,
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
        <ContentWrapper>{children}</ContentWrapper>
      </body>
    </html>
  );
}
