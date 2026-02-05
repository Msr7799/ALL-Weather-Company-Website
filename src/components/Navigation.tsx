"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function Navigation({ locale }: { locale: string }) {
    const t = useTranslations("Navigation");
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        // Check for saved theme or system preference
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark);
        setIsDark(shouldBeDark);
        document.documentElement.classList.toggle("dark", shouldBeDark);
    }, []);

    const toggleTheme = () => {
        const newTheme = !isDark;
        setIsDark(newTheme);
        localStorage.setItem("theme", newTheme ? "dark" : "light");
        document.documentElement.classList.toggle("dark", newTheme);
    };

    const navItems = [
        { name: t("home"), href: "/" },
        { name: t("services"), href: "/#services" },
        { name: t("crew"), href: "/crew-and-equipment" },
        { name: t("about"), href: "/about" },
    ];

    const switchLocale = locale === "en" ? "ar" : "en";

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={cn(
                "fixed w-full top-0 z-50 transition-all duration-300",
                scrolled
                    ? "bg-background/90 backdrop-blur-xl border-b border-border/50 shadow-lg"
                    : "bg-transparent"
            )}
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <Image
                            src="/logo.png"
                            alt="ALL Weather"
                            width={50}
                            height={40}
                            className="w-auto h-10"
                        />
                        <span className="text-lg font-bold tracking-tight hidden sm:block">
                            ALL WEATHER
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "text-sm font-medium transition-colors relative group",
                                    pathname === item.href
                                        ? "text-stone-200"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {item.name}
                                <span
                                    className={cn(
                                        "absolute -bottom-1 left-0 h-0.5 bg-stone-200 transition-all",
                                        pathname === item.href ? "w-full" : "w-0 group-hover:w-full"
                                    )}
                                />
                            </Link>
                        ))}

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-accent transition-colors"
                            aria-label="Toggle theme"
                        >
                            {isDark ? (
                                <Sun className="w-4 h-4" />
                            ) : (
                                <Moon className="w-4 h-4" />
                            )}
                        </button>

                        {/* Language Switch */}
                        <Link
                            href={pathname}
                            locale={switchLocale}
                            className="flex items-center gap-2 p-2 hover:bg-accent rounded-full transition-colors text-sm"
                        >
                            <Globe className="w-4 h-4" />
                            <span>{locale === "en" ? "عربي" : "EN"}</span>
                        </Link>

                        {/* CTA Button */}
                        <Link
                            href="/book"
                            className="inline-flex h-10 items-center justify-center rounded-full bg-stone-500 px-6 text-sm font-medium text-white shadow-lg shadow-stone-700/25 transition-all hover:bg-stone-200 hover:shadow-stone-700/30"
                        >
                            {t("book")}
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center gap-2 md:hidden">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-accent transition-colors"
                        >
                            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                        <button
                            className="p-2 rounded-full hover:bg-accent transition-colors"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border overflow-hidden"
                    >
                        <div className="flex flex-col p-6 space-y-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "text-lg font-medium py-2",
                                        pathname === item.href ? "text-stone-200" : "text-foreground"
                                    )}
                                >
                                    {item.name}
                                </Link>
                            ))}

                            <Link
                                href="/book"
                                onClick={() => setIsOpen(false)}
                                className="inline-flex h-12 items-center justify-center rounded-full bg-stone-500 px-6 text-sm font-medium text-white shadow-lg w-full mt-4"
                            >
                                {t("book")}
                            </Link>

                            <div className="pt-4 border-t border-border flex items-center justify-between">
                                <Link
                                    href={pathname}
                                    locale={switchLocale}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-2 text-muted-foreground"
                                >
                                    <Globe className="w-5 h-5" />
                                    {locale === "en" ? "العربية" : "English"}
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
