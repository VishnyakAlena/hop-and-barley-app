'use client'

import { IOrder } from "@/app/types";
import './OrderHistoryStyle.css'

interface OrderHistoryProps {
        orders: IOrder[]; 
    }

export default function OrderHistory({ orders }: OrderHistoryProps) {
    
    if (orders.length === 0) {
        return (
            <div className="no-orders text-gray-500">
                You haven't placed any orders yet.
            </div>
        )
    }
    
    const sortedOrders = [...orders].reverse();

    return (
            <div className="order-history-table">
                <div className="order-table-header">
                    <div className="order-table-cell">Order Details</div>
                    <div className="order-table-cell">Order Status</div>
                    <div className="order-table-cell">Total</div>
                </div>
                <div className="order-table-body">
                    {sortedOrders.map((order) => {
                    // 🌟 Настройки для красивого текстового формата даты
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
    )
}