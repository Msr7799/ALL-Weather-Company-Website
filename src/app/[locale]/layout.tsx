import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { LayoutExtras } from "@/components/LayoutExtras";

// ... existing imports

// ... existing code


import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ALL Weather | Drone Cleaning Services Bahrain",
    template: "%s | ALL Weather Bahrain"
  },
  description: "Leading cleaning company in Bahrain using advanced drones for high-rise building facades, glass cleaning, and solar panels. Water-fed pole system available.",
  keywords: [
    // العربية
    "شركة تنظيف البحرين",
    "تنظيف واجهات المباني",
    "تنظيف زجاج بالدرون",
    "غسيل مباني شاهقة",
    "تنظيف ألواح شمسية",
    "تنظيف أبراج البحرين",
    "شركة ALL Weather",
    // English
    "Cleaning company Bahrain",
    "Drone cleaning services",
    "Facade cleaning Bahrain",
    "High-rise window cleaning",
    "Drone cleaning",
    "Solar panel cleaning",
    "Glass cleaning robot"
  ],
  authors: [{ name: "ALL Weather" }],
  creator: "ALL Weather",
  metadataBase: new URL("https://allweather.bh"),
  openGraph: {
    title: "ALL Weather | Professional Drone Cleaning Services",
    description: "Experts in high-rise facade cleaning using advanced Drone technology in Bahrain.",
    url: "https://allweather.bh",
    siteName: "ALL Weather",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/crew-page-clear.png",
        width: 1200,
        height: 630,
        alt: "ALL Weather Drone Cleaning",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  }
};

// JSON-LD Structured Data for Local Business
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "ALL Weather Cleaning Solutions",
  "image": "https://allweather.bh/logo1.png",
  "description": "Professional high-rise cleaning services using advanced drones and purified water technology.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Zallaq",
    "addressLocality": "Zallaq",
    "addressRegion": "Southern Governorate",
    "postalCode": "1056",
    "addressCountry": "BH"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 26.0275,
    "longitude": 50.4842
  },
  "url": "https://allweather.bh",
  "telephone": "+97339939053",
  "priceRange": "$$",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    }
  ],
  "sameAs": [
    "https://instagram.com/allweather.bh"
  ]
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  const messages = await getMessages();

  const isRtl = locale === "ar";
  const dir = isRtl ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else if (theme === 'dark' || !theme) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen`}
      >
        <NextIntlClientProvider messages={messages}>
          <Navigation locale={locale} />
          <main>
            {children}
          </main>
          <Footer locale={locale} />
          <LayoutExtras locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
