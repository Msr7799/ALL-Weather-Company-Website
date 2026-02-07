"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export function StatsSection() {
    const t = useTranslations("Stats");

    const stats = [
        { label: t("speed.label"), value: t("speed.value") },
        { label: t("safety.label"), value: t("safety.value") },
        { label: t("cost.label"), value: t("cost.value") },
    ];

    return (
        <section className="py-20 bg-slate-900 text-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    {stats.map((stat, i) => (
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
    );
}
