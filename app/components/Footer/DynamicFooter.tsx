"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer"; // Путь к вашему настоящему компоненту футера

export default function DynamicFooter() {
    const pathname = usePathname();

    // Если страница начинается с /admin, футер не рендерится
    if (pathname.startsWith("/admin")) {
        return null;
    }

    return <Footer />;
}