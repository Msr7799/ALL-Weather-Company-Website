import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://all-weather-bh.vercel.app"; // استبدل هذا بدومينك الحقيقي

    // اللغات المدعومة
    const locales = ["en", "ar"];

    // الصفحات الأساسية
    const routes = ["", "/about", "/book", "/crew-and-equipment"];

    const sitemapEntries: MetadataRoute.Sitemap = [];

    routes.forEach((route) => {
        locales.forEach((locale) => {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}${route}`,
                lastModified: new Date(),
                changeFrequency: "weekly",
                priority: route === "" ? 1.0 : 0.8,
            });
        });
    });

    return sitemapEntries;
}
