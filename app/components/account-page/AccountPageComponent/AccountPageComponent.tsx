'use client'

import { useAppSelector } from '@/app/store/storeHooks';
import Link from 'next/link'; 
import OrderHistory from "../OrderHistory/OrderHistory";
import AccountInfoForm from "../AccountInfoForm/AccountInfoForm";

interface AccountPageComponentProps {
    userId: string; // Описываем, что ждем строковый ID от сервера
    currentTab: string;
}

export default function AccountPageComponent({ currentTab }: AccountPageComponentProps) {
    const user = useAppSelector((state) => state.user.currentUser);

    return (
        <div className="account-container">
        <div className="account-tabs">
                    <Link href={`/account/${user?.id}?tab=orders`} scroll={false}>
                        <button className={`account-tab ${currentTab === 'orders' ? 'active' : ''}`}>Order History</button>
                    </Link>
                    <Link href={`/account/${user?.id}?tab=info`} scroll={false}>
                        <button className={`account-tab ${currentTab === 'info' ? 'active' : ''}`}>Account Information</button>
                    </Link>
                </div>
                <div className="tab-content">
                    <div id="order-history" className={`tab-pane ${currentTab === 'orders' ? 'active' : ''}`}>
                        {currentTab === 'orders' && (
                            <OrderHistory orders={user?.orders || []} />
                        )}
                    </div>
                    <div id="order-history" className={`tab-pane ${currentTab === 'info' ? 'active' : ''}`}>
                        {currentTab === 'info' && (
                            <AccountInfoForm />
                        )}
                    </div>
                </div>
            </div>
    )
}