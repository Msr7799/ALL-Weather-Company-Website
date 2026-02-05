"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    index: number;
}

export function ServiceCard({ title, description, icon: Icon, index }: ServiceCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className={cn(
                "group relative overflow-hidden rounded-2xl",
                "bg-card border border-border/50",
                "p-6 sm:p-8",
                "transition-all duration-300 hover:shadow-2xl hover:shadow-slate-900/5 hover:border-slate-200/30"
            )}
        >
            {/* Gradient Background on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Icon */}
            <motion.div
                className="relative z-10 w-14 h-14 rounded-xl bg-gradient-to-br from-slate-500/20 to-slate-500/5 border border-slate-200/20 flex items-center justify-center mb-6"
                whileHover={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.4 }}
            >
                <Icon className="w-7 h-7" style={{ color: "oklch(51.1% 0.096 186.391)" }} />
            </motion.div>

            {/* Content */}
            <div className="relative z-10">
                <h3 className="text-xl font-semibold mb-3 text-card-foreground group-hover:text-slate-400 transition-colors">
                    {title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                    {description}
                </p>
            </div>

            {/* Corner Decoration */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-tl from-slate-500/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Arrow indicator */}
            <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-slate-400"
                >
                    →
                </motion.span>
            </div>
        </motion.div>
    );
}
