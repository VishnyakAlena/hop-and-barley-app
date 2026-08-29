'use client'

import { useAppDispatch, useAppSelector } from "../store/storeHooks"
import Image from 'next/image'
import './cartStyle.css'
import Link from 'next/link'; 
import { useEffect } from "react";
import { selectTotalCartPrice, setCart } from "../store/slices/cartSlice";
import { useCartActions } from "../hooks/useCartActions";

export default function CartPage() {
    const dispatch = useAppDispatch()
    const { products } = useAppSelector((state) => state.cart)
    const { addToCart, removeFromCart, clearProductFromCart } = useCartActions();
    useEffect(() => {
        fetch('/api/cart')
            .then(res => res.json())
            .then(data => dispatch(setCart(data)))
            .catch(err => console.error(err));
    }, [dispatch])

    const totalCartPrice = useAppSelector(selectTotalCartPrice);

    if (products.length === 0) {
        return (
            <main className="cart-page-wrapper">
                <div className="cart-container">
                    <h2 className="cart-title cart-empty">Your cart is empty</h2>
                </div>;
            </main>
        )
    }

    return (
        <main className="cart-page-wrapper">
            <div className="cart-container">
                <h1 className="cart-title">Shopping Cart</h1>
                    <div className="cart-items-list">
                        {products.map(item => <div className="cart-item">
                            <div></div>
                            <Image 
                                src={item.product.image} 
                                alt={item.product.name} 
                                width={160} 
                                height={160}
                                className='cart-item__image'
                            />
                            <div className="cart-item__body">
                                <div className="cart-item__details">
                                    <h2 className="cart-item__name">{item.product.name}</h2>
                                    <div className="cart-item__price-info">
                                        <p className="cart-item__price" data-item-total-price>
                                            ${Number(item.totalPrice).toFixed(2)}
                                        </p>
                                        <span className="cart-item__price-tag">{item.product.unitMetrics}</span>
                                    </div>
                                </div>
                                <div className="cart-item__actions">
                                    <div className="cart-item__quantity-selector">
                                        <button className="quantity-btn-cart" onClick={() => removeFromCart(item.product)}>
                                            <svg width="11" height="2" viewBox="0 0 11 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0.799988 0.800003H10.1333" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                        </button>
                                        <span className="quantity-value-cart">{item.quantity}</span>
                                        <button className="quantity-btn-cart" onClick={() => addToCart(item.product)}>
                                            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M5.46665 0.800003V10.1333M0.799988 5.46667H10.1333" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </button>
                                    </div>
                                        <button 
                                            className="button--remove" 
                                            onClick={() => clearProductFromCart(item.product)}
                                        >
                                            Remove 
                                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9 1L1 9M1 1L9 9" stroke="currentColor"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 0.2s ease' }}/>
                                            </svg>
                                        </button>
                                </div>
                            </div>
                        </div>)}
                        <div className="cart-summary">
                            <div className="cart-summary__total">
                                <p>Total price:</p>
                                <p>${totalCartPrice.toFixed(2)}</p>
                            </div>
                            <Link href="/checkout" className="button button--primary button--checkout">Proceed to Checkout</Link>
                        </div>
                    </div>
                
            </div>
        </main>
    )
}