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
        <div data-testid={product.id} className="list-product-card" onClick={goToProductPage}>
            <div className="product-card__image-container">
                <Image 
                    className='product-card__image'
                    src={product.image} 
                    width={272} 
                    height={247} 
                    alt={product.name}
                    loading="eager"
                />
            </div>
            <p>{product.name}</p>
            <p>${Number(product.price).toFixed(2)}</p>
            <p>{product.shortDescription}</p>
        </div>
    )
}

export default Product