import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; 
import { redirect } from 'next/navigation';
import AdminNav from "@/app/components/admin-page/AdminNav/AdminNav";
import './style.css'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    // 1. Защита всей админки на сервере
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
        redirect('/login');     
    }

    return (
        <main className="admin-page-wrapper">
            <div className="admin-container">
                {/* Компонент переключения вкладок */}
                <AdminNav />
                
                {/* Сюда Next.js подставит контент текущего роута */}
                <div className="tab-content">
                    {children}
                </div>
            </div>
        </main>
    );
}