"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Scan, ShieldCheck, Droplets, FileCheck } from "lucide-react";

const icons = {
    assessment: Scan,
    safety: ShieldCheck,
    cleaning: Droplets,
    report: FileCheck,
};

export function ProcessSection() {
    const t = useTranslations("Process");

    const steps = ["assessment", "safety", "cleaning", "report"];

    return (
        <section className="py-20 bg-gradient-to-b from-background to-secondary/20 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold mb-4"
                    >
                        {t("title")}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-muted-foreground max-w-2xl mx-auto"
                    >
                        {t("subtitle")}
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-[60px] left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-sky-500/20 via-sky-500/50 to-sky-500/20 z-0" />

                    {steps.map((step, index) => {
                        const Icon = icons[step as keyof typeof icons];
                        return (
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="relative z-10 flex flex-col items-center text-center group"
                            >
                                <div className="w-24 h-24 rounded-2xl bg-card border border-border/50 shadow-lg flex items-center justify-center mb-6 group-hover:border-sky-500/50 group-hover:shadow-sky-500/20 transition-all duration-300">
                                    <div className="w-16 h-16 rounded-xl bg-sky-500/10 flex items-center justify-center group-hover:bg-sky-500/20 transition-colors">
                                        <Icon className="w-8 h-8 text-sky-500" />
                                    </div>
                                </div>

                                <div className="absolute top-[60px] right-[-50%] w-full h-0.5 hidden md:block" />

                                <div className="bg-sky-500/10 text-sky-500 text-xs font-bold px-3 py-1 rounded-full mb-3">
                                    {t("step")} {index + 1}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{t(`${step}.title`)}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {t(`${step}.description`)}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
