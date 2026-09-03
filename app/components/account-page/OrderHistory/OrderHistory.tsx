import { IOrder } from "@/app/types";
import './OrderHistoryStyle.css'

interface OrderHistoryProps {
        orders: IOrder[]; 
    }

export default function OrderHistory({ orders }: OrderHistoryProps) {
    
    if (orders.length === 0) {
        return <div className="no-orders text-gray-500">You haven't placed any orders yet.</div>;
    }
    return (
            <div className="order-history-table">
                <div className="order-table-header">
                    <div className="order-table-cell">Order Details</div>
                    <div className="order-table-cell">Order Status</div>
                    <div className="order-table-cell">Total</div>
                </div>
                <div className="order-table-body">
                    <div className="order-table-row">
                        <div className="order-table-cell">
                            <span className="order-id">#123232122033</span>
                            <span className="order-date">7 Mar 2025</span>
                        </div>
                        <div className="order-table-cell">
                            <span className="order-status">Pending</span>
                        </div>
                        <div className="order-table-cell">
                            <span className="order-total">$100.00</span>
                        </div>
                    </div>
                </div>
            </div>
    )
}