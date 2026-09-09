'use client'; // 🌟 1. Превращаем страницу в Client Component

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
    // 🌟 2. Разворачиваем параметры URL на клиенте с помощью React.use()
    const { id } = use(params);

    // 🌟 3. Брать товары напрямую из живого Redux стора (а не через fetch с сервера!)
    const allProducts = useSelector(allProductsInfo);

    // 🌟 4. Ищем товар в живой базе, приводя ID к строке (защита от нестыковки типов Date.now())
    const product = allProducts.find((p: any) => String(p.id) === String(id));

    return (
        <section>
            {/* Передаем найденный в Redux товар в компонент отображения */}
            <ProductPageComponent product={product} />
        </section>
    );
}