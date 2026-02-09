"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
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
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover"
                >
                    <source src="/hero2.mp4" type="video/mp4" />
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
            <div className="absolute inset-0 z-[2] pointer-events-none">
                {particlePositions.map((pos, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-sky-400/30 rounded-full will-change-[transform]"
                        style={{ left: `${pos.left}%`, top: `${pos.top}%` }}
                        animate={{
                            y: [0, -10, 0],
                            opacity: [0.3, 0.6, 0.3],
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

                <motion.h1
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-30 font-bold tracking-tight mb-4 will-change-[transform]"
                >
                    <span className="bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">
                        {t("title")}
                    </span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-6 leading-relaxed bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent will-change-[transform]"
                >
                    {t("subtitle")}
                </motion.p>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 will-change-[transform]"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <div className="flex flex-col items-center gap-2">

                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="inline-flex  items-center gap-2 px-4 py-2 rounded-full bg-slate-900/60 border border-sky-500/30 text-sky-400 text-sm font-medium mb-4 backdrop-blur-sm"
                    >
                        <span className="w-2 h-2 bg-sky-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(56,189,248,0.5)]" />
                        <span className="drop-shadow-sm">{t("available")}</span>
                        <Image
                            src="/icons/Flag-of-Bahrain.svg"
                            alt="Bahrain Flag"
                            width={40}
                            height={40}
                            className="mb-1 rounded-[2px]"
                            priority
                        />
                    </motion.div>
                    <span className="text-xs uppercase tracking-widest bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">{t("scroll")}</span>
                    <Image
                        src="/icons/splash-drone.svg"
                        alt="baby blue drone"
                        width={65}
                        height={65}
                        className="rounded-[2px]"
                        priority
                    />
                    <Image
                        src="/icons/splash-drone2.svg"
                        alt="down arrow"
                        width={20}
                        height={20}
                        className="mb-1 rounded-[2px]"
                        priority
                    />
                </div>
            </motion.div>
        </section>
    );
}
