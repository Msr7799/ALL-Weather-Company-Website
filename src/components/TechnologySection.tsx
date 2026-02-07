"use client";

import { motion } from "framer-motion";
import { Plane, Camera } from "lucide-react";
import Image from "next/image";

export function TechnologySection({ locale }: { locale: string }) {
    return (
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
    );
}
