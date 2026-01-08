import "./globals.css";
import { inter, manrope } from "@/lib/fonts";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import WhatsAppFab from "@/components/ui/whatsapp-fab";

export const metadata = {
  title: "Technical Service Company",
  description: "Engineering, Fire Systems, HVAC, Electrical & Automation",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body className="min-h-screen bg-bg text-text antialiased font-sans">
        <Header />
        <main>{children}</main>

        <WhatsAppFab
          phoneE164="+995 511 22 33 66"
          message="Hello TSC — I’d like a quote. Please contact me."
        />
        <Footer />
      </body>
    </html>
  );
}