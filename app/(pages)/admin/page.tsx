import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; 
import { redirect } from 'next/navigation';
import AdminPageComponent from "@/app/components/admin-page/AdminPageComponent/AdminPageComponent";


interface PageProps {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ tab?: string }>;
}


export default async function AdminPage({ params, searchParams }: PageProps) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
        redirect('/login');     
    }

    // 2. Разрешаем асинхронные параметры роутинга Next.js 15
    const { id } = await params;
    const resolvedSearchParams = await searchParams;
    const currentTab = resolvedSearchParams.tab || 'dashboard';
    return (
        <main className="admin-page-wrapper">
            <AdminPageComponent productId={id} currentTab={currentTab} />
        </main>
    )
}