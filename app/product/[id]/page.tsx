import ProductPageComponent from "@/app/components/ProductPageComponent/ProductPageComponent";
import { Iproduct, IReviewFull } from "@/app/types";
import Image from 'next/image'
import './productPageStyle.css'

interface IParams {
    params: Promise<{
        id: string
    }>
}

export default async function ProductPage({ params }: IParams) {
    const { id } = await params
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/productInfo/${id}`, {
            next: { 
                // revalidate: 60 * 60,
                revalidate: 0,
            }
        });
    const data:Iproduct = await response.json() 
    return (
        <section>
            <ProductPageComponent product={data}/>
            
        </section>
    )
}