'use client'

import { useAppSelector } from '@/app/store/storeHooks';
import './checkoutStyle.css'
import { selectTotalCartPrice } from '@/app/store/slices/cartSlice';

export default function CheckoutForm() {
    const totalCartPrice = useAppSelector(selectTotalCartPrice);
    const user = useAppSelector((state) => state.user.currentUser);

    return (
        <form id="checkout-form">
                    <section className="checkout-section">
                        <h2 className="checkout-section__title">Shipping information</h2>
                        <div className="checkout-form-group">
                            <label htmlFor="full-name">Full Name</label>
                            <input 
                                type="text" 
                                id="full-name" 
                                name="full_name" 
                                className="Input" 
                                placeholder="Value"  
                                defaultValue={user?.name || ""}
                                required 
                            />
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
                        </div>
                    </section>

                    <section className="checkout-section">
                        <h2 className="checkout-section__title">Payment Method</h2>
                        <div className="payment-options">
                            <label className="radio-option">
                                <input type="radio" name="payment_method" value="debit" checked />
                                <span className="radio-custom"></span>
                                <span className="radio-label">Debit Card</span>
                            </label>
                            <label className="radio-option">
                                <input type="radio" name="payment_method" value="wallet" />
                                <span className="radio-custom"></span>
                                <span className="radio-label">Digital Wallet</span>
                            </label>
                            <label className="radio-option">
                                <input type="radio" name="payment_method" value="cod" />
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
    )
}