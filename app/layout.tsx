import "./globals.css";
import { inter, manrope } from "@/lib/fonts";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

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
        <Footer />
      </body>
    </html>
  );
}