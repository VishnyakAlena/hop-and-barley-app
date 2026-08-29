import { Iproduct, IProductsAllInfoResponse } from "@/app/types";
import Product from "./ProductCard";
import './ProductsListStyle.css'

interface ProductsListProps {
    products: Iproduct[]; 
}

export default function ProductsList({ products }: ProductsListProps ) {

    return (
        <div className="product-grid">
            {products?.map((product) => (
                <Product key={product.id} product={product}/>
            ))}
        </div>
    )
}