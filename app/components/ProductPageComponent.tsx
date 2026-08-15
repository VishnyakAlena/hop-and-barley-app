'use client'
'use client'

import { useRouter } from 'next/navigation' 
import Image from 'next/image'
import { Iproduct } from '../types'


type PropsType = {
    product: Iproduct
}

function ProductPageComponent({product}:PropsType) {
    const router = useRouter();

    const handleTransitionToCart = () => {
        router.push("/cart"); 
    };

    return (
        <div data-testid={product.id} className="character">
            <Image 
                src={product.image} 
                width={300} 
                height={300} 
                alt="product.name"
                loading="eager"
            />
            <p>Name: {product.name}</p>
            <p>${product.price}</p>
            <p>{product.description}</p>
            <button>Add to cart</button>
            <button onClick={handleTransitionToCart}>Open your cart</button>
        </div>
    )
}

export default ProductPageComponent