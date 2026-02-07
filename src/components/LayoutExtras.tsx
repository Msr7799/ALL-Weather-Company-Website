"use client";

import dynamic from "next/dynamic";

const WhatsAppWidget = dynamic(() => import("@/components/WhatsAppWidget").then(mod => mod.WhatsAppWidget), { ssr: false });
const BackToTop = dynamic(() => import("@/components/BackToTop").then(mod => mod.BackToTop), { ssr: false });

export function LayoutExtras({ locale }: { locale: string }) {
    return (
        <>
            <WhatsAppWidget locale={locale} />
            <BackToTop />
        </>
    );
}
