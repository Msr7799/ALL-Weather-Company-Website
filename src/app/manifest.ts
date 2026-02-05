import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "ALL Weather Cleaning",
        short_name: "ALL Weather",
        description: "Professional Drone Cleaning Services in Bahrain",
        start_url: "/",
        display: "standalone",
        background_color: "#faf9f6",
        theme_color: "#06b6d4",
        icons: [
            {
                src: "/favicon.ico",
                sizes: "any",
                type: "image/x-icon",
            },
        ],
    };
}
