'use client'

import Image from 'next/image'
import { ICartProduct, Iproduct } from '../../types'
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

    function goToCart() {
        router.push('/cart')
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
            </div>
        </main>
    )
}

export default ProductPageComponent