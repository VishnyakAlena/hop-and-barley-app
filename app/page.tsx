"use client"

import Image from "next/image";
import ProductsList from "./components/main-page/ProductsList";
import Link from 'next/link'; 
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { allProductsInfo } from "./store/slices/productSlice";

export default function Home() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const allProducts = useSelector(allProductsInfo);

    // 🌟 2. Получаем номер страницы из URL (например, ?page=2). 
    // Если параметра в адресе нет, по умолчанию ставим 1
    const pageParam = searchParams.get("page");
    const currentPage = pageParam ? parseInt(pageParam, 10) : 1;
    const itemsPerPage = 12; 

    const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
    const indexOfLastItem = indexOfFirstItem + itemsPerPage;
    const currentProducts = allProducts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(allProducts.length / itemsPerPage);
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }
    const changePage = (newPage: number) => {
        // Создаем новый объект параметров на основе текущих
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", String(newPage));
        
        // Меняем адрес в браузере (это заставит Next.js пересчитать .slice)
        router.push(`?${params.toString()}`);
        
        // Плавно возвращаем пользователя наверх к началу списка товаров
        window.scrollTo({ top: 400, behavior: 'smooth' });
    };
    const handleNextPage = (e: React.MouseEvent) => {
        e.preventDefault();
        if (currentPage < totalPages) changePage(currentPage + 1);
    };

    const handlePrevPage = (e: React.MouseEvent) => {
        e.preventDefault();
        if (currentPage > 1) changePage(currentPage - 1);
    };

    return (
        <main>
            <section className="hero-banner">
                <Image src="/images/background/hopfen-fields.jpg" width={1312} height={400} alt="Beautiful hops on a dark background" className="hero-banner__image" />
                <div className="hero-banner__overlay"></div>
            </section>
            <div className="container main-content-grid">
                <aside className="sidebar filter-menu">
                    <div className="sidebar__section">
                        <h3 className="section-title">Keywords</h3>
                        <div className="keywords-list">
                        </div>
                    </div>

                    <div className="sidebar__section">
                        <h3 className="section-title">Product Type</h3>
                        <div className="checkbox-group">
                            <label className="checkbox-container">Hops
                                <input type="checkbox" data-keyword="Hops" />
                                <span className="checkmark"></span>
                            </label>
                            <label className="checkbox-container">Malts
                                <input type="checkbox" data-keyword="Malts" />
                                <span className="checkmark"></span>
                            </label>
                            <label className="checkbox-container">Yeast
                                <input type="checkbox" data-keyword="Yeast" />
                                <span className="checkmark"></span>
                            </label>
                            <label className="checkbox-container">Adjuncts
                                <input type="checkbox" data-keyword="Adjuncts" />
                                <span className="checkmark"></span>
                            </label>
                        </div>
                    </div>
                </aside>

                <section className="products-area product-grid-section">
                    <div className="search-sort-bar">
                        <div className="search-wrapper">
                            <div className="menu-icon-wrapper">
                                <svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 6H16M1 1H16M1 11H16" stroke="#F5F5F5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <div className="search-input-wrapper">
                            <input type="text" placeholder="Search" className="search-input" />
                            <button className="search-button" aria-label="Search">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.8 12.8L9.90005 9.9M11.4667 6.13334C11.4667 9.07886 9.0789 11.4667 6.13338 11.4667C3.18786 11.4667 0.800049 9.07886 0.800049 6.13334C0.800049 3.18782 3.18786 0.800003 6.13338 0.800003C9.0789 0.800003 11.4667 3.18782 11.4667 6.13334Z" stroke="#111D13" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        </div>
                        <div className="sort-options">
                            <button className="sort-button active-sort">
                                <span>New</span>
                            </button>
                            <button className="sort-button">Price ascending</button>
                            <button className="sort-button">Price descending</button>
                            <button className="sort-button">Rating</button>
                        </div>
                    </div>

                    <ProductsList products={currentProducts} />

                    {totalPages > 1 && (
                        <div className="pagination">
                            <Link 
                                href={`?page=${currentPage - 1}`}  
                                className={`pagination__link pagination__link--prev ${currentPage === 1 ? 'disabled' : ''}`} 
                                onClick={handlePrevPage}
                            >
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.3333 5.66667H1M5.66667 1L1 5.66667L5.66667 10.3333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <span>Previous</span>
                            </Link>
                            <div className="pagination-list">
                                {pageNumbers.map((number) => (
                                    <Link
                                        key={number}
                                        href="{`?page=${number}`}"
                                        className={`pagination__link ${currentPage === number ? 'active' : ''}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            changePage(number);
                                        }}
                                    >
                                        {number}
                                    </Link>
                                ))}
                            </div>
                            <Link 
                                href={`?page=${currentPage + 1}`}  
                                className={`pagination__link pagination__link--next ${currentPage === totalPages ? 'disabled' : ''}`} 
                                onClick={handleNextPage}
                            >
                                <span>Next</span>
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 5.66667H10.3333M5.66667 10.3333L10.3333 5.66667L5.66667 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </Link>
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}
