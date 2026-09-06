'use client'

import Image from 'next/image'
import { Iproduct, IReviewFull } from '../../types'
import { useEffect, useState } from 'react'
import './ProductPageStyle.css'
import { useCartActions } from '@/app/hooks/useCartActions'
import { allProductsInfo } from '@/app/store/slices/productSlice'
import { useAppSelector } from '@/app/store/storeHooks'

type PropsType = {
    product: Iproduct
}

function ProductPageComponent({product}:PropsType) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);
    const { addToCart, removeFromCart } = useCartActions(); 
    const { products } = useAppSelector((state) => state.cart)
    const cartProduct = products.find(item => item.id === product.id)

    const [isOpen, setIsOpen] = useState(false);
    const allProductsWithReviews = useAppSelector(allProductsInfo);
    
    // Находим текущий товар в этом обогащенном массиве
    const productWithReview = allProductsWithReviews.find(p => p.id === product.id);
    
    // Достаем готовые отзывы (если товара или отзывов нет — ставим пустой массив)
    const reviews = productWithReview?.latestReviews || [];

    return (
        <main className="page-product">
            <div className="product-container container">
                <section className="product-details-section" data-testid={product.id}>
                    <div className="product-image-container">
                        <Image 
                            className='product-image'
                            src={product.image} 
                            fill
                            sizes="(max-width: 640px) 100vw, 50vw"
                            alt={product.name}
                            loading="eager"
                        />
                    </div>
                    <div className="product-info-column">
                        <div className="product-title-price">
                            <h1 className="product-name">{product.name}</h1>
                            <div className="price-section">
                                <span className="price-tag">{product.unitMetrics}</span>
                                <p className="product-price">${Number(product.price).toFixed(2)}</p>
                            </div>
                        </div>
                        <div className='product-description'>
                            {product.description.map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>
                        <div className="cart-controls">
                            {cartProduct ? 
                                    <div className="quantity-counter">
                                        <button className="quantity-btn" onClick={() => removeFromCart(product)}>
                                            <svg width="11" height="2" viewBox="0 0 11 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0.799988 0.800003H10.1333" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </button>
                                        <span className="quantity-value">{cartProduct.quantity} in cart</span>
                                        <button className="quantity-btn" onClick={() => addToCart(product)}>
                                            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M5.46665 0.800003V10.1333M0.799988 5.46667H10.1333" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </button>
                                    </div> : <button className="button button--primary add-to-cart-button" onClick={() => addToCart(product)}>Add to cart</button>
                            }
                        </div>
                        
                    </div>
                </section>
                <section className="accordion-section">
                            <div className={`accordion-item ${isOpen ? 'active' : ''}`}>
                                <div 
                                    className="accordion-title"
                                    onClick={() => setIsOpen(!isOpen)} 
                                    style={{ cursor: 'pointer', userSelect: 'none' }}
                                >
                                    <h3>Technical Specifications</h3>
                                    <svg className="fa-solid fa-chevron-down accordion-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 7.5L10 12.5L15 7.5" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    
                                </div>
                                
                                {isOpen && (
                                    <div className="accordion-content">
                                        <ul>
                                            {product.technicalSpecifications?.map((spec, index) => (
                                                    <li key={index}>
                                                        <strong>{spec.label}:</strong>{' '}
                                                        {spec.value}
                                                    </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </section>
                        <section className="reviews-section">
                            <h2 className="reviews-title">Latest reviews</h2>
                            <div className="reviews-grid">
                                {reviews.map((review: IReviewFull) => (
                                    <div key={review.id} className="review-card">
                                        <div className="review-rating">
                                            {/* 1. Генерируем ЗАКРАШЕННЫЕ звёзды */}
                                            {[...Array(review.rating)].map((_, index) => (
                                                <svg key={index} className="star-icon star-icon--filled" viewBox="0 0 24 24" width="18" height="18">
                                                    <path d="M12 2a1 1 0 0 1 .93.64l2.28 4.93 5.38.45a1 1 0 0 1 .57 1.74l-4 3.65 1.19 5.3a1 1 0 0 1-1.49 1.08L12 17.15l-4.86 2.64a1 1 0 0 1-1.49-1.08l1.19-5.3-4-3.65a1 1 0 0 1 .57-1.74l5.38-.45 2.28-4.93A1 1 0 0 1 12 2z" />
                                                    </svg>
                                                ))}

                                            {/* 2. Генерируем ПУСТЫЕ (контурные) звёзды до 5 штук */}
                                            {[...Array(5 - review.rating)].map((_, index) => (
                                                <svg key={index} className="star-icon star-icon--empty" viewBox="0 0 24 24" width="18" height="18">
                                                    <path 
                                                        d="M12 2a1 1 0 0 1 .93.64l2.28 4.93 5.38.45a1 1 0 0 1 .57 1.74l-4 3.65 1.19 5.3a1 1 0 0 1-1.49 1.08L12 17.15l-4.86 2.64a1 1 0 0 1-1.49-1.08l1.19-5.3-4-3.65a1 1 0 0 1 .57-1.74l5.38-.45 2.28-4.93A1 1 0 0 1 12 2z" 
                                                        fill="none"
                                                        stroke="#ffb100"
                                                        strokeWidth="2"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            ))}
                                        </div>
                                        <div className="review-body">
                                            <h4 className="review-heading">{review.title}</h4>
                                            <p className="review-text">{review.comment}</p>
                                        </div>
                                        <div className="review-author">
                                            <Image 
                                                src={isMounted ? review.userImage : "/images/icons/User_alt.svg"} 
                                                alt={isMounted ? review.userImage : "/images/icons/User_alt.svg"} 
                                                width={40} 
                                                height={40} 
                                                className="author-avatar" />
                                            <span className="author-name">{isMounted ? review.userName : "Anonymous User"}</span>
                                        </div>

                                    </div>
                                ))}
                            </div>
                        </section>
            </div>
        </main>
    )
}

export default ProductPageComponent