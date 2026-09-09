"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer"; // Путь к вашему настоящему компоненту футера

export default function DynamicFooter() {
    const pathname = usePathname();
    if (pathname.startsWith("/admin")) {
        return null;
    }
    return <Footer />;
}