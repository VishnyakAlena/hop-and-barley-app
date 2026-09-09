import { Iproduct } from '@/app/types';
import Link from 'next/link'; 
import './ProductRowComponentStyle.css'

type ProductPropsType = {
    product: Iproduct
}

function ProductRowComponent( { product }: ProductPropsType ) {
    const descriptionText = (Array.isArray(product.description) && product.description.length > 0)
    ? product.description[0]
    : '';
    const isHidden = product.isHidden;
    
    return (
        <tr style={isHidden ? { color: '#9e9e9e', opacity: 0.6 } : {}}>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{descriptionText}</td>
            <td>${Number(product.price).toFixed(2)}</td>
            <td>{product.category}</td>
            <td style={{ whiteSpace: 'nowrap' }}>{product.createdAt}</td>
            <td style={{ whiteSpace: 'nowrap' }}>{product.updatedAt}</td>
            <td>
                <Link href={`/admin/products/edit/${product.id}`} className="button button--primary button--edit">
                    Edit
                </Link>
            </td>
        </tr>
    );
}

export default ProductRowComponent;