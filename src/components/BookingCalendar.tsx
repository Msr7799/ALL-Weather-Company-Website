"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
    format,
    addMonths,
    subMonths,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    isSameDay,
    isToday,
    isBefore,
    startOfToday,
    addDays,
} from "date-fns";
import { ar, enUS } from "date-fns/locale";
import {
    ChevronLeft,
    ChevronRight,
    Calendar,
    Check,
    User,
    Phone,
    MapPin,
    Mail,
    AlertTriangle,
    Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { getWeatherIconPath, getWindStatus } from "./WeatherWidget";

interface BookingCalendarProps {
    locale: string;
}

interface ForecastData {
    date: Date;
    temp: number;
    icon: string;
    description: string;
    windSpeed: number;
}

interface FormData {
    name: string;
    phone: string;
    address: string;
    email: string;
}

export function BookingCalendar({ locale }: BookingCalendarProps) {
    const t = useTranslations("Calendar");
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [isBooked, setIsBooked] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [forecast, setForecast] = useState<ForecastData[]>([]);
    const [selectedDayWeather, setSelectedDayWeather] =
        useState<ForecastData | null>(null);

    const [formData, setFormData] = useState<FormData>({
        name: "",
        phone: "",
        address: "",
        email: "",
    });

    const [errors, setErrors] = useState<Partial<FormData>>({});

    const dateLocale = locale === "ar" ? ar : enUS;
    const today = startOfToday();

    const days = eachDayOfInterval({
        start: startOfMonth(currentMonth),
        end: endOfMonth(currentMonth),
    });

    const startDay = startOfMonth(currentMonth).getDay();
    const paddingDays = Array(startDay).fill(null);

    const weekDays =
        locale === "ar"
            ? ["أح", "اث", "ث", "أر", "خ", "ج", "س"]
            : ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    // Fetch 5-day weather forecast
    useEffect(() => {
        const fetchForecast = async () => {
            try {
                const lat = 26.0275;
                const lon = 50.55;
                const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

                if (!apiKey) return;

                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
                );

                if (!response.ok) return;

                const data = await response.json();

                // Get daily forecasts (one per day at noon)
                const dailyForecasts: ForecastData[] = [];
                const seenDates = new Set<string>();

                data.list.forEach((item: any) => {
                    const date = new Date(item.dt * 1000);
                    const dateStr = format(date, "yyyy-MM-dd");

                    if (!seenDates.has(dateStr)) {
                        seenDates.add(dateStr);
                        dailyForecasts.push({
                            date,
                            temp: Math.round(item.main.temp),
                            icon: item.weather[0].icon,
                            description: item.weather[0].description,
                            windSpeed: item.wind.speed,
                        });
                    }
                });

                setForecast(dailyForecasts);
            } catch (err) {
                console.error("Forecast fetch error:", err);
            }
        };

        fetchForecast();
    }, []);

    // Update selected day weather when date changes
    useEffect(() => {
        if (selectedDate && forecast.length > 0) {
            const dayWeather = forecast.find((f) =>
                isSameDay(f.date, selectedDate)
            );
            setSelectedDayWeather(dayWeather || null);
        } else {
            setSelectedDayWeather(null);
        }
    }, [selectedDate, forecast]);

    const validateForm = (): boolean => {
        const newErrors: Partial<FormData> = {};

        if (!formData.name.trim()) {
            newErrors.name =
                locale === "ar" ? "الاسم مطلوب" : "Name is required";
        }

        if (!formData.phone.trim()) {
            newErrors.phone =
                locale === "ar" ? "رقم الهاتف مطلوب" : "Phone is required";
        } else if (!/^[\d\s+()-]{8,}$/.test(formData.phone)) {
            newErrors.phone =
                locale === "ar" ? "رقم هاتف غير صالح" : "Invalid phone number";
        }

        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email =
                locale === "ar" ? "بريد إلكتروني غير صالح" : "Invalid email";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleBooking = async () => {
        if (!selectedDate || !validateForm()) return;

        setIsSubmitting(true);

        try {
            // Send booking request to API
            const response = await fetch("/api/booking", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    date: selectedDate.toISOString(),
                    weather: selectedDayWeather,
                    locale,
                }),
            });

            if (response.ok) {
                setIsBooked(true);
                setTimeout(() => {
                    setIsBooked(false);
                    setFormData({ name: "", phone: "", address: "", email: "" });
                    setSelectedDate(null);
                }, 3000);
            }
        } catch (err) {
            console.error("Booking error:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const windStatus = selectedDayWeather
        ? getWindStatus(selectedDayWeather.windSpeed)
        : null;
    const hasWindWarning = windStatus && windStatus.level !== "safe";

    return (
        <section id="book" className="py-20 sm:py-32">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="text-slate-400 text-sm font-medium tracking-widest uppercase">
                        {locale === "ar" ? "احجز موعدك" : "Book Your Slot"}
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mt-4">
                        {locale === "ar" ? "جدول موعد التنظيف" : "Schedule Your Cleaning"}
                    </h2>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Booking Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-card rounded-3xl border border-border/50 p-6 sm:p-8"
                    >
                        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                            <User className="w-5 h-5 text-slate-400" />
                            {locale === "ar" ? "معلومات الحجز" : "Booking Information"}
                        </h3>

                        <div className="space-y-4">
                            {/* Name - Required */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    {locale === "ar" ? "اسم الجهة / الشركة *" : "Company / Client Name *"}
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({ ...formData, name: e.target.value })
                                        }
                                        placeholder={
                                            locale === "ar"
                                                ? "أدخل اسم الجهة أو الشركة"
                                                : "Enter company or client name"
                                        }
                                        className={cn(
                                            "w-full pl-10 rtl:pr-10 rtl:pl-4 pr-4 py-3 rounded-xl bg-background border transition-colors",
                                            errors.name
                                                ? "border-red-500 focus:border-red-500"
                                                : "border-border focus:border-slate-200"
                                        )}
                                    />
                                </div>
                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                )}
                            </div>

                            {/* Phone - Required */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    {locale === "ar" ? "رقم التواصل *" : "Contact Number *"}
                                </label>
                                <div className="relative">
                                    <Phone className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) =>
                                            setFormData({ ...formData, phone: e.target.value })
                                        }
                                        placeholder={locale === "ar" ? "+973 XXXX XXXX" : "+973 XXXX XXXX"}
                                        dir="ltr"
                                        className={cn(
                                            "w-full pl-10 pr-4 py-3 rounded-xl bg-background border transition-colors",
                                            errors.phone
                                                ? "border-red-500 focus:border-red-500"
                                                : "border-border focus:border-slate-200"
                                        )}
                                    />
                                </div>
                                {errors.phone && (
                                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                                )}
                            </div>

                            {/* Address - Optional */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    {locale === "ar" ? "العنوان (اختياري)" : "Address (Optional)"}
                                </label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <input
                                        type="text"
                                        value={formData.address}
                                        onChange={(e) =>
                                            setFormData({ ...formData, address: e.target.value })
                                        }
                                        placeholder={
                                            locale === "ar"
                                                ? "أدخل عنوان الموقع"
                                                : "Enter location address"
                                        }
                                        className="w-full pl-10 rtl:pr-10 rtl:pl-4 pr-4 py-3 rounded-xl bg-background border border-border focus:border-slate-200 transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Email - Optional */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    {locale === "ar"
                                        ? "البريد الإلكتروني (اختياري)"
                                        : "Email (Optional)"}
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({ ...formData, email: e.target.value })
                                        }
                                        placeholder="example@email.com"
                                        dir="ltr"
                                        className={cn(
                                            "w-full pl-10 pr-4 py-3 rounded-xl bg-background border transition-colors",
                                            errors.email
                                                ? "border-red-500 focus:border-red-500"
                                                : "border-border focus:border-slate-200"
                                        )}
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                )}
                            </div>
                        </div>

                        {/* Weather Forecast for Selected Date */}
                        <AnimatePresence>
                            {selectedDayWeather && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mt-6 pt-6 border-t border-border"
                                >
                                    <h4 className="text-sm font-medium mb-3">
                                        {locale === "ar"
                                            ? "توقعات الطقس ليوم الحجز"
                                            : "Weather Forecast for Booking Day"}
                                    </h4>

                                    <div className="flex items-center gap-4 p-4 rounded-xl bg-accent/50">
                                        <Image
                                            src={getWeatherIconPath(selectedDayWeather.icon)}
                                            alt={selectedDayWeather.description}
                                            width={56}
                                            height={56}
                                            className="w-14 h-14"
                                        />
                                        <div className="flex-1">
                                            <div className="text-2xl font-bold">
                                                {selectedDayWeather.temp}°C
                                            </div>
                                            <div className="text-sm text-muted-foreground capitalize">
                                                {selectedDayWeather.description}
                                            </div>
                                        </div>
                                        <div className="text-right rtl:text-left">
                                            <div className="flex items-center gap-1">
                                                <Image
                                                    src="/Weather-icons/wind.svg"
                                                    alt="Wind"
                                                    width={20}
                                                    height={20}
                                                    className="w-5 h-5"
                                                />
                                                <span className="text-sm font-medium">
                                                    {selectedDayWeather.windSpeed} m/s
                                                </span>
                                            </div>
                                            <span
                                                className={cn(
                                                    "text-xs px-2 py-0.5 rounded-full mt-1 inline-block",
                                                    windStatus?.level === "safe"
                                                        ? "bg-green-500/20 text-green-400"
                                                        : windStatus?.level === "caution"
                                                            ? "bg-yellow-500/20 text-yellow-400"
                                                            : "bg-red-500/20 text-red-400"
                                                )}
                                            >
                                                {windStatus?.level === "safe"
                                                    ? locale === "ar"
                                                        ? "آمن"
                                                        : "Safe"
                                                    : windStatus?.level === "caution"
                                                        ? locale === "ar"
                                                            ? "حذر"
                                                            : "Caution"
                                                        : locale === "ar"
                                                            ? "خطر"
                                                            : "Risky"}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Wind Warning */}
                                    {hasWindWarning && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="mt-3 p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/30 flex items-start gap-3"
                                        >
                                            <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                                            <p className="text-sm text-yellow-200/80">
                                                {locale === "ar"
                                                    ? "⚠️ تنبيه: بسبب توقعات الرياح القوية، قد يتم تغيير موعد الحجز لضمان سلامة العملية."
                                                    : "⚠️ Warning: Due to strong wind forecast, the booking date may be rescheduled to ensure safe operation."}
                                            </p>
                                        </motion.div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Calendar */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-card rounded-3xl border border-border/50 overflow-hidden"
                    >
                        {/* Calendar Header */}
                        <div className="p-6 border-b border-border bg-gradient-to-r from-slate-500/5 to-accent/5">
                            <div className="flex items-center justify-between">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                                    className="p-2 rounded-full hover:bg-accent transition-colors"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </motion.button>

                                <h3 className="text-lg font-semibold">
                                    {format(currentMonth, "MMMM yyyy", { locale: dateLocale })}
                                </h3>

                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                                    className="p-2 rounded-full hover:bg-accent transition-colors"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </motion.button>
                            </div>
                        </div>

                        {/* Calendar Grid */}
                        <div className="p-6">
                            {/* Week Days Header */}
                            <div className="grid grid-cols-7 gap-1 mb-4">
                                {weekDays.map((day) => (
                                    <div
                                        key={day}
                                        className="text-center text-sm font-medium text-muted-foreground py-2"
                                    >
                                        {day}
                                    </div>
                                ))}
                            </div>

                            {/* Days Grid */}
                            <div className="grid grid-cols-7 gap-1">
                                {paddingDays.map((_, i) => (
                                    <div key={`pad-${i}`} className="aspect-square" />
                                ))}

                                {days.map((day) => {
                                    const isPast = isBefore(day, today);
                                    const isSelected = selectedDate && isSameDay(day, selectedDate);
                                    const isTodayDate = isToday(day);
                                    const dayForecast = forecast.find((f) =>
                                        isSameDay(f.date, day)
                                    );

                                    return (
                                        <motion.button
                                            key={day.toString()}
                                            whileHover={!isPast ? { scale: 1.1 } : undefined}
                                            whileTap={!isPast ? { scale: 0.95 } : undefined}
                                            onClick={() => !isPast && setSelectedDate(day)}
                                            disabled={isPast}
                                            className={cn(
                                                "aspect-square rounded-xl flex flex-col items-center justify-center text-sm font-medium transition-all relative",
                                                isPast && "text-muted-foreground/40 cursor-not-allowed",
                                                !isPast && !isSelected && "hover:bg-accent",
                                                isTodayDate && !isSelected && "ring-2 ring-slate-500/30",
                                                isSelected &&
                                                "bg-slate-500 text-white shadow-lg shadow-slate-900/25"
                                            )}
                                        >
                                            {format(day, "d")}
                                            {/* Weather indicator */}
                                            {dayForecast && !isPast && (
                                                <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2">
                                                    <div
                                                        className={cn(
                                                            "w-1.5 h-1.5 rounded-full",
                                                            getWindStatus(dayForecast.windSpeed).level === "safe"
                                                                ? "bg-green-400"
                                                                : getWindStatus(dayForecast.windSpeed).level ===
                                                                    "caution"
                                                                    ? "bg-yellow-400"
                                                                    : "bg-red-400"
                                                        )}
                                                    />
                                                </div>
                                            )}
                                        </motion.button>
                                    );
                                })}
                            </div>

                            {/* Legend */}
                            <div className="flex items-center justify-center gap-4 mt-4 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 rounded-full bg-green-400" />
                                    <span>{locale === "ar" ? "آمن" : "Safe"}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 rounded-full bg-yellow-400" />
                                    <span>{locale === "ar" ? "حذر" : "Caution"}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 rounded-full bg-red-400" />
                                    <span>{locale === "ar" ? "خطر" : "Risk"}</span>
                                </div>
                            </div>

                            {/* Selected Date & Book Button */}
                            <AnimatePresence mode="wait">
                                {selectedDate && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="mt-6 pt-6 border-t border-border"
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-sm text-muted-foreground">
                                                {t("selected")}:
                                            </span>
                                            <span className="font-semibold">
                                                {format(selectedDate, "PPP", { locale: dateLocale })}
                                            </span>
                                        </div>

                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={handleBooking}
                                            disabled={isSubmitting}
                                            className={cn(
                                                "w-full py-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2",
                                                isBooked
                                                    ? "bg-green-500 text-white"
                                                    : hasWindWarning
                                                        ? "bg-yellow-500 text-black hover:bg-yellow-400"
                                                        : "bg-slate-500 text-white hover:bg-slate-400 shadow-lg shadow-slate-900/25"
                                            )}
                                        >
                                            {isSubmitting ? (
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                            ) : isBooked ? (
                                                <>
                                                    <Check className="w-5 h-5" />
                                                    {locale === "ar" ? "تم الحجز بنجاح!" : "Booked Successfully!"}
                                                </>
                                            ) : hasWindWarning ? (
                                                <>
                                                    <AlertTriangle className="w-5 h-5" />
                                                    {locale === "ar"
                                                        ? "احجز (قد يتغير الموعد)"
                                                        : "Book (Date May Change)"}
                                                </>
                                            ) : (
                                                t("bookBtn")
                                            )}
                                        </motion.button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
