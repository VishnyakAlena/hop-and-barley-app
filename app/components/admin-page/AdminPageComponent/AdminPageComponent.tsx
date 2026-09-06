'use client'

import Link from 'next/link'; 
import ProductManagement from '../ProductManagementComponent/ProductManagementComponent';
import { useSelector } from 'react-redux';
import { allProductsInfo } from '@/app/store/slices/productSlice';
import './AdminPageComponentStyle.css'
import dynamic from 'next/dynamic'; // 1. Импортируем утилиту

// 2. Импортируем дашборд динамически с отключением SSR
const ProductDashboard = dynamic(
    () => import("@/app/components/admin-page/ProductDashboardComponent/ProductDashboardComponent"), // укажите ваш точный путь до дашборда
    { ssr: false } // Здесь это РАЗРЕШЕНО, так как компонент клиентский!
);


interface AdminPageComponentProps {
    productId: string; // Описываем, что ждем строковый ID от сервера
    currentTab: string;
}

export default function AdminPageComponent({ productId, currentTab }: AdminPageComponentProps) {
    const allProducts = useSelector(allProductsInfo);

    return (
        <div className="admin-container">
            <div className="admin-tabs">
                <Link href={`/admin?tab=management`} scroll={false}>
                    <button className={`admin-tab ${currentTab === 'management' ? 'active' : ''}`}>Product Management</button>
                </Link>
                <Link href={`/admin?tab=dashboard`} scroll={false}>
                    <button className={`admin-tab ${currentTab === 'dashboard' ? 'active' : ''}`}>Dashboard</button>
                </Link>
            </div>
            <div className="tab-content">
                <div id="product-management" className={`tab-pane ${currentTab === 'management' ? 'active' : ''}`}>
                    {currentTab === 'management' && (
                        <ProductManagement  products={allProducts} />
                    )}
                </div>
                <div id="product-dashboard" className={`tab-pane ${currentTab === 'dashboard' ? 'active' : ''}`}>
                    {currentTab === 'dashboard' && (
                        <ProductDashboard />
                    )}
                </div>
            </div>
        </div>
    )
}