"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

// Pre-defined particle positions to avoid hydration mismatch
const particlePositions = [
    { left: 10, top: 20 }, { left: 85, top: 15 }, { left: 45, top: 80 },
    { left: 20, top: 60 }, { left: 70, top: 40 }, { left: 55, top: 25 },
    { left: 30, top: 75 }, { left: 90, top: 55 }, { left: 15, top: 45 },
    { left: 65, top: 85 }, { left: 40, top: 10 }, { left: 75, top: 70 },
];

export function Hero() {
    const t = useTranslations("Hero");

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background VEDIO */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/5 to-background z-10" />
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster="/hero-poster.png"
                    className="w-full h-full object-cover"
                >
                    <source src="/hero.mp4" type="video/mp4" />
                </video>
            </div>

            {/* Animated Background Grid - DJI Style */}
            <div className="absolute inset-0 z-[1]">
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
                        backgroundSize: '50px 50px'
                    }}
                />
            </div>

            {/* Floating Particles - Fixed positions */}
            <div className="absolute inset-0 z-[2]">
                {particlePositions.map((pos, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-sky-400/30 rounded-full"
                        style={{ left: `${pos.left}%`, top: `${pos.top}%` }}
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.3, 0.8, 0.3],
                        }}
                        transition={{
                            duration: 3 + (i % 3),
                            repeat: Infinity,
                            delay: i * 0.2,
                        }}
                    />
                ))}
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 text-center">
                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="mb-8"
                >
                    <Image
                        src="/logo.png"
                        alt="ALL Weather Logo"
                        width={120}
                        height={100}
                        className="rounded-md border-6 !border-[#000]/60 mx-auto"
                        priority
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/60 border border-sky-500/30 text-sky-400 text-sm font-medium mb-8 backdrop-blur-sm"
                >
                    <span className="w-2 h-2 bg-sky-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(56,189,248,0.5)]" />
                    <span className="drop-shadow-sm">DJI Matrice 350 RTK</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
                >
                    <span className="text-foreground">
                        {t("title")}
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed"
                >
                    {t("subtitle")}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <Link
                        href="/book"
                        className="group relative inline-flex h-14 items-center justify-center gap-2 rounded-full bg-slate-900/40 border border-sky-500/50 text-sky-400 px-8 text-sm font-semibold backdrop-blur-md shadow-lg shadow-sky-500/10 transition-all hover:bg-sky-500 hover:border-sky-500 hover:text-white hover:shadow-sky-500/40"
                    >
                        <span>{t("cta")}</span>
                        <motion.span
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            →
                        </motion.span>
                    </Link>

                    <Link
                        href="/#services"
                        className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-sky-500/30 bg-slate-900/40 backdrop-blur-sm px-8 text-sm font-medium text-white transition-all hover:bg-slate-800/60 hover:border-sky-500/50"
                    >
                        {t("learnMore")}
                    </Link>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
                >
                    {[
                        { value: "350+", label: "Buildings Cleaned" },
                        { value: "99%", label: "Client Satisfaction" },
                        { value: "24/7", label: "Available" },
                        { value: "0", label: "Accidents" },
                    ].map((stat, i) => (
                        <div key={i} className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-sky-400">{stat.value}</div>
                            <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <div className="flex flex-col items-center gap-2">
                    <span className="text-xs text-muted-foreground uppercase tracking-widest">Scroll</span>
                    <ChevronDown className="w-5 h-5 text-sky-400" />
                </div>
            </motion.div>
        </section>
    );
}
