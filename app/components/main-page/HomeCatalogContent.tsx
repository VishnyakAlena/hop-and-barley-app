"use client"

import { useState, useMemo } from "react";
import Link from 'next/link'; 
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { allProductsInfo } from "@/app/store/slices/addProductsReviewsSlice"; 
import Product from "./ProductCard";
import './HomeCatalogContentStyle.css'

export default function HomeCatalogContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const allProducts = useSelector(allProductsInfo);
    const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState<"new" | "price-asc" | "price-desc" | "rating">("new");
    const [isSortVisible, setIsSortVisible] = useState(false);
    
    const handleKeywordToggle = (keyword: string) => {
        setSelectedKeywords(prev => 
            prev.includes(keyword) 
                ? prev.filter(k => k !== keyword) 
                : [...prev, keyword]              
        );
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", "1");
        router.push(`?${params.toString()}`);
    };

    const availableCategories = useMemo<string[]>(() => {
        const allCategories = allProducts.map((product: any) => product.category);
        const validCategories = allCategories.filter((category: any) => !!category);
        return Array.from(new Set(validCategories)).sort() as string[];
    }, [allProducts]);

    const filteredAndSortedProducts = useMemo(() => {
        let items = allProducts.filter((product: any) => !product.isHidden);
        if (selectedKeywords.length > 0) {
            items = items.filter((product: any) => {
                return selectedKeywords.some(keyword => 
                    product.category?.toLowerCase() === keyword.toLowerCase()
                );
            });
        }
        if (searchQuery.trim() !== "") {
            items = items.filter((product: any) => 
                product.name?.toLowerCase().includes(searchQuery.toLowerCase().trim())
            );
        }
        if (sortBy === "new") {
            items.sort((a: any, b: any) => Number(b.id) - Number(a.id));
        }
        if (sortBy === "price-asc") {
            items.sort((a: any, b: any) => Number(a.price) - Number(b.price));
        }
        if (sortBy === "price-desc") {
            items.sort((a: any, b: any) => Number(b.price) - Number(a.price));
        }
        if (sortBy === "rating") {
            const getTotalStars = (product: any) => {
                const reviews = product.latestReviews || [];
                return reviews.reduce((sum: number, review: any) => sum + (review.rating || 0), 0);
            };
            items.sort((a: any, b: any) => getTotalStars(b) - getTotalStars(a));
        }
        return items;
    }, [allProducts, selectedKeywords, sortBy, searchQuery]);

    const pageParam = searchParams.get("page");
    const currentPage = pageParam ? parseInt(pageParam, 10) : 1;
    const itemsPerPage = 12; 
    const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
    const indexOfLastItem = indexOfFirstItem + itemsPerPage;
    const currentProducts = filteredAndSortedProducts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const changePage = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", String(newPage));
        router.push(`?${params.toString()}`);
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
        <div className="container main-content-grid">
            <aside className="sidebar filter-menu">
                <div className="sidebar__section">
                    <h3 className="section-title">Keywords</h3>
                    <div className="keywords-list">
                        {selectedKeywords.map((categoryName) => (
                            <span key={categoryName} className="keyword-tag">
                                {categoryName}
                                <button 
                                    type="button" 
                                    onClick={() => handleKeywordToggle(categoryName)}
                                    className="remove-keyword-icon"
                                >
                                    &times;
                                </button>
                            </span>
                        ))}
                    </div>
                </div>
                <div className="sidebar__section">
                    <h3 className="section-title">Product Type</h3>
                    <div className="checkbox-group">
                        {availableCategories.map((categoryName) => (
                            <label key={categoryName} className="checkbox-container">
                                {categoryName}
                                <input 
                                    type="checkbox" 
                                    checked={selectedKeywords.includes(categoryName)}
                                    onChange={() => handleKeywordToggle(categoryName)}
                                />
                                <span className="checkmark"></span>
                            </label>
                        ))}
                    </div>
                </div>
            </aside>
            <section className="products-area product-grid-section">
                <div className="search-sort-bar">
                    <div className="search-wrapper">
                        <div 
                            className="menu-icon-wrapper"
                            onClick={() => setIsSortVisible(!isSortVisible)}
                            style={{ cursor: 'pointer' }}
                        >
                            <svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 6H16M1 1H16M1 11H16" stroke="#F5F5F5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <div className="search-input-wrapper">
                            <input 
                                type="text" 
                                placeholder="Search" 
                                className="search-input" 
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    const params = new URLSearchParams(searchParams.toString());
                                    params.set("page", "1");
                                    router.push(`?${params.toString()}`);
                                }}
                            />
                            <button className="search-button" aria-label="Search">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.8 12.8L9.90005 9.9M11.4667 6.13334C11.4667 9.07886 9.0789 11.4667 6.13338 11.4667C3.18786 11.4667 0.800049 9.07886 0.800049 6.13334C0.800049 3.18782 3.18786 0.800003 6.13338 0.800003C9.0789 0.800003 11.4667 3.18782 11.4667 6.13334Z" stroke="#111D13" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className={`sort-options-container ${isSortVisible ? 'mobile-visible' : ''}`}>
                        <div className="sort-options">
                            <button className={`sort-button ${sortBy === "new" ? "active-sort" : ""}`} onClick={() => setSortBy("new")}><span>New</span></button>
                            <button className={`sort-button ${sortBy === "price-asc" ? "active-sort" : ""}`} onClick={() => setSortBy("price-asc")}>Price ascending</button>
                            <button className={`sort-button ${sortBy === "price-desc" ? "active-sort" : ""}`} onClick={() => setSortBy("price-desc")}>Price descending</button>
                            <button className={`sort-button ${sortBy === "rating" ? "active-sort" : ""}`} onClick={() => setSortBy("rating")}>Rating</button>
                        </div>
                    </div>
                </div>
                {currentProducts.length > 0 ? (
                    <div className="product-grid">
                        {currentProducts?.map((product: any) => (
                            <Product key={product.id} product={product}/>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 text-gray-500 font-medium">
                        No products found matching the criteria.
                    </div>
                )}
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
                                    href={`?page=${number}`}
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
                                <path d="M1.66667 5.66667H11M6.33333 1L11 5.66667L6.33333 10.3333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </Link>
                    </div>
                )}
            </section>
        </div>
    );
}