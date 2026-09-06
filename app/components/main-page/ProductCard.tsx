
import Image from 'next/image'
import { Iproduct } from '../../types'
import Link from 'next/link'; 

type PropsType = {
    product: Iproduct
}

function Product({product}:PropsType) {
    
    return (
        <Link
            href={`/product/${product.id}`}
            data-testid={product.id} 
            className="list-product-card"
        >
            <div className="product-card__image-container">
                <Image 
                    className='product-card__image'
                    src={product.image} 
                    width={272} 
                    height={247} 
                    alt={product.name}
                    loading="eager"
                    style={{ height: 'auto' }}
                />
            </div>
            <p>{product.name}</p>
            <p>${Number(product.price).toFixed(2)}</p>
            <p>{product.shortDescription}</p>
        </Link>
    )
}

export default Product