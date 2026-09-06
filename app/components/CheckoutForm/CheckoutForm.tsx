'use client'

import { useAppDispatch, useAppSelector } from '@/app/store/storeHooks';
import './checkoutStyle.css'
import { clearCart, selectTotalCartPrice } from '@/app/store/slices/cartSlice';
import { useRouter } from 'next/navigation';
import { profileSchema } from '@/app/schemas/schemas';
import { useState } from 'react';
import { addOrderToHistory } from '@/app/store/slices/userSlice';
import { IOrder } from '@/app/types';

export default function CheckoutForm() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { products } = useAppSelector((state) => state.cart); 
    const totalCartPrice = useAppSelector(selectTotalCartPrice);
    const user = useAppSelector((state) => state.user.currentUser);
    const [paymentMethod, setPaymentMethod] = useState('debit');
    const [formErrors, setFormErrors] = useState<{ fullName?: string; phone?: string; city?: string; address?: string }>({});
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [isSubmitting, setIsPending] = useState(false);
    const handlePlaceOrder = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isSubmitting) return; 

        setFormErrors({});
        setSubmitError(null);
        setIsPending(true);

        const formData = new FormData(e.currentTarget);
        const fullName = String(formData.get('fullName') || '');
        const phone = String(formData.get('phone') || '');
        const city = String(formData.get('city') || '');
        const address = String(formData.get('address') || '');

        // Валидация по нашей profileSchema (пропускает пустые строки для необязательных полей)
        const validation = profileSchema.safeParse({ full_name: fullName, phone, city, address });
        if (!validation.success) {
            const fieldErrors = validation.error.flatten().fieldErrors;
            setFormErrors({
                fullName: fieldErrors.full_name?.[0],
                phone: fieldErrors.phone?.[0],
                city: fieldErrors.city?.[0],
                address: fieldErrors.address?.[0],
            });
            setIsPending(false);
            return;
        }

        // 2. Объединяем информацию о доставке, оплате и товары из корзины Redux
        const fullOrderPayload = {
            user: {
                id: user?.id,
                email: user?.email,
                fullName,
                phone,
                city,
                address,
                paymentMethod
            },
            items: products, // Ваши ICartProduct[] из Redux
            totalPrice: totalCartPrice, // Ваша итоговая стоимость из Redux
            createdAt: new Date().toISOString()
        };

        try {
        // 1. Отправляем сам заказ на сервер
        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(fullOrderPayload),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Failed to create order");
        }

        await fetch('/api/cart', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ clearAll: true }) 
        }).catch(err => console.error("Ошибка сброса серверной корзины:", err));
        
        console.log("=== КЛИЕНТ: Сигнал полной очистки успешно передан бэкенду ===");

        // 3. Формируем объект для истории заказов в Redux (IOrder)
        const numericOrderId = result.orderId 
            ? parseInt(result.orderId.replace(/\D/g, ''), 10) 
            : Math.floor(100000 + Math.random() * 900000);

        const newFinishedOrder: IOrder = {
            number: numericOrderId,  
            userId: user?.id ? Number(user.id) : 0,                
            date: new Date().toISOString(),  
            status: 'Pending' as const, 
            items: products,                        
            totalPrice: totalCartPrice,             
            paymentMethod: paymentMethod            
        };

        // 4. Очищаем локальный Redux стейт и добавляем заказ в историю
        dispatch(addOrderToHistory(newFinishedOrder));
        dispatch(clearCart()); // Счетчик на клиенте падает в 0

        // 5. Перенаправляем пользователя в личный кабинет на историю заказов
        router.push(`/account/${user?.id}?tab=orders&success=true`);

    } catch (err: any) {
        setSubmitError(err.message || "Something went wrong.");
    } finally {
        setIsPending(false);
    }
    };

    // Защита: если корзина пустая, выводим заглушку вместо формы
    if (!products || products.length === 0) {
        return (
            <div className="checkout-empty-state flex flex-col items-start justify-start text-center py-6">
                <h2 className="cart-title text-xl text-gray-500">No items to checkout.</h2>
                <button type="button" onClick={() => router.push('/')} className="button button--primary mt-4">
                    Go to catalog
                </button>
            </div>
        );
    }

    return (
        <div className="checkout-form-inner">
            {submitError && (
                <div className="p-3 bg-red-50 text-grey-600 rounded-lg text-sm text-center font-medium mb-4">
                    {submitError}
                </div>
            )}

            <form id="checkout-form" onSubmit={handlePlaceOrder} noValidate>
                        <section className="checkout-section">
                            <h2 className="checkout-section__title">Shipping information</h2>
                            <div className="checkout-form-group">
                                <label htmlFor="full-name">Full Name</label>
                                <input 
                                    type="text" 
                                    id="fullName" 
                                    name="fullName" 
                                    className="Input" 
                                    placeholder="Value"  
                                    defaultValue={user?.name || ""}
                                    required 
                                />
                                {formErrors.fullName && <span className="text-grey-500 text-sm mt-1 block">{formErrors.fullName}</span>}
                            </div>
                            <div className="checkout-form-group">
                                <label htmlFor="phone">Phone number</label>
                                <input 
                                    type="tel" 
                                    id="phone" 
                                    name="phone" 
                                    className="Input" 
                                    placeholder="Value" 
                                    defaultValue={user?.phone || ""}
                                    required 
                                />
                                {formErrors.phone && <span className="text-grey-500 text-sm mt-1 block">{formErrors.phone}</span>}
                            </div>
                            <div className="checkout-form-group">
                                <label htmlFor="city">City</label>
                                <input 
                                    type="text" 
                                    id="city" 
                                    name="city" 
                                    className="Input" 
                                    placeholder="Value"
                                    defaultValue={user?.city || ""} 
                                    required 
                                />
                                {formErrors.city && <span className="text-grey-500 text-sm mt-1 block">{formErrors.city}</span>}
                            </div>
                            <div className="checkout-form-group">
                                <label htmlFor="address">Shipping address</label>
                                <textarea 
                                    id="address" 
                                    name="address" 
                                    className="Textarea" 
                                    placeholder="Value" 
                                    rows={3} 
                                    defaultValue={user?.address || ""}
                                    required
                                ></textarea>
                                {formErrors.address && <span className="text-grey-500 text-sm mt-1 block">{formErrors.address}</span>}
                            </div>
                        </section>

                        <section className="checkout-section">
                            <h2 className="checkout-section__title">Payment Method</h2>
                            <div className="payment-options">
                                <label className="radio-option">
                                    <input 
                                        type="radio" 
                                            name="payment_method" 
                                            value="debit" 
                                            checked={paymentMethod === 'debit'} 
                                            onChange={(e) => setPaymentMethod(e.target.value)} 
                                        />
                                    <span className="radio-custom"></span>
                                    <span className="radio-label">Debit Card</span>
                                </label>
                                <label className="radio-option">
                                    <input 
                                        type="radio" 
                                        name="payment_method" 
                                        value="wallet" 
                                        checked={paymentMethod === 'wallet'} 
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    />
                                    <span className="radio-custom"></span>
                                    <span className="radio-label">Digital Wallet</span>
                                </label>
                                <label className="radio-option">
                                    <input 
                                        type="radio" 
                                        name="payment_method" 
                                        value="cod" 
                                        checked={paymentMethod === 'cod'} 
                                        onChange={(e) => setPaymentMethod(e.target.value)} 
                                    />
                                    <span className="radio-custom"></span>
                                    <span className="radio-label">Cash On Delivery</span>
                                </label>
                            </div>
                        </section>

                        <section className="checkout-summary">
                            <h2 className="checkout-section__title">Order Summary</h2>
                            <div className="summary-details">
                                <div className="summary-total">
                                    <p>Total</p>
                                    <p>${totalCartPrice.toFixed(2)}</p>
                                </div>
                                <button type="submit" className="button button--primary button--pay">Pay</button>
                            </div>
                        </section>
                    </form>
                </div>
    )
}