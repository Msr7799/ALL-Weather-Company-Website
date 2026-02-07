"use client";

import React, { useState } from "react";
import DroneLoader from "@/components/DroneLoader";

export default function ClientLoaderWrapper({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);

    if (isLoading) {
        return <DroneLoader onComplete={() => setIsLoading(false)} />;
    }

    return <>{children}</>;
}
