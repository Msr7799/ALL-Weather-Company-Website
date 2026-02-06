"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Building2, Plane, Sparkles, Sun, Camera, Clock } from "lucide-react";
import { Hero } from "@/components/Hero";
import { ServiceCard } from "@/components/ServiceCard";
import { BookingCalendar } from "@/components/BookingCalendar";
import { Footer } from "@/components/Footer";
import { WeatherWidget } from "@/components/WeatherWidget";
import Image from "next/image";

export default function HomePage() {
  const t = useTranslations("Services");
  const locale = useLocale();

  const services = [
    {
      title: t("exterior.title"),
      description: t("exterior.description"),
      icon: Building2,
    },
    {
      title: t("drone.title"),
      description: t("drone.description"),
      icon: Plane,
    },
    {
      title: t("interior.title"),
      description: t("interior.description"),
      icon: Sparkles,
    },
    {
      title: t("solar.title"),
      description: t("solar.description"),
      icon: Sun,
    },
    {
      title: t("inspection.title"),
      description: t("inspection.description"),
      icon: Camera,
    },
    {
      title: t("emergency.title"),
      description: t("emergency.description"),
      icon: Clock,
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Weather Widget - Top Right */}
      <WeatherWidget locale={locale} />

      {/* Hero Section */}
      <Hero />

      {/* Drone Showcase Section */}
      <section className="py-20 sm:py-32 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-slate-400 text-sm font-medium tracking-widest uppercase">
              Technology
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mt-4 mb-6">
              Advanced Drone
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {locale === "ar"
                ? "نستخدم أحدث تقنيات الدرون مع نظام مياه متطور للحصول على تنظيف مثالي بدون بقع"
                : "We use the latest drone technology with advanced water system for perfect spot-free cleaning"}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative max-w-4xl mx-auto"
          >
            <div className="aspect-video rounded-3xl overflow-hidden bg-gradient-to-br from-card to-accent/20 border border-border/50 shadow-2xl">
              <Image
                src="/crew-page/crew-page-clear.png"
                alt="Advanced Drone"
                width={1200}
                height={675}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

              {/* Feature Tags */}
              <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-2">
                {[
                 
                locale === "ar" ? "الاحترافية " : "Professional",
                locale === "ar" ? "سرعة في الإنجاز" : "Fast Execution",
                locale === "ar" ? "الدقة وضمان الجوده" : "Quality Guarantee",
                ].map((feature, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/60 border border-sky-500/30 text-sky-400 text-xs font-medium backdrop-blur-sm"
                  >
                    <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(56,189,248,0.5)]" />
                    <span className="drop-shadow-sm">{feature}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Wind Speed Limit Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className={`absolute -bottom-8 ${locale === "ar" ? "left-8" : "right-8"} bg-card/95 backdrop-blur-sm rounded-2xl p-4 border border-border shadow-xl hidden sm:block`}
            >
              <div className="flex items-center gap-3">
                <Image
                  src="/Weather-icons/wind.svg"
                  alt="Wind"
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
                <div>
                  <div className="text-lg font-bold text-slate-400">12 m/s</div>
                  <div className="text-xs text-muted-foreground">
                    {locale === "ar" ? "أقصى سرعة رياح" : "Max Wind Resistance"}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 sm:py-32 bg-accent/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-slate-400 text-sm font-medium tracking-widest uppercase">
              {locale === "ar" ? "ماذا نقدم" : "What We Offer"}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mt-4 mb-6">
              {t("title")}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t("subtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                icon={service.icon}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Booking Calendar Section */}
      <BookingCalendar locale={locale} />

      {/* Footer */}
      <Footer locale={locale} />
    </div>
  );
}
