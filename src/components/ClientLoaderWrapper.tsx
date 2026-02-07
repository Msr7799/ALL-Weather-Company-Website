"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DroneLoader from "@/components/DroneLoader";

export default function ClientLoaderWrapper({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <>
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        className="fixed inset-0 z-[100]"
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <DroneLoader onComplete={() => setIsLoading(false)} />
                    </motion.div>
                )}
            </AnimatePresence>
            <div className={isLoading ? "opacity-0 h-0 overflow-hidden" : "opacity-100 transition-opacity duration-500"}>
                {children}
            </div>
        </>
    );
}
