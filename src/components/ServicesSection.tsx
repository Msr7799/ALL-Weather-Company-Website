"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ServiceCard } from "@/components/ServiceCard";
import { Building2, Sun, Truck, Droplet, Factory, Monitor } from "lucide-react";

export function ServicesSection({ locale }: { locale: string }) {
    const t = useTranslations("Services");

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
    );
}
