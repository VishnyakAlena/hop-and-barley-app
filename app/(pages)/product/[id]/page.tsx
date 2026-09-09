'use client'; 

import { use } from 'react'; // Нужен в Next.js 15 для разворачивания params на клиенте
import { useSelector } from 'react-redux';
import { allProductsInfo } from '@/app/store/slices/addProductsReviewsSlice';
import ProductPageComponent from "@/app/components/ProductPageComponent/ProductPageComponent";
import './productPageStyle.css';

interface IParams {
    params: Promise<{
        id: string;
    }>;
}

export default function ProductPage({ params }: IParams) {
    
    const { id } = use(params);
    const allProducts = useSelector(allProductsInfo);
    const product = allProducts.find((p: any) => String(p.id) === String(id));

    return (
        <section>
            <ProductPageComponent product={product} />
        </section>
    );
}