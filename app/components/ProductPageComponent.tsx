'use client'

import Image from 'next/image'
import { ICartProduct, Iproduct } from '../types'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '../store/storeHooks'
import { addProduct, removeProduct } from '../store/slices/cartSlice'
import { useEffect, useState } from 'react'


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

    return (
        <div data-testid={product.id}>
            <Image 
                className='w-full h-auto'
                src={product.image} 
                width={300} 
                height={300} 
                alt="product.name"
                loading="eager"
            />
            <p>Name: {product.name}</p>
            <p>${product.price}</p>
            <p>{product.description}</p>
            {cartProduct ? 
                <div>
                    <button onClick={removeFromCart}>-</button>
                    <span>{cartProduct.quantity}</span>
                    <button onClick={addToCart}>+</button>
                    <button onClick={goToCart}>Go to cart</button>
                </div> : <button onClick={addToCart}>Add to cart</button>}
        </div>
    )
}

export default ProductPageComponent