import AboutUsSection from "@/components/main-page-sections/about-us";
import HeroVideo from "@/components/main-page-sections/main-hero";
import ServicesGridSection from "@/components/main-page-sections/main-services";

export default function EnHomePage() {
  return (
    <>
      <HeroVideo />
      <AboutUsSection />
      <ServicesGridSection />
    </>
  );
}