"use client";

import { useLocale } from "next-intl";
import { BookingCalendar } from "@/components/BookingCalendar";
import { Footer } from "@/components/Footer";

export default function BookPage() {
    const locale = useLocale();

    return (
        <div className="min-h-screen pt-20">
            <BookingCalendar locale={locale} />
            <Footer locale={locale} />
        </div>
    );
}
