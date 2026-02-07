import { useLocale } from "next-intl";
import dynamic from "next/dynamic";
import { Hero } from "@/components/Hero";
import { WeatherWidget } from "@/components/WeatherWidget";
import ClientLoaderWrapper from "@/components/ClientLoaderWrapper";

// Dynamically import below-the-fold components
const BenefitsSection = dynamic(() => import("@/components/BenefitsSection").then(mod => mod.BenefitsSection));
const ServicesSection = dynamic(() => import("@/components/ServicesSection").then(mod => mod.ServicesSection));
const TechnologySection = dynamic(() => import("@/components/TechnologySection").then(mod => mod.TechnologySection));
const ProcessSection = dynamic(() => import("@/components/ProcessSection").then(mod => mod.ProcessSection));
const StatsSection = dynamic(() => import("@/components/StatsSection").then(mod => mod.StatsSection));
const FAQSection = dynamic(() => import("@/components/FAQSection").then(mod => mod.FAQSection));
const ClientsSection = dynamic(() => import("@/components/ClientsSection").then(mod => mod.ClientsSection));
const BookingCalendar = dynamic(() => import("@/components/BookingCalendar").then(mod => mod.BookingCalendar));

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

