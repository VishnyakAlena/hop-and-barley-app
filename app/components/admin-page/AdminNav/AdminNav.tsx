'use client';
import Link from 'next/link'; 
import { usePathname } from 'next/navigation';
import './AdminNavStyle.css'

export default function AdminNav() {
    const pathname = usePathname();

    // Проверяем, на каком URL находится пользователь
    const isDashboard = pathname === '/admin/dashboard';
    const isManagement = pathname.startsWith('/admin/products');

    return (
        <div className="admin-tabs">
            <Link href="/admin/products">
                <button className={`admin-tab ${isManagement ? 'active' : ''}`}>
                    Product Management
                </button>
            </Link>
            <Link href="/admin/dashboard">
                <button className={`admin-tab ${isDashboard ? 'active' : ''}`}>
                    Dashboard
                </button>
            </Link>
        </div>
    );
}