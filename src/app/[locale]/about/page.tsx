"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { GraduationCap, Shield, Cpu, Target, Users, Award } from "lucide-react";
import Image from "next/image";
import { Footer } from "@/components/Footer";

export default function AboutPage() {
    const t = useTranslations("About");
    const tContact = useTranslations("Contact");
    const locale = useLocale();

    const features = [
        {
            icon: GraduationCap,
            title: t("pilots.title"),
            description: t("pilots.description"),
        },
        {
            icon: Cpu,
            title: t("tech.title"),
            description: t("tech.description"),
        },
        {
            icon: Shield,
            title: t("safety.title"),
            description: t("safety.description"),
        },
    ];

    const stats = [
        { icon: Target, value: "100%", label: locale === "ar" ? "معدل النجاح" : "Success Rate" },
        { icon: Users, value: "50+", label: locale === "ar" ? "عملاء سعداء" : "Happy Clients" },
        { icon: Award, value: "5+", label: locale === "ar" ? "سنوات خبرة" : "Years Experience" },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="pt-32 pb-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent" />

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <span className="text-cyan-400 text-sm font-medium tracking-widest uppercase">
                            {locale === "ar" ? "من نحن" : "About Us"}
                        </span>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mt-4 mb-6">
                            {t("title")}
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            {t("subtitle")}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative"
                        >
                            <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-card to-accent/20 border border-border/50">
                                <Image
                                    src="/about-drone.png"
                                    alt="DJI Matrice 350 RTK Cleaning Drone"
                                    width={800}
                                    height={600}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Floating Badge */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.3 }}
                                className="absolute -bottom-6 -right-6 bg-card rounded-2xl p-6 border border-border shadow-2xl"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                                        <Shield className="w-7 h-7 text-cyan-400" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold">0</div>
                                        <div className="text-sm text-muted-foreground">
                                            {locale === "ar" ? "حوادث" : "Accidents"}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Text Content */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                                {locale === "ar"
                                    ? "نقود ثورة في تنظيف المباني"
                                    : "Leading the Building Cleaning Revolution"}
                            </h2>
                            <p className="text-muted-foreground text-lg leading-relaxed mb-8 whitespace-pre-line">
                                {t("description")}
                            </p>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-6 mb-8">
                                {stats.map((stat, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: i * 0.1 }}
                                        className="text-center"
                                    >
                                        <stat.icon className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                                        <div className="text-2xl font-bold">{stat.value}</div>
                                        <div className="text-xs text-muted-foreground">{stat.label}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-20 bg-accent/30">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold">
                            {locale === "ar" ? "لماذا تختارنا؟" : "Why Choose Us?"}
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="bg-card rounded-2xl p-8 border border-border/50 hover:border-cyan-500/30 transition-colors"
                            >
                                <div className="w-14 h-14 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-6">
                                    <feature.icon className="w-7 h-7 text-cyan-400" />
                                </div>
                                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact CTA */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-gradient-to-br from-cyan-500/10 via-card to-card rounded-3xl p-12 text-center border border-cyan-500/20"
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            {locale === "ar" ? "هل أنت مستعد للبدء؟" : "Ready to Get Started?"}
                        </h2>
                        <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                            {locale === "ar"
                                ? "تواصل معنا اليوم للحصول على عرض سعر مجاني وتجربة مستقبل تنظيف المباني"
                                : "Contact us today for a free quote and experience the future of building cleaning"}
                        </p>
                        <a
                            href={`https://wa.me/97339939053?text=${encodeURIComponent(
                                locale === "ar"
                                    ? "مرحباً، أريد الاستفسار عن خدمات التنظيف بالدرون"
                                    : "Hello, I would like to inquire about drone cleaning services"
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-14 items-center justify-center gap-3 rounded-full bg-green-500 px-8 text-white font-semibold shadow-lg shadow-green-500/25 hover:shadow-green-500/40 hover:bg-green-400 transition-all"
                        >
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            <span dir="ltr">+973 3993 9053</span>
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <Footer locale={locale} />
        </div>
    );
}
