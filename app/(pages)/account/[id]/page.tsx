import AccountPageComponent from '@/app/components/account-page/AccountPageComponent/AccountPageComponent';
import './accountStyle.css';

interface PageProps {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ tab?: string }>;
}

export default async function AccountPage({ params, searchParams }: PageProps) {

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