'use client'
'use client'

import { useRouter } from 'next/navigation' 
import Image from 'next/image'
import { Iproduct } from '../../types'

type PropsType = {
    product: Iproduct
}

function Product({product}:PropsType) {
    const router = useRouter()
    
    const goToProductPage = () => {
        router.push(`/product/${product.id}`)
    }

    return (
        <div data-testid={product.id} className="character" onClick={goToProductPage}>
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
            <p>{product.shortDescription}</p>
        </div>
    )
}

export default Product