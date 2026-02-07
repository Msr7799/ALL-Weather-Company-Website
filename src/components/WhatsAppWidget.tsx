"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";

// WhatsApp Icon SVG
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function WhatsAppWidget({ locale }: { locale: string }) {
  const [isOpen, setIsOpen] = useState(false);

  // Anchor only (no items-start/end here)
  const positionClass = locale === "ar" ? "left-6" : "right-6";

  const texts = {
    header: locale === "ar" ? "بدء محادثة" : "Start a Conversation",
    subHeader:
      locale === "ar"
        ? "مرحباً! اضغط أدناه للتحدث معنا على واتساب"
        : "Hi! Click below to chat with us on WhatsApp",
    replyTime: locale === "ar" ? "يرد الفريق عادةً في غضون دقائق" : "The team typically replies in a few minutes",
    chatButton: locale === "ar" ? "المكتب الرئيسي" : "Main Office",
    message:
      locale === "ar"
        ? "مرحباً، أريد الاستفسار عن خدمات التنظيف بالدرون"
        : "Hello, I would like to inquire about drone cleaning services",
    needHelp: locale === "ar" ? "تحتاج مساعدة ؟" : "Need Help?",
    chatWithUs: locale === "ar" ? "تحدث معنا" : "Chat with us",
  };

  const phoneNumber = "97339939053";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(texts.message)}`;

  // Align children explicitly (avoid RTL flex-start flipping)
  const alignSelfClass = locale === "ar" ? "self-start" : "self-end";

  return (
    <div
      dir="ltr"
      className={`fixed bottom-6 ${positionClass} z-[60] flex flex-col gap-4`}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`bg-card border border-border rounded-xl shadow-2xl overflow-hidden w-80 mb-2 ${alignSelfClass}`}
          >
            <div
              className="bg-[#00a884] p-6 text-white text-start"
              dir={locale === "ar" ? "rtl" : "ltr"}
            >
              <div className="flex items-center gap-3 mb-2">
                <WhatsAppIcon className="w-7 h-7" />
                <h3 className="font-bold text-lg">{texts.header}</h3>
              </div>
              <p className="text-white/90 text-sm leading-relaxed">{texts.subHeader}</p>
            </div>

            <div className="p-4 bg-background" dir={locale === "ar" ? "rtl" : "ltr"}>
              <p className="text-xs text-muted-foreground mb-3">{texts.replyTime}</p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-muted hover:bg-muted/80 rounded-lg transition-colors group border border-border/50"
              >
                <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white shrink-0">
                  <WhatsAppIcon className="w-5 h-5" />
                </div>

                <div className="flex-1 text-start">
                  <p className="font-semibold text-sm text-foreground">{texts.chatButton}</p>
                  <p className="text-xs text-muted-foreground truncate">ALL Weather</p>
                </div>

                <Send
                  className={`w-4 h-4 text-muted-foreground group-hover:text-[#25D366] transition-colors ${
                    locale === "ar" ? "rotate-180" : ""
                  }`}
                />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button Wrapper */}
      <div className={`relative ${alignSelfClass}`}>
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: locale === "ar" ? 10 : -10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: locale === "ar" ? 10 : -10 }}
              className={`absolute top-1/2 -translate-y-1/2 whitespace-nowrap py-2 px-4 rounded-full shadow-lg bg-white text-zinc-800 hidden md:block ${
                locale === "ar" ? "left-full ml-4" : "right-full mr-4"
              }`}
              dir={locale === "ar" ? "rtl" : "ltr"}
            >
              <span className="text-sm font-medium">
                {texts.needHelp} <span className="font-bold">{texts.chatWithUs}</span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-green-500/30 flex items-center justify-center hover:scale-105 transition-transform duration-200 active:scale-95"
          aria-label="Chat on WhatsApp"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
              >
                <WhatsAppIcon className="w-8 h-8" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
}
