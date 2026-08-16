import { IProductsAllInfoResponse } from "@/app/types";
import Product from "./Product";

export default async function ProductsList() {

    const response = await fetch('http://localhost:3000/api/productsAllInfo', {
        next: { 
            revalidate: 60 * 60,
        }
    });
    const data:IProductsAllInfoResponse = await response.json() 

    return (
        <div className="product-grid">
            {data && data.map(item => <Product product={item} key={item.id}/>)}
        </div>
    )
}