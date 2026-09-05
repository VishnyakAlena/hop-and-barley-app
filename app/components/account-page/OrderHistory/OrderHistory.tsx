'use client'

import { IOrder } from "@/app/types";
import './OrderHistoryStyle.css'
import { useRouter, useSearchParams } from "next/navigation";
import Link from 'next/link'; 

interface OrderHistoryProps {
        orders: IOrder[]; 
    }

export default function OrderHistory({ orders }: OrderHistoryProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const sortedOrders = [...orders].reverse();

    const pageParam = searchParams.get("page");
    const currentPage = pageParam ? parseInt(pageParam, 10) : 1;
    const itemsPerPage = 8; // Жесткое ограничение в 8 элементов

    const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
    const indexOfLastItem = indexOfFirstItem + itemsPerPage;
    
    // Срезаем ровно 8 заказов для текущей страницы
    const currentOrders = sortedOrders.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);

    // Функция переключения страницы в URL
    const changePage = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", String(newPage));
        
        // Меняем адрес, добавляя ?page=номер
        router.push(`?${params.toString()}`);
        
        // Плавно прокручиваем вверх к началу таблицы истории
        window.scrollTo({ top: 200, behavior: 'smooth' });
    };

    const handleNextPage = (e: React.MouseEvent) => {
        e.preventDefault();
        if (currentPage < totalPages) changePage(currentPage + 1);
    };

    const handlePrevPage = (e: React.MouseEvent) => {
        e.preventDefault();
        if (currentPage > 1) changePage(currentPage - 1);
    };


    if (orders.length === 0) {
        return (
            <div className="no-orders text-gray-500">
                You haven't placed any orders yet.
            </div>
        )
    }

    return (
        <>
            <div className="order-history-table">
                <div className="order-table-header">
                    <div className="order-table-cell">Order Details</div>
                    <div className="order-table-cell">Order Status</div>
                    <div className="order-table-cell">Total</div>
                </div>
                <div className="order-table-body">
                    {currentOrders.map((order) => {
                    const dateOptions: Intl.DateTimeFormatOptions = {
                        day: 'numeric',
                        month: 'short', // Показывает "мар." или "сент." (в зависимости от языка)
                        year: 'numeric'
                    };

                    // Превращаем ISO-строку времени в "3 сент. 2026 г." или на английском "Sep 3, 2026"
                    // Чтобы формат был строго на английском (как у вас в макете "7 Mar 2025"), используем 'en-US'
                    const formattedDate = new Date(order.date).toLocaleDateString('en-US', dateOptions);

                    return (
                        <div className="order-table-row" key={order.number}>
                            {/* Ячейка 1: Детали заказа */}
                            <div className="order-table-cell">
                                <span className="order-id">#{order.number}</span>
                                <span className="order-date">{formattedDate}</span>
                            </div>
                            
                            {/* Ячейка 2: Статус заказа */}
                            <div className="order-table-cell">
                                <span className="order-status">
                                    {order.status}
                                </span>
                            </div>
                            
                            {/* Ячейка 3: Итоговая стоимость */}
                            <div className="order-table-cell">
                                <span className="order-total">${Number(order.totalPrice).toFixed(2)}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
        {totalPages > 1 && (
                <div className="pagination pagination--orders mt-6 flex justify-between items-center">
                    {/* Кнопка НАЗАД */}
                    <Link 
                        href={`?page=${currentPage - 1}`}  
                        className={`pagination__link pagination__link--prev ${currentPage === 1 ? 'disabled' : ''}`} 
                        onClick={handlePrevPage}
                    >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://w3.org">
                            <path d="M10.3333 5.66667H1M5.66667 1L1 5.66667L5.66667 10.3333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Previous</span>
                    </Link>

                    {/* Кнопка ВПЕРЕД */}
                    <Link 
                        href={`?page=${currentPage + 1}`}  
                        className={`pagination__link pagination__link--next ${currentPage === totalPages ? 'disabled' : ''}`} 
                        onClick={handleNextPage}
                    >
                        <span>Next</span>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://w3.org">
                            <path d="M1.66667 5.66667H11M6.33333 1L11 5.66667L6.33333 10.3333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </Link>
                </div>
            )}
        </>    
    )
}