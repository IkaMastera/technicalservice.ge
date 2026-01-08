import AboutUsSection from "@/components/main-page-sections/about-us";
import HeroVideo from "@/components/main-page-sections/main-hero";
import PortfolioPreview from "@/components/main-page-sections/main-portfolio";
import ServicesGridSection from "@/components/main-page-sections/main-services";
import ContactUsSection from "@/components/main-page-sections/contact-us";

export default function EnHomePage() {
  return (
    <>
      <HeroVideo />
      <AboutUsSection />
      <ServicesGridSection />
      <PortfolioPreview />
      <ContactUsSection />
    </>
  );
}