"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wind, MapPin } from "lucide-react";
import Image from "next/image";

interface WeatherData {
    temp: number;
    description: string;
    icon: string;
    windSpeed: number;
    humidity: number;
}

// Map OpenWeatherMap icon codes to local SVG files
function getWeatherIconPath(iconCode: string): string {
    const iconMap: Record<string, string> = {
        "01d": "/Weather-icons/clear-day.svg",
        "01n": "/Weather-icons/clear-night.svg",
        "02d": "/Weather-icons/partly-cloudy-day.svg",
        "02n": "/Weather-icons/partly-cloudy-night.svg",
        "03d": "/Weather-icons/cloudy.svg",
        "03n": "/Weather-icons/cloudy.svg",
        "04d": "/Weather-icons/overcast-day.svg",
        "04n": "/Weather-icons/overcast-night.svg",
        "09d": "/Weather-icons/partly-cloudy-day-rain.svg",
        "09n": "/Weather-icons/partly-cloudy-night-rain.svg",
        "10d": "/Weather-icons/rain.svg",
        "10n": "/Weather-icons/rain.svg",
        "11d": "/Weather-icons/thunderstorms-day.svg",
        "11n": "/Weather-icons/thunderstorms-night.svg",
        "13d": "/Weather-icons/darksky/snow.svg",
        "13n": "/Weather-icons/darksky/snow.svg",
        "50d": "/Weather-icons/fog-day.svg",
        "50n": "/Weather-icons/fog-night.svg",
    };
    return iconMap[iconCode] || "/Weather-icons/not-available.svg";
}

// Get wind status based on speed (m/s)
function getWindStatus(windSpeed: number): {
    level: "safe" | "caution" | "danger";
    message: string;
    messageAr: string;
} {
    if (windSpeed <= 6) {
        return {
            level: "safe",
            message: "Optimal flying conditions",
            messageAr: "ظروف طيران مثالية",
        };
    } else if (windSpeed <= 12) {
        return {
            level: "caution",
            message: "Moderate wind - proceed with care",
            messageAr: "رياح معتدلة - المضي بحذر",
        };
    } else {
        return {
            level: "danger",
            message: "Strong wind - not recommended",
            messageAr: "رياح قوية - غير موصى به",
        };
    }
}

export function WeatherWidget({ locale }: { locale: string }) {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                // Bahrain coordinates
                const lat = 26.0275;
                const lon = 50.55;
                const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

                if (!apiKey) {
                    setError("API key missing");
                    setLoading(false);
                    return;
                }

                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
                );

                if (!response.ok) {
                    throw new Error("Weather data fetch failed");
                }

                const data = await response.json();

                setWeather({
                    temp: Math.round(data.main.temp),
                    description: data.weather[0].description,
                    icon: data.weather[0].icon,
                    windSpeed: data.wind.speed,
                    humidity: data.main.humidity,
                });
            } catch (err) {
                setError("Failed to load weather");
                console.error("Weather fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
        // Refresh every 10 minutes
        const interval = setInterval(fetchWeather, 600000);
        return () => clearInterval(interval);
    }, []);

    if (loading) return null;
    if (error || !weather) return null;

    const windStatus = getWindStatus(weather.windSpeed);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, x: locale === "ar" ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className={`absolute top-24 z-30 bg-card/60 backdrop-blur-md border border-border/50 shadow-xl cursor-pointer overflow-hidden group hover:bg-card/70 transition-colors ${locale === "ar" ? "right-4 md:right-10" : "left-4 md:left-10"
                } ${isExpanded ? "rounded-3xl p-6 min-w-[320px]" : "rounded-full px-6 py-3 min-w-[260px]"
                }`}
        >
            {/* Header / Summary View */}
            <motion.div layout="position" className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="relative w-10 h-10 filter drop-shadow-md">
                        <Image
                            src={getWeatherIconPath(weather.icon)}
                            alt={weather.description}
                            fill
                            className="object-contain"
                        />
                    </div>

                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold leading-none">{weather.temp}°</span>
                            <div className="flex items-center gap-1">
           
                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Bahrain</span>
                 
                            </div>
                        </div>
                        {/* Show description in collapsed mode if space permits, or just hide */}
                        {!isExpanded && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-xs text-muted-foreground capitalize truncate max-w-[120px]"
                            >
                                {weather.description}
                            </motion.span>
                        )}
                    </div>
                </div>

                {/* Status Indicator (Visible in collapsed) */}
                <div className="flex items-center gap-3">
                    {!isExpanded && (
                        <>
                            <div className="flex flex-col items-end">
                                <span className="text-xs font-bold">{weather.windSpeed} m/s</span>
                            </div>
                            <div
                                className={`w-3 h-3 rounded-full border-2 ${windStatus.level === "safe"
                                    ? "bg-green-500 border-green-500/30 shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                                    : windStatus.level === "caution"
                                        ? "bg-yellow-500 border-yellow-500/30 shadow-[0_0_10px_rgba(234,179,8,0.5)]"
                                        : "bg-red-500 border-red-500/30 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                                    }`}
                            />
                        </>
                    )}
                    {isExpanded && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-xs text-muted-foreground/50"
                        >
                            ✕
                        </motion.div>
                    )}
                </div>
            </motion.div>

            {/* Expanded Details */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="mt-6 pt-6 border-t border-border/50">
                            <div className="grid grid-cols-2 gap-4">
                                {/* Wind Info */}
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                                        <Wind className="w-3 h-3" />
                                        <span>Wind Speed</span>
                                    </div>
                                    <div className="text-xl font-bold">{weather.windSpeed} <span className="text-sm font-normal text-muted-foreground">m/s</span></div>
                                    <div className={`text-xs px-2 py-0.5 rounded-full inline-block ${windStatus.level === "safe"
                                        ? "bg-green-500/10 text-green-500"
                                        : windStatus.level === "caution"
                                            ? "bg-yellow-500/10 text-yellow-500"
                                            : "bg-red-500/10 text-red-500"
                                        }`}>
                                        {locale === "ar" ? windStatus.messageAr.split(" - ")[0] : windStatus.message.split(" - ")[0]}
                                    </div>
                                </div>

                                {/* Additional Info (Humidity/Description) */}
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                                        <span className="capitalize">Condition</span>
                                    </div>
                                    <div className="text-sm font-medium capitalize line-clamp-2">{weather.description}</div>
                                    <div className="text-xs text-muted-foreground mt-1">
                                        Humidity: {weather.humidity}%
                                    </div>
                                </div>
                            </div>

                            <p className={`text-xs mt-4 p-2 rounded-lg bg-accent/50 leading-relaxed ${windStatus.level !== "safe" ? "text-yellow-500 bg-yellow-500/5 border border-yellow-500/10" : "text-muted-foreground"
                                }`}>
                                {locale === "ar" ? windStatus.messageAr : windStatus.message}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

// Export utility functions for use in other components
export { getWeatherIconPath, getWindStatus };
