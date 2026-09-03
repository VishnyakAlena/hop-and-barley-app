import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; 
import { redirect } from 'next/navigation';
import AccountPageComponent from '@/app/components/account-page/AccountPageComponent/AccountPageComponent';
import './accountStyle.css';

interface PageProps {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ tab?: string }>;
}


export default async function AccountPage({ params, searchParams }: PageProps) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
        redirect('/');     
    }

    // 2. Разрешаем асинхронные параметры роутинга Next.js 15
    const { id } = await params;
    const resolvedSearchParams = await searchParams;
    const currentTab = resolvedSearchParams.tab || 'info';
    return (
        <main className="account-page-wrapper">
            <AccountPageComponent userId={id} currentTab={currentTab} />
        </main>
    )
}