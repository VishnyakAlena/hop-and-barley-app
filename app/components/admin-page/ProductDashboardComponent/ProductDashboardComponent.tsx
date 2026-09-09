'use client'

import { useEffect, useMemo, useState } from 'react';
import './ProductDashboardComponentStyle.css'
import { allProductsInfo } from '@/app/store/slices/addProductsReviewsSlice';
import { useSelector } from 'react-redux';
import { allOrdersInfo } from '@/app/store/slices/userSlice';
import { Iproduct } from '@/app/types';

export default function ProductDashboard() {
    const allProducts = useSelector(allProductsInfo);
    const allOrders = useSelector(allOrdersInfo) || []; 
    const availableCategories = useMemo<string[]>(() => {
            const allCategories = allProducts.map((product: any) => product.category);
            const validCategories = allCategories.filter((category: string) => !!category);
            return Array.from(new Set(validCategories)).sort() as any;
        }, [allProducts]);
        
    const [activeCategory, setActiveCategory] = useState(availableCategories[0]);

    useEffect(() => {
        if (availableCategories.length > 0 && !activeCategory) {
            setActiveCategory(availableCategories[0]);
        }
    }, [availableCategories, activeCategory]);

    const stats = useMemo(() => {
        const now = new Date();
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const startOfYesterday = new Date(startOfToday);
        startOfYesterday.setDate(startOfYesterday.getDate() - 1);
        const startOfPastWeek = new Date(startOfToday);
        startOfPastWeek.setDate(startOfPastWeek.getDate() - 7);
        const startOfTwoWeeksAgo = new Date(startOfToday);
        startOfTwoWeeksAgo.setDate(startOfTwoWeeksAgo.getDate() - 14);
        const rawData = {
            sales: { today: 0, yesterday: 0, total: 0 },
            users: { today: new Set(), yesterday: new Set() },
            orders: { thisWeek: 0, pastWeek: 0 },
            pending: { today: 0, yesterday: 0 }
        };

        allOrders.forEach(order => {
            const orderDate = new Date(order.date);
            const categoryItems = order.items?.filter(item => item.product?.category === activeCategory) || [];
            if (categoryItems.length === 0) return;
            const orderCategorySales = categoryItems.reduce((sum, item) => sum + (item.totalPrice || 0), 0);
            const orderCategoryQuantity = categoryItems.filter(item => item.product?.category === activeCategory).length;
            const isPending = order.status === 'Pending';
            const userId = order.userId || order.number; 

            rawData.sales.total += orderCategorySales;

            if (orderDate >= startOfToday) {
                rawData.sales.today += orderCategorySales;
                rawData.users.today.add(userId);
                if (isPending) rawData.pending.today += 1;
            } else if (orderDate >= startOfYesterday && orderDate < startOfToday) {
                rawData.sales.yesterday += orderCategorySales;
                rawData.users.yesterday.add(userId);
                if (isPending) rawData.pending.yesterday += 1;
            }

            if (orderDate >= startOfPastWeek) {
                rawData.orders.thisWeek += orderCategoryQuantity;
            } else if (orderDate >= startOfTwoWeeksAgo && orderDate < startOfPastWeek) {
                rawData.orders.pastWeek += orderCategoryQuantity;
            }
        });

        const calculateDelta = (current: number, previous: number, label: string) => {
            if (current === previous) {
                return { 
                    percent: '0.0%', 
                    text: `No change from ${label}`, 
                    trend: 'neutral' 
                };
            }
            if (previous === 0) {
                return { 
                    percent: '100.0%', 
                    text: `Up from ${label}`, 
                    trend: 'up' 
                };
            }
            const percent = ((current - previous) / previous) * 100;
            const isUp = percent > 0;
            return {
                percent: `${Math.abs(percent).toFixed(1)}%`,
                text: `${isUp ? 'Up' : 'Down'} from ${label}`,
                trend: isUp ? 'up' : 'down'
            };
        };

        const salesDelta = calculateDelta(rawData.sales.today, rawData.sales.yesterday, 'yesterday');
        const usersDelta = calculateDelta(rawData.users.today.size, rawData.users.yesterday.size, 'yesterday');
        const ordersDelta = calculateDelta(rawData.orders.thisWeek, rawData.orders.pastWeek, 'past week');
        const pendingDelta = calculateDelta(rawData.pending.today, rawData.pending.yesterday, 'yesterday');
        const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
        const numberFormatter = new Intl.NumberFormat('en-US');

        return {
            totalSales: { value: currencyFormatter.format(rawData.sales.total), ...salesDelta },
            totalUser: { value: numberFormatter.format(rawData.users.today.size), ...usersDelta },
            totalOrder: { value: numberFormatter.format(rawData.orders.thisWeek), ...ordersDelta },
            totalPending: { value: numberFormatter.format(rawData.pending.today), ...pendingDelta }
        };
    }, [allOrders, activeCategory]);

    return (
        <div className="admin-content">
            <h1 className="admin-content__title">Admin - Dashboard</h1>
            <div className="category-tags">
                {availableCategories.map((categoryName) => (
                    <button 
                        key={categoryName} 
                        type="button" 
                        className={`category-tag ${categoryName === activeCategory ? 'active' : ''}`}
                        onClick={() => setActiveCategory(categoryName)}
                    >
                        {categoryName}
                    </button>
                ))}
            </div>
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-card__header">
                        <span className="stat-card__title">Total Sales</span>
                        <div className="stat-card__icon-wrapper" style={{ backgroundColor: '#e0f8e3' }}>
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://w3.org">
                                <path d="M3.11112 24.8889H26.4445C27.3036 24.8889 28.0001 25.5853 28.0001 26.4444C28.0001 27.3036 27.3036 28 26.4445 28H1.55556C0.696447 28 0 27.3036 0 26.4444V1.55556C0 0.696446 0.696447 0 1.55556 0C2.41467 0 3.11112 0.696446 3.11112 1.55556V24.8889Z" fill="#4AD991"/>
                                <path opacity="0.5" d="M8.91306 18.175C8.32548 18.8018 7.34106 18.8335 6.71431 18.2459C6.08756 17.6584 6.0558 16.674 6.64338 16.0472L12.4767 9.82498C13.045 9.21884 13.9893 9.16627 14.6213 9.7056L19.2254 13.6344L25.224 6.03611C25.7563 5.36181 26.7345 5.24673 27.4088 5.77907C28.0831 6.31141 28.1982 7.28959 27.6659 7.96389L20.6658 16.8306C20.1191 17.5231 19.1064 17.6227 18.4352 17.05L13.7311 13.0358L8.91306 18.175Z" fill="#4AD991"/>
                            </svg>
                        </div>
                    </div>
                    <p className="stat-card__value">{stats.totalSales.value}</p>
                    <div className="stat-card__delta" style={{ color: 'var(--black-main)' }}>
                        {stats.totalSales.trend === 'up' && (
                            <svg width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.5656 6L21.2227 8.29L15.5604 13.17L10.9192 9.17L2.32129 16.59L3.95732 18L10.9192 12L15.5604 16L22.8703 9.71L25.5274 12V6H18.5656Z" fill="#00B69B"/>
                            </svg>
                        )}
                        {stats.totalSales.trend === 'down' && (
                            <svg width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.5636 18L21.2207 15.71L15.5584 10.83L10.9172 14.83L2.31934 7.41L3.95537 6L10.9172 12L15.5584 8L22.8683 14.29L25.5254 12V18H18.5636Z" fill="#F93C65"/>
                            </svg>
                        )}
                        {stats.totalSales.trend === 'neutral' && (
                            <span>•</span>
                        )}
                        <span className={`delta--${stats.totalSales.trend}`}>{stats.totalSales.percent}</span>
                        <span> {stats.totalSales.text}</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-card__header">
                        <span className="stat-card__title">Total User</span>
                        <div className="stat-card__icon-wrapper" style={{ backgroundColor: '#e6e5ff' }}>
                            <svg width="32" height="24" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.587821" d="M24 6.66699C26.2091 6.66699 28 8.45785 28 10.667C27.9998 12.876 26.209 14.667 24 14.667C21.7912 14.6668 20.0002 12.8759 20 10.667C20 8.45798 21.7911 6.66719 24 6.66699ZM12.001 0C14.9462 0.000236067 17.3338 2.38778 17.334 5.33301C17.334 8.27838 14.9463 10.6668 12.001 10.667C9.05549 10.667 6.66699 8.27853 6.66699 5.33301C6.66717 2.38764 9.0556 0 12.001 0Z" fill="#8280FF"/>
                                <path d="M11.9784 13.3333C18.3619 13.3334 23.6061 16.3909 23.997 22.9329C24.0125 23.1935 23.9974 24.0002 22.996 24.0003H0.970595C0.636212 24.0003 -0.0272828 23.2786 0.000868138 22.932C0.517797 16.5686 5.68333 13.3333 11.9784 13.3333ZM23.4686 16.0023C28.0103 16.052 31.7186 18.3468 31.9979 23.1995C32.0092 23.395 31.9977 24.0003 31.2743 24.0003H26.1337C26.1337 20.9996 25.1416 18.2304 23.4686 16.0023Z" fill="#8280FF"/>
                            </svg>
                        </div>
                    </div>
                    <p className="stat-card__value">{stats.totalUser.value}</p>
                    <div className="stat-card__delta" style={{ color: 'var(--black-main)' }}>
                        {stats.totalUser.trend === 'up' && (
                            <svg width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.5656 6L21.2227 8.29L15.5604 13.17L10.9192 9.17L2.32129 16.59L3.95732 18L10.9192 12L15.5604 16L22.8703 9.71L25.5274 12V6H18.5656Z" fill="#00B69B"/>
                            </svg>
                        )}
                        {stats.totalUser.trend === 'down' && (
                            <svg width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.5636 18L21.2207 15.71L15.5584 10.83L10.9172 14.83L2.31934 7.41L3.95537 6L10.9172 12L15.5584 8L22.8683 14.29L25.5254 12V18H18.5636Z" fill="#F93C65"/>
                            </svg>
                        )}
                        {stats.totalUser.trend === 'neutral' && (
                            <span>•</span>
                        )}
                        <span className={`delta--${stats.totalUser.trend}`}>{stats.totalUser.percent}</span>
                        <span> {stats.totalUser.text}</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-card__header">
                        <span className="stat-card__title">Total Order</span>
                        <div className="stat-card__icon-wrapper" style={{ backgroundColor: '#fff0d4' }}>
                            <svg width="30" height="34" viewBox="0 0 30 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M0 11.3165L12.9003 18.7646C13.0392 18.8448 13.1849 18.9027 13.3332 18.9395V33.3847L0.920054 26.0385C0.34978 25.701 0 25.0876 0 24.4249V11.3165ZM30 11.1185V24.4249C30 25.0876 29.6502 25.701 29.08 26.0385L16.6669 33.3847V18.8129C16.6971 18.7978 16.7271 18.7817 16.7567 18.7646L30 11.1185Z" fill="#FEC53D"/>
                                <path opacity="0.499209" fillRule="evenodd" clipRule="evenodd" d="M0.40625 7.70142C0.563823 7.50244 0.762709 7.33426 0.994585 7.21076L14.1194 0.2201C14.6704 -0.0733665 15.3313 -0.0733665 15.8823 0.2201L29.0071 7.21076C29.1859 7.30596 29.345 7.42771 29.4807 7.56966L15.0907 15.8778C14.9961 15.9325 14.9089 15.995 14.8294 16.064C14.7499 15.995 14.6626 15.9325 14.568 15.8778L0.40625 7.70142Z" fill="#FEC53D"/>
                            </svg>
                        </div>
                    </div>
                    <p className="stat-card__value">{stats.totalOrder.value}</p>
                    <div className="stat-card__delta" style={{ color: 'var(--black-main)' }}>
                        {stats.totalOrder.trend === 'up' && (
                            <svg width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.5656 6L21.2227 8.29L15.5604 13.17L10.9192 9.17L2.32129 16.59L3.95732 18L10.9192 12L15.5604 16L22.8703 9.71L25.5274 12V6H18.5656Z" fill="#00B69B"/>
                            </svg>
                        )}
                        {stats.totalOrder.trend === 'down' && (
                            <svg width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.5636 18L21.2207 15.71L15.5584 10.83L10.9172 14.83L2.31934 7.41L3.95537 6L10.9172 12L15.5584 8L22.8683 14.29L25.5254 12V18H18.5636Z" fill="#F93C65"/>
                            </svg>
                        )}
                        {stats.totalOrder.trend === 'neutral' && (
                            <span>•</span>
                        )}
                        <span className={`delta--${stats.totalOrder.trend}`}>{stats.totalOrder.percent}</span>
                        <span> {stats.totalOrder.text}</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-card__header">
                        <span className="stat-card__title">Total Pending</span>
                        <div className="stat-card__icon-wrapper" style={{ backgroundColor: '#ffe6e0' }}>
                            <svg width="28" height="30" viewBox="0 0 28 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.78" fillRule="evenodd" clipRule="evenodd" d="M12.6309 9.00345C12.651 8.74295 12.8682 8.5418 13.1294 8.5418H13.5472C13.8041 8.5418 14.0192 8.73645 14.0448 8.99205L14.6664 15.2085L19.0811 17.7312C19.2369 17.8202 19.333 17.9859 19.333 18.1653V18.5538C19.333 18.8835 19.0195 19.123 18.7015 19.0362L12.3984 17.3172C12.167 17.2541 12.0131 17.0356 12.0315 16.7965L12.6309 9.00345Z" fill="#FF9066"/>
                                <path opacity="0.901274" d="M5.85254 0.384692C5.94786 -0.0149336 6.45755 -0.135996 6.72168 0.178638L8.52051 2.32317C10.2036 1.60647 12.0552 1.20894 14 1.20891L14.3613 1.21282C21.9263 1.40434 28 7.59765 28 15.2089C27.9998 22.9407 21.7317 29.2089 14 29.2089C6.26837 29.2088 0.000239401 22.9406 0 15.2089C0 13.8958 0.181483 12.624 0.519531 11.4189L3.08691 12.1396C2.80948 13.1287 2.66699 14.1582 2.66699 15.2089C2.66723 21.4679 7.74111 26.5418 14 26.5419C20.259 26.5419 25.3328 21.4679 25.333 15.2089C25.333 8.94968 20.2592 3.87493 14 3.87493C12.7318 3.87495 11.4968 4.08335 10.332 4.48137L12.1328 6.62786C12.3972 6.94303 12.1889 7.42457 11.7783 7.44817L4.7334 7.84758C4.39915 7.86652 4.14107 7.558 4.21875 7.23235L5.85254 0.384692Z" fill="#FF9066"/>
                            </svg>
                        </div>
                    </div>
                    <p className="stat-card__value">{stats.totalPending.value}</p>
                    <div className="stat-card__delta" style={{ color: 'var(--black-main)' }}>
                        {stats.totalPending.trend === 'up' && (
                            <svg width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.5656 6L21.2227 8.29L15.5604 13.17L10.9192 9.17L2.32129 16.59L3.95732 18L10.9192 12L15.5604 16L22.8703 9.71L25.5274 12V6H18.5656Z" fill="#00B69B"/>
                            </svg>
                        )}
                        {stats.totalPending.trend === 'down' && (
                            <svg width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.5636 18L21.2207 15.71L15.5584 10.83L10.9172 14.83L2.31934 7.41L3.95537 6L10.9172 12L15.5584 8L22.8683 14.29L25.5254 12V18H18.5636Z" fill="#F93C65"/>
                            </svg>
                        )}
                        {stats.totalPending.trend === 'neutral' && (
                            <span>•</span>
                        )}
                        <span className={`delta--${stats.totalPending.trend}`}>{stats.totalPending.percent}</span>
                        <span> {stats.totalPending.text}</span>
                    </div>
                </div>
            </div>
        </div> 
    )
}