"use client";

import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";

export function BenefitsSection() {
    const t = useTranslations("Benefits");
    const locale = useLocale();

    const benefits = [
        {
            icon: "/icons/clock-icon.png",
            title: locale === "ar" ? "سرعة وكفاءة عالية" : "Impressive Efficiency",
            description: locale === "ar" ? "إنجاز المهام بسرعة تصل إلى 5 أضعاف الطرق التقليدية." : "Completing tasks up to 5x faster than traditional methods."
        },
        {
            icon: "/icons/hash-icon.png",
            title: locale === "ar" ? "دقة متناهية" : "Targeted Precision",
            description: locale === "ar" ? "توجيه دقيق للمياه لضمان تنظيف مثالي بدون هدر." : "Precise water targeting ensures perfect cleaning with zero waste."
        },
        {
            icon: "/icons/drone-icon.png",
            title: locale === "ar" ? "وصول غير محدود" : "Unlimited Reach",
            description: locale === "ar" ? "الوصول إلى أصعب الأماكن والمرتفعات بسهولة وأمان." : "Accessing the hardest-to-reach heights with ease and safety."
        },
        {
            icon: "/icons/shield-icon.png",
            title: locale === "ar" ? "أمان معزز" : "Enhanced Safety",
            description: locale === "ar" ? "تقليل المخاطر البشرية من خلال الاعتماد على التكنولوجيا." : "Reducing human risk by relying on advanced technology."
        },
        {
            icon: "/icons/people-icon.png",
            title: locale === "ar" ? "احترام الخصوصية" : "Minimal Disruption",
            description: locale === "ar" ? "عمليات هادئة وسريعة لا تعطل سير العمل أو تزعج السكان." : "Quiet, fast operations that don't disrupt workflow or residents."
        },
        {
            icon: "/icons/leaf-icon.png",
            title: locale === "ar" ? "صديقة للبيئة" : "Eco-Friendly",
            description: locale === "ar" ? "استخدام مياه نقية وتقنيات تقلل من الأثر البيئي." : "Using pure water and technologies that minimize environmental impact."
        }
    ];

    return (
        <section className="py-20 bg-card border-b border-border/50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                        {locale === "ar" ? "المزايا الشاملة للتنظيف بالدرون" : "The Comprehensive Benefits of Drone-Powered Cleaning"}
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        {locale === "ar"
                            ? "نقدم حلولاً مبتكرة تجمع بين التكنولوجيا المتطورة والخبرة العملية."
                            : "We provide innovative solutions combining advanced technology with practical expertise."}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="flex items-start gap-4 p-6 rounded-2xl bg-accent/10 border border-border/50 hover:bg-accent/20 transition-colors"
                        >
                            <div className="shrink-0 w-16 h-16 relative">
                                <Image
                                    src={benefit.icon}
                                    alt={benefit.title}
                                    width={64}
                                    height={64}
                                    className="object-contain"
                                />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {benefit.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
