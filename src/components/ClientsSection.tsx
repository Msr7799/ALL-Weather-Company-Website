import { useTranslations } from "next-intl";

export function ClientsSection() {
    const t = useTranslations("Clients");

    return (
        <section className="py-20 bg-accent/20">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-2xl font-bold mb-8 text-slate-400 opacity-80">{t("title")}</h2>
                <p className="text-muted-foreground mb-12 max-w-xl mx-auto">{t("subtitle")}</p>
                <div className="flex flex-wrap justify-center gap-8 md:gap-16 grayscale opacity-40">
                    {/* Placeholder Logos */}
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="w-24 h-24 bg-slate-300/20 rounded-full animate-pulse" />
                    ))}
                </div>
            </div>
        </section>
    );
}
