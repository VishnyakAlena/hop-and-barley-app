'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { Iproduct } from '@/app/types';
import { useSelector } from 'react-redux';
import { allProductsInfo } from '@/app/store/slices/productSlice';
import './ProductManagementComponentStyle.css'

type ProductsPropsType = {
    products: Iproduct[]
}

export default function ProductManagement({ products }: ProductsPropsType) {
    const allProducts = useSelector(allProductsInfo);
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const sortedOrders = [...products].reverse();

    const pageParam = searchParams.get("page");
    const currentPage = pageParam ? parseInt(pageParam, 10) : 1;
    const itemsPerPage = 8; // Жесткое ограничение в 8 элементов

    const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
    const indexOfLastItem = indexOfFirstItem + itemsPerPage;
    
    // Срезаем ровно 8 заказов для текущей страницы
    const currentOrders = sortedOrders.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);

    // Функция переключения страницы в URL
    const changePage = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", String(newPage));
        
        // Меняем адрес, добавляя ?page=номер
        router.push(`?${params.toString()}`);
        
        // Плавно прокручиваем вверх к началу таблицы истории
        window.scrollTo({ top: 200, behavior: 'smooth' });
    };

    const handleNextPage = (e: React.MouseEvent) => {
        e.preventDefault();
        if (currentPage < totalPages) changePage(currentPage + 1);
    };

    const handlePrevPage = (e: React.MouseEvent) => {
        e.preventDefault();
        if (currentPage > 1) changePage(currentPage - 1);
    };


    if (products.length === 0) {
        return (
            <div className="no-orders text-gray-500">
                You haven't placed any products yet.
            </div>
        )
    }

    return (
        <>
            <h1>Product management</h1>
        </>    
    )
}