import { useLocale } from "next-intl";
import { Hero } from "@/components/Hero";
import { BookingCalendar } from "@/components/BookingCalendar";
import { ProcessSection } from "@/components/ProcessSection";
import { WeatherWidget } from "@/components/WeatherWidget";
import { BenefitsSection } from "@/components/BenefitsSection";
import ClientLoaderWrapper from "@/components/ClientLoaderWrapper";
import { ServicesSection } from "@/components/ServicesSection";
import { TechnologySection } from "@/components/TechnologySection";
import { StatsSection } from "@/components/StatsSection";
import { FAQSection } from "@/components/FAQSection";
import { ClientsSection } from "@/components/ClientsSection";

export default function HomePage() {
  const locale = useLocale();

  return (
    <ClientLoaderWrapper>
      <div className="overflow-hidden">
        {/* Weather Widget - Top Right */}
        <WeatherWidget locale={locale} />

        {/* Hero Section */}
        <Hero />

        {/* Benefits Section - Inspired by Burooj's "Why Us" */}
        <BenefitsSection />

        {/* Services Section */}
        <ServicesSection locale={locale} />

        {/* Technology / Drone Showcase Section */}
        <TechnologySection locale={locale} />

        {/* Process Section */}
        <ProcessSection />

        {/* Stats Section */}
        <StatsSection />

        {/* FAQ Section */}
        <FAQSection />

        {/* Clients Section (Placeholder) */}
        <ClientsSection />

        {/* Booking Calendar Section */}
        <BookingCalendar locale={locale} />
      </div>
    </ClientLoaderWrapper>
  );
}

