"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Building2, Plane, Sparkles, Sun, Camera, Clock, Droplet, Factory, Monitor, Truck } from "lucide-react";
import { Hero } from "@/components/Hero";
import { ServiceCard } from "@/components/ServiceCard";
import { BookingCalendar } from "@/components/BookingCalendar";
import { Footer } from "@/components/Footer";
import { ProcessSection } from "@/components/ProcessSection";
import { WeatherWidget } from "@/components/WeatherWidget";
import Image from "next/image";

export default function HomePage() {
  const t = useTranslations("Services");
  const locale = useLocale();

  const services = [
    {
      title: t("building_cleaning.title"),
      description: t("building_cleaning.description"),
      icon: Building2,
    },
    {
      title: t("solar_cleaning.title"),
      description: t("solar_cleaning.description"),
      icon: Sun,
    },
    {
      title: t("bridge_cleaning.title"),
      description: t("bridge_cleaning.description"),
      icon: Truck,
    },
    {
      title: t("tank_cleaning.title"),
      description: t("tank_cleaning.description"),
      icon: Droplet,
    },
    {
      title: t("industrial_cleaning.title"),
      description: t("industrial_cleaning.description"),
      icon: Factory,
    },
    {
      title: t("surface_cleaning.title"),
      description: t("surface_cleaning.description"),
      icon: Monitor,
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Weather Widget - Top Right */}
      <WeatherWidget locale={locale} />

      {/* Hero Section */}
      <Hero />

      {/* Benefits Section - Inspired by Burooj's "Why Us" */}
      <section className="py-16 bg-card border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: locale === "ar" ? "الاحترافية" : "Professional",
                desc: locale === "ar" ? "فريق عمل مختص ومدرب" : "Expert specialized team",
                icon: Building2, // Temporary placeholder, will import specific icons
              },
              {
                title: locale === "ar" ? "سرعة في الإنجاز" : "Fast Execution",
                desc: locale === "ar" ? "توفير 80% من الوقت" : "Save 80% cleaning time",
                icon: Clock,
              },
              {
                title: locale === "ar" ? "الدقة وضمان الجودة" : "Quality Guarantee",
                desc: locale === "ar" ? "نتائج مبهرة بدون بقع" : "Spotless impressive results",
                icon: Sparkles,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-2xl bg-accent/20 border border-border/50"
              >
                <div className="w-12 h-12 rounded-full bg-slate-900/10 flex items-center justify-center text-sky-500">
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 sm:py-32">
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

      {/* Technology / Drone Showcase Section */}
      <section className="py-20 sm:py-32 bg-accent/30 relative">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-slate-400 text-sm font-medium tracking-widest uppercase">
                Technology
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mt-4 mb-6">
                Advanced Drone
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                {locale === "ar"
                  ? "نستخدم أحدث تقنيات الدرون مع نظام مياه متطور للحصول على تنظيف مثالي بدون بقع. تقنيتنا تسمح بالوصول إلى الأماكن الصعبة بأمان تام وكفاءة عالية."
                  : "We use the latest drone technology with advanced water system for perfect spot-free cleaning. Our technology allows safe and efficient access to hard-to-reach areas."}
              </p>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-sky-500/10 flex items-center justify-center">
                    <Plane className="w-5 h-5 text-sky-500" />
                  </div>
                  <div>
                    <div className="font-semibold">{locale === "ar" ? "طيران مستقر" : "Stable Flight"}</div>
                    <div className="text-sm text-muted-foreground">{locale === "ar" ? "مقاومة للرياح حتى 12 م/ث" : "Wind resistance up to 12 m/s"}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-sky-500/10 flex items-center justify-center">
                    <Camera className="w-5 h-5 text-sky-500" />
                  </div>
                  <div>
                    <div className="font-semibold">{locale === "ar" ? "مراقبة دقيقة" : "Precise Monitoring"}</div>
                    <div className="text-sm text-muted-foreground">{locale === "ar" ? "كاميرات عالية الدقة للفحص" : "High-res cameras for inspection"}</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-square sm:aspect-video lg:aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-card to-accent/20 border border-border/50 shadow-2xl">
                <Image
                  src="/crew-page/crew-page-clear.png"
                  alt="Advanced Drone"
                  width={1200}
                  height={1200}
                  className="w-full h-full object-cover"
                />

                {/* Wind Speed Badge - Floating */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className={`absolute bottom-8 ${locale === "ar" ? "right-8" : "left-8"} bg-background/90 backdrop-blur-md rounded-2xl p-4 border border-border shadow-lg`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-sky-500/10 rounded-lg">
                      <Image
                        src="/Weather-icons/wind.svg"
                        alt="Wind"
                        width={24}
                        height={24}
                        className="w-6 h-6"
                      />
                    </div>
                    <div>
                      <div className="text-lg font-bold">12 m/s</div>
                      <div className="text-xs text-muted-foreground">
                        {locale === "ar" ? "مقاومة الرياح" : "Wind Resistance"}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <ProcessSection />

      {/* Stats Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { label: useTranslations("Stats")("speed.label"), value: useTranslations("Stats")("speed.value") },
              { label: useTranslations("Stats")("safety.label"), value: useTranslations("Stats")("safety.value") },
              { label: useTranslations("Stats")("cost.label"), value: useTranslations("Stats")("cost.value") },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10"
              >
                <div className="text-4xl md:text-5xl font-bold text-sky-400 mb-2">{stat.value}</div>
                <div className="text-slate-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{useTranslations("FAQ")("title")}</h2>
            <p className="text-muted-foreground">{useTranslations("FAQ")("subtitle")}</p>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-lg mb-2 text-foreground">{useTranslations("FAQ")(`q${i}`)}</h3>
                <p className="text-muted-foreground leading-relaxed">{useTranslations("FAQ")(`a${i}`)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Section (Placeholder) */}
      <section className="py-20 bg-accent/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-8 text-slate-400 opacity-80">{useTranslations("Clients")("title")}</h2>
          <p className="text-muted-foreground mb-12 max-w-xl mx-auto">{useTranslations("Clients")("subtitle")}</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 grayscale opacity-40">
            {/* Placeholder Logos */}
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-24 h-24 bg-slate-300/20 rounded-full animate-pulse" />
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
