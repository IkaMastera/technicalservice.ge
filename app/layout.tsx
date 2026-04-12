import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import { inter, manrope } from "@/lib/fonts";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import WhatsAppFab from "@/components/ui/whatsapp-fab";

export const metadata: Metadata = {
  metadataBase: new URL("https://technicalservice.ge"),
  title: "TSC — Technical Service Company",
  description: "Engineering & technical services for building systems.",
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://technicalservice.ge/#organization",
      name: "TSC – Technical Service Company",
      url: "https://technicalservice.ge",
      logo: "https://technicalservice.ge/brand/logo-symbol.svg",
      email: "info@technicalservice.ge",
      telephone: "+995511223366",
      sameAs: [],
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://technicalservice.ge/#localbusiness",
      name: "TSC – Technical Service Company",
      url: "https://technicalservice.ge",
      image: "https://technicalservice.ge/brand/logo-symbol.svg",
      telephone: "+995511223366",
      email: "info@technicalservice.ge",
      address: {
        "@type": "PostalAddress",
        streetAddress: "25 Zhiuli Shartava Street",
        addressLocality: "Batumi",
        postalCode: "6000",
        addressCountry: "GE",
      },
      areaServed: {
        "@type": "Country",
        name: "Georgia",
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body className="min-h-screen bg-bg text-text antialiased font-sans">
        <Script
          id="tsc-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />

        {/* Spline web component — needed for the hero 3D scene */}
        <Script
          type="module"
          src="https://unpkg.com/@splinetool/viewer@1.12.81/build/spline-viewer.js"
          strategy="lazyOnload"
        />

        <Header />
        <main>{children}</main>

        <WhatsAppFab
          phoneE164="+995511223366"
          message="Hello TSC — I'd like a technical consultation. Please contact me."
        />

        <Footer />
      </body>
    </html>
  );
}