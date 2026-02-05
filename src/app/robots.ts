import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = "https://allweather.bh"; // استبدل هذا بدومينك الحقيقي لاحقاً

    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/private/", "/admin/"],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
