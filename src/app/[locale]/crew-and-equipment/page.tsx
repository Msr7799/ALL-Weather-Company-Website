"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2, Droplets, Shield, Users } from "lucide-react";

export default function CrewPage() {
    const t = useTranslations("CrewPage");

    const equipmentImages = [
        "/crew-page/1.webp",
        "/crew-page/2.webp",
        "/crew-page/3.webp",
        "/crew-page/4.webp",
        "/crew-page/6.webp",
        "/crew-page/7.webp",
        "/crew-page/8.webp",
        "/crew-page/crew-page-tools.png",
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <main className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/crew-page/crew-page-clear.png"
                        alt="Hero Background"
                        fill
                        className="object-cover"
                        unoptimized
                    />
                </div>
            </section>

            {/* Intro Text Section */}
            <section className="py-12 bg-background">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600 mb-6">
                            {t("title")}
                        </h1>
                        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                            {t("intro.description")}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Equipment Section */}
            <section className="py-20 bg-accent/5">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
                        <div className="md:w-1/2">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6">
                                    <Shield className="w-4 h-4" />
                                    <span>{t("water.badges.dji")}</span>
                                </div>
                                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                                    {t("equipment.title")}
                                </h2>
                                <p className="text-muted-foreground text-lg leading-relaxed">
                                    {t("equipment.description")}
                                </p>
                            </motion.div>
                        </div>
                        <div className="md:w-1/2 grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {equipmentImages.slice(0, 4).map((src, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="aspect-square relative rounded-2xl overflow-hidden bg-card border border-border hover:border-cyan-500/50 transition-colors group"
                                >
                                    <Image
                                        src={src}
                                        alt={`Equipment ${i + 1}`}
                                        fill
                                        className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Detailed Grid */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                        <div className="col-span-1 md:col-span-2 relative h-80 rounded-3xl overflow-hidden group">
                            <Image
                                src="/crew-page/crew-page-tools.png"
                                alt="Tools"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end">
                                <h3 className="text-2xl font-bold text-white mb-2">{t("equipment.title")}</h3>
                            </div>
                        </div>
                        <div className="col-span-1 relative h-80 rounded-[3rem] overflow-hidden group bg-card border border-border">
                            <Image
                                src="/crew-page/7.webp"
                                alt="Detail"
                                fill
                                className="object-contain p-8 group-hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Water Purity Section */}
            <section className="py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/20 to-blue-950/20" />
                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
                        <div className="md:w-1/2">
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
                                    <Droplets className="w-4 h-4" />
                                    <span>{t("water.badges.pure")}</span>
                                </div>
                                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                                    {t("water.title")}
                                </h2>
                                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                                    {t("water.description")}
                                </p>
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        t("water.features.impurities"),
                                        t("water.features.deepClean"),
                                        t("water.features.eco"),
                                        t("water.features.noStains")
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                                            <span className="font-medium">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                        <div className="md:w-1/2 relative h-[400px] w-full">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="h-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative"
                            >
                                <Image
                                    src="/crew-page/pump.webp"
                                    alt="Pure Water Spray"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/50 mix-blend-overlay" />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Crew Section */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-6">
                                <Users className="w-4 h-4" />
                                <span>{t("water.badges.team")}</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold mb-6">
                                {t("team.title")}
                            </h2>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                {t("team.description")}
                            </p>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="relative h-[400px] rounded-3xl overflow-hidden group"
                        >
                            <Image
                                src="/crew-page/11.webp"
                                alt="Crew Member"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-8 flex flex-col justify-end">
                                <h3 className="text-2xl font-bold text-white mb-1">{t("team.card1.title")}</h3>
                                <p className="text-gray-300">{t("team.card1.desc")}</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="relative h-[400px] rounded-3xl overflow-hidden group"
                        >
                            <Image
                                src="/crew-page/crew-page1.webp"
                                alt="Remote Operation"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-8 flex flex-col justify-end">
                                <h3 className="text-2xl font-bold text-white mb-1">{t("team.card2.title")}</h3>
                                <p className="text-gray-300">{t("team.card2.desc")}</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </main>
    );
}
