'use client';
import {  Suspense } from "react";
import Image from "next/image";

import dynamic from 'next/dynamic';

const HomeCatalogContentNoSSR = dynamic(
    () => import('@/app/components/main-page/HomeCatalogContent'), // Укажи точный путь к файлу каталога
    { ssr: false } // 🌟 ПОЛНОСТЬЮ ОТКЛЮЧАЕТ SSR ДЛЯ ЭТОГО КОМПОНЕНТА
);

export default function Home() {
    return (
        <main>
            <section className="hero-banner">
                <Image src="/images/background/hopfen-fields.jpg" width={1312} height={400} alt="Beautiful hops on a dark background" className="hero-banner__image" priority />
                <div className="hero-banner__overlay"></div>
            </section>
            <Suspense fallback={<div className="container text-center py-12">Loading catalog...</div>}>
                <HomeCatalogContentNoSSR />
            </Suspense>
        </main>
    );
}
