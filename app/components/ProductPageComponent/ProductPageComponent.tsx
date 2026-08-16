'use client'

import Image from 'next/image'
import { ICartProduct, Iproduct, IReviewFull, IUserMock } from '../../types'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '../../store/storeHooks'
import { addProduct, removeProduct } from '../../store/slices/cartSlice'
import { useEffect, useState } from 'react'
import './ProductPageStyle.css'

type PropsType = {
    product: Iproduct
}

function ProductPageComponent({product}:PropsType) {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { products } = useAppSelector((state) => state.cart)
    const [cartProduct, setCartProduct] = useState<ICartProduct | null>(null)

    function addToCart() {
        dispatch(addProduct(product))
    }

    function removeFromCart() {
        dispatch(removeProduct(product))
    }

    useEffect(() => {
        const itemProduct = products.find(item => item.id === product.id)

        if (itemProduct) {
            setCartProduct(itemProduct)
        } else {
            setCartProduct(null)  
        }
    }, [products, product.id])

    const [isOpen, setIsOpen] = useState(false);

    console.log("ОТЗЫВЫ ИЗ API:", product.latestReviews);

    return (
        <main className="page-product">
            <div className="product-container container">
                <section className="product-details-section" data-testid={product.id}>
                    <div className="product-image-container">
                        <Image 
                            className='w-full h-auto'
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
                                <p className="product-price">${product.price}</p>
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
                                        <button className="quantity-btn" onClick={removeFromCart}>-</button>
                                        <span className="quantity-value">{cartProduct.quantity} in cart</span>
                                        <button className="quantity-btn" onClick={addToCart}>+</button>
                                    </div> : <button className="button button--primary add-to-cart-button" onClick={addToCart}>Add to cart</button>
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
                                        <path d="M5 7.5L10 12.5L15 7.5" stroke="#1E1E1E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
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
                                {product.latestReviews?.map((review: IReviewFull) => (
                                    <div className="review-card">
                                        <div className="review-rating">
                                            {/* 1. Генерируем ЗАКРАШЕННЫЕ звёзды */}
                                            {[...Array(review.rating)].map((_, index) => (
                                                <svg
                                                    key={`filled-${index}`}
                                                    className="star-icon star-icon--filled"
                                                    xmlns="http://w3.org"
                                                    viewBox="0 0 24 24"
                                                    width="18"
                                                    height="18"
                                                    >
                                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                                </svg>
                                            ))}

                                            {/* 2. Генерируем ПУСТЫЕ (контурные) звёзды до 5 штук */}
                                            {[...Array(5 - review.rating)].map((_, index) => (
                                                <svg
                                                    key={`empty-${index}`}
                                                    className="star-icon star-icon--empty"
                                                    xmlns="http://w3.org"
                                                    viewBox="0 0 24 24"
                                                    width="18"
                                                    height="18"
                                                >
                                                <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" />
                                                </svg>
                                            ))}
                                        </div>
                                        <div className="review-body">
                                            <h4 className="review-heading">{review.title}</h4>
                                            <p className="review-text">{review.comment}</p>
                                        </div>
                                        <div className="review-author">
                                            <Image src={review.userImage} alt={review.userName} width={40} height={40} className="author-avatar" />
                                            <span className="author-name">{review.userName}</span>
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