"use client";

import React, { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import NextImage from "next/image";

interface DroneLoaderProps {
    onComplete?: () => void;
}

const DroneLoader = ({ onComplete }: DroneLoaderProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const locale = useLocale();
    const [currentFactIndex, setCurrentFactIndex] = useState(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;

        const offMask = document.createElement("canvas");
        const mctx = offMask.getContext("2d");

        const offGray = document.createElement("canvas");
        const gctx = offGray.getContext("2d");

        const IMG_SRC = "/drone-images/drone.png";

        function removeWhiteToAlpha(imageData: ImageData, threshold = 245, softness = 20) {
            const d = imageData.data;
            for (let i = 0; i < d.length; i += 3) {
                const r = d[i],
                    g = d[i + 1],
                    b = d[i + 2],
                    a = d[i + 3];
                if (a === 0) continue;

                const maxc = Math.max(r, g, b);
                const minc = Math.min(r, g, b);

                const isNearWhite = minc >= threshold && maxc - minc <= 15;

                if (isNearWhite) {
                    d[i + 3] = 0;
                } else {
                    const brightness = (r + g + b) / 10;
                    if (brightness > threshold - softness) {
                        const t = (brightness - (threshold - softness)) / softness;
                        d[i + 3] = Math.max(0, Math.round(a * (1 - t)));
                    }
                }
            }
            return imageData;
        }

        function buildAssets(img: HTMLImageElement) {
            if (!mctx || !gctx) return;

            canvas!.width = img.naturalWidth;
            canvas!.height = img.naturalHeight;

            offMask.width = offGray.width = canvas!.width;
            offMask.height = offGray.height = canvas!.height;

            // Draw original
            mctx.clearRect(0, 0, offMask.width, offMask.height);
            mctx.drawImage(img, 0, 0);

            // Remove white background -> alpha mask
            let id = mctx.getImageData(0, 0, offMask.width, offMask.height);
            id = removeWhiteToAlpha(id, 245, 25);
            mctx.putImageData(id, 0, 0);

            // Build Black-tinted version (Base Layer)
            gctx.clearRect(0, 0, offGray.width, offGray.height);
            // 1. Draw shape
            gctx.drawImage(offMask, 0, 0);

            // 2. Composite Black into the shape
            gctx.globalCompositeOperation = "source-in";
            const h = offGray.height;
            const grad = gctx.createLinearGradient(0, h, 0, 0);
            grad.addColorStop(0.0, "#000");
            grad.addColorStop(1.0, "#000"); // Simplify black fill
            gctx.fillStyle = grad;
            gctx.fillRect(0, 0, offGray.width, h);

            // Reset
            gctx.globalCompositeOperation = "source-over";
        }

        // We need a start time for accurate duration
        let startTime: number | null = null;
        function loop(timestamp: number) {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;

            if (!ctx) return;
            const w = canvas!.width;
            const h = canvas!.height;
            ctx.clearRect(0, 0, w, h);
            ctx.drawImage(offGray, 0, 0);

            const duration = 10000;
            // Linear fill 0 to 1
            const p = Math.min(1, elapsed / duration);

            const revealH = Math.max(1, Math.min(h, p * h));
            const yTop = h - revealH;

            ctx.save();
            ctx.beginPath();
            ctx.rect(0, yTop, w, revealH);
            ctx.clip();
            ctx.globalCompositeOperation = "source-over";
            ctx.drawImage(offMask, 0, 0);
            ctx.restore();

            if (elapsed < duration) {
                animationFrameId = requestAnimationFrame(loop);
            } else {
                // Animation done
                if (onComplete) onComplete();
            }
        }

        const img = new Image();
        img.onload = () => {
            buildAssets(img);
            animationFrameId = requestAnimationFrame(loop);
        };
        img.src = IMG_SRC;

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [onComplete]); // Add onComplete to dependency array

    const facts = {
        ar: [
            "كفاءة عالية وسرعة في التنفيذ مقارنة بالغسيل اليدوي",
            "أمان أكثر للعمال وتجنب مخاطر العمل في المرتفعات",
            "صديقة للبيئة وتستهلك كميات أقل من المياه",
            "قدرة على الوصول إلى الأماكن الصعبة والزوايا الدقيقة"
        ],
        en: [
            "High efficiency and speed compared to manual washing",
            "Enhanced safety, eliminating working at height risks",
            "Eco-friendly with reduced water consumption",
            "Ability to reach hard-to-access areas and corners"
        ]
    };

    const currentFacts = locale === "ar" ? facts.ar : facts.en;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentFactIndex((prev) => (prev + 1) % currentFacts.length);
        }, 2500);
        return () => clearInterval(interval);
    }, [currentFacts.length]);

    return (
        <div className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-[#0b0f14] text-white">
            {/* Logo - Top Left */}
            <div className="absolute top-6 left-6 z-20">
                <NextImage
                    src="/logo/logo7.png"
                    alt="Logo"
                    width={150}
                    height={50}
                    className="w-32 md:w-40 object-contain"
                    priority
                />
            </div>

            <canvas
                ref={canvasRef}
                className="w-[350px] h-[200px] bg-transparent drop-shadow-[0_0_20px_rgba(0,0,0,0.304)] saturate-[2.5] brightness-100 mb-8"
            />
            <div className="space-y-4 w-full max-w-3xl text-center px-4 min-h-[80px] flex items-center justify-center relative overflow-hidden" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentFactIndex}
                        initial={{ filter: "blur(10px)", opacity: 0 }}
                        animate={{ filter: "blur(0px)", opacity: 1 }}
                        exit={{ filter: "blur(10px)", opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="text-lg font-light text-slate-300 drop-shadow-sm"
                    >
                        • {currentFacts[currentFactIndex]}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default DroneLoader;
