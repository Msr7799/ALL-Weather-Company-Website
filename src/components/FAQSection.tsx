"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export function FAQSection() {
    const t = useTranslations("FAQ");

    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">{t("title")}</h2>
                    <p className="text-muted-foreground">{t("subtitle")}</p>
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
                            <h3 className="font-semibold text-lg mb-2 text-foreground">{t(`q${i}`)}</h3>
                            <p className="text-muted-foreground leading-relaxed">{t(`a${i}`)}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
