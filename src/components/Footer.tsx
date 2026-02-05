"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { Phone, MapPin } from "lucide-react";
import Image from "next/image";

// WhatsApp Icon SVG
function WhatsAppIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
    );
}

export function Footer({ locale }: { locale: string }) {
    const t = useTranslations("Footer");
    const tContact = useTranslations("Contact");

    const whatsappNumber = "+97339939053";
    const whatsappMessage = locale === "ar"
        ? "مرحباً، أريد الاستفسار عن خدمات التنظيف بالدرون"
        : "Hello, I would like to inquire about drone cleaning services";
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\+|\s/g, "")}?text=${encodeURIComponent(whatsappMessage)}`;

    const googleMapsUrl = "https://maps.app.goo.gl/H53LswJgKZGQMdSF6";

    return (
        <footer className="bg-card border-t border-border">
            {/* Main Footer */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-3 mb-6">
                            <Image
                                src="/logo.png"
                                alt="ALL Weather"
                                width={60}
                                height={50}
                                className="w-auto h-12"
                            />
                            <span className="text-xl font-bold tracking-tight">
                                ALL WEATHER
                            </span>
                        </Link>
                        <p className="text-muted-foreground leading-relaxed max-w-md">
                            {locale === "ar"
                                ? "شركة رائدة في تنظيف المباني الشاهقة باستخدام طائرات الدرون المتطورة وتقنية المياه منزوعة الأيونات."
                                : "A leading company in high-rise building cleaning using advanced drone technology and deionized water."}
                        </p>

                        {/* Social Links */}
                        <div className="flex gap-4 mt-6">
                            <motion.a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-shadow"
                            >
                                <WhatsAppIcon className="w-6 h-6" />
                            </motion.a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold mb-6">
                            {locale === "ar" ? "روابط سريعة" : "Quick Links"}
                        </h3>
                        <ul className="space-y-3">
                            {[
                                { label: locale === "ar" ? "الرئيسية" : "Home", href: "/" },
                                { label: locale === "ar" ? "خدماتنا" : "Services", href: "/#services" },
                                { label: locale === "ar" ? "من نحن" : "About", href: "/about" },
                                { label: locale === "ar" ? "احجز الآن" : "Book Now", href: "/book" },
                            ].map((link, i) => (
                                <li key={i}>
                                    <Link
                                        href={link.href}
                                        className="text-muted-foreground hover:text-slate-400 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-semibold mb-6">{tContact("title")}</h3>
                        <ul className="space-y-4">
                            <li>
                                <a
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 text-muted-foreground hover:text-green-400 transition-colors"
                                >
                                    <Phone className="w-5 h-5" />
                                    <span dir="ltr">+973 3993 9053</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href={googleMapsUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-start gap-3 text-muted-foreground hover:text-slate-400 transition-colors"
                                >
                                    <MapPin className="w-5 h-5 shrink-0 mt-0.5" />
                                    <span>{tContact("address")}</span>
                                </a>
                            </li>
                        </ul>

                        {/* Google Maps Embed */}
                        <div className="mt-6 rounded-xl overflow-hidden border border-border">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3582.8!2d50.4842!3d26.0389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDAyJzIwLjAiTiA1MMKwMjknMDMuMSJF!5e0!3m2!1sen!2sbh!4v1234567890"
                                width="100%"
                                height="150"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-border">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-center text-sm text-muted-foreground">
                        <p>
                            © {new Date().getFullYear()} ALL Weather. {t("rights")}.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
