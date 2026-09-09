'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useSelector } from 'react-redux';
import { allProductsInfo } from '@/app/store/slices/addProductsReviewsSlice';
import Link from 'next/link'; 
import ProductRowComponent from "@/app/components/admin-page/ProductRowComponent/ProductRowComponent"; 
import './style.css'

export default function ProductsPage() {
    const allProducts = useSelector(allProductsInfo);
    const router = useRouter();
    const searchParams = useSearchParams();

    const pageParam = searchParams.get("page");
    const currentPage = pageParam ? parseInt(pageParam, 10) : 1;
    const itemsPerPage = 8; 

    const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
    const indexOfLastItem = indexOfFirstItem + itemsPerPage;
    
    const currentProducts = allProducts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(allProducts.length / itemsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    const changePage = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", String(newPage));
        router.push(`?${params.toString()}`);
        window.scrollTo({ top: 200, behavior: 'smooth' });
    };

    const handlePageClick = (e: React.MouseEvent, page: number) => {
        e.preventDefault();
        changePage(page);
    };

    if (allProducts.length === 0) {
        return (
            <div className="no-orders text-gray-500">
                You haven't placed any products yet.
            </div>
        );
    }

    return (
        <div className="admin-content">
            <h1 className="admin-content__title">Admin - Product Stock</h1>
            <div className="admin-actions">
                <Link href="/admin/products/add" className="button button--primary admin-add-product-btn">
                    <svg width="14" height="17" viewBox="0 0 11 11" fill="none" xmlns="http://w3.org">
                        <path d="M5.46665 0.800003V10.1333M0.799988 5.46667H10.1333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Add Product</span>
                </Link>
            </div>

            <div className="admin-table-wrapper">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th style={{ width: '6%' }}>id</th>
                            <th style={{ width: '12%' }}>name</th>
                            <th style={{ width: '26%' }}>description</th>
                            <th style={{ width: '10%' }}>price</th>
                            <th style={{ width: '12%' }}>category</th>
                            <th style={{ width: '13%' }}>created_at</th>
                            <th style={{ width: '13%' }}>updated_at</th>
                            <th style={{ width: '10%' }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentProducts.map((product: any) => (
                            <ProductRowComponent key={product.id} product={product} />
                        ))}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <div className="management-pagination">
                    <Link 
                        href={`?page=${currentPage - 1}`}  
                        className={`management-pagination__link ${currentPage === 1 ? 'disabled' : ''}`} 
                        onClick={(e) => currentPage > 1 && handlePageClick(e, currentPage - 1)}
                    >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://w3.org">
                            <path d="M10.3333 5.66667H1M5.66667 1L1 5.66667L5.66667 10.3333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Previous</span>
                    </Link>

                    <div className="management-pagination-list">
                        {pageNumbers.map((number) => (
                            <Link
                                key={number}
                                href={`?page=${number}`}
                                className={`management-pagination__link ${currentPage === number ? 'active' : ''}`}
                                onClick={(e) => handlePageClick(e, number)}
                            >
                                {number}
                            </Link>
                        ))}
                    </div>

                    <Link 
                        href={`?page=${currentPage + 1}`}  
                        className={`management-pagination__link ${currentPage === totalPages ? 'disabled' : ''}`} 
                        onClick={(e) => currentPage < totalPages && handlePageClick(e, currentPage + 1)}
                    >
                        <span>Next</span>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://w3.org">
                            <path d="M1.66667 5.66667H11M6.33333 1L11 5.66667L6.33333 10.3333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </Link>
                </div>
            )}
        </div>    
    );
}