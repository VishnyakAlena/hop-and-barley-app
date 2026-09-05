"use client"

import { useState, useMemo } from "react";
import Link from 'next/link'; 
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { allProductsInfo } from "@/app/store/slices/productSlice"; // Укажите ваш точный путь к слайсу
import Product from "./ProductCard";
import './HomeCatalogContentStyle.css'


export default function HomeCatalogContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Получаем мемоизированный список продуктов из Redux
    const allProducts = useSelector(allProductsInfo);

    const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState<"new" | "price-asc" | "price-desc" | "rating">("new");
    const [isSortVisible, setIsSortVisible] = useState(false);

    // Обработчик клика по чекбоксу или крестику на плашке
    const handleKeywordToggle = (keyword: string) => {
        setSelectedKeywords(prev => 
            prev.includes(keyword) 
                ? prev.filter(k => k !== keyword) // Удаляем, если галочку сняли
                : [...prev, keyword]              // Добавляем, если галочку поставили
        );

        // Принудительно сбрасываем пагинацию на 1 страницу в URL при смене фильтра
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", "1");
        router.push(`?${params.toString()}`);
    };

    const availableCategories = useMemo(() => {
        // Вытаскиваем поле category из каждого товара
        const allCategories = allProducts.map(product => product.category);
        
        // Фильтруем пустые значения (если у какого-то товара нет категории)
        const validCategories = allCategories.filter(category => !!category);
        
        // Передаем массив в Set, чтобы удалить дубликаты, и превращаем обратно в массив
        // Сортировка .sort() выстроит категории по алфавиту (Adjuncts, Hops, Malts...)
        return Array.from(new Set(validCategories)).sort();
    }, [allProducts]);

    const filteredAndSortedProducts = useMemo(() => {
        let items = [...allProducts];

        // ШАГ 1: Сначала фильтруем по чекбоксам (если хоть один выбран)
        if (selectedKeywords.length > 0) {
            items = items.filter(product => {
                return selectedKeywords.some(keyword => 
                    product.category?.toLowerCase() === keyword.toLowerCase()
                );
            });
        }

        // ШАГ 2: К полученному результату (items) применяем текстовый поиск
        if (searchQuery.trim() !== "") {
            items = items.filter(product => 
                product.name?.toLowerCase().includes(searchQuery.toLowerCase().trim())
            );
        }

        // ШАГ 3: Сортируем то, что осталось после фильтраций (Обратная по ID для "New")
        if (sortBy === "new") {
            items.sort((a, b) => Number(b.id) - Number(a.id));
        }
        if (sortBy === "price-asc") {
            items.sort((a, b) => Number(a.price) - Number(b.price));
        }
        if (sortBy === "price-desc") {
            items.sort((a, b) => Number(b.price) - Number(a.price));
        }
        if (sortBy === "rating") {
            const getTotalStars = (product: any) => {
                const reviews = product.latestReviews || [];
                return reviews.reduce((sum: number, review: any) => sum + (review.rating || 0), 0);
            };
            items.sort((a, b) => getTotalStars(b) - getTotalStars(a));
        }

        return items;
    }, [allProducts, selectedKeywords, sortBy, searchQuery]);

    // ЛОГИКА ПАГИНАЦИИ (по 12 товаров)
    const pageParam = searchParams.get("page");
    const currentPage = pageParam ? parseInt(pageParam, 10) : 1;
    const itemsPerPage = 12; 

    const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
    const indexOfLastItem = indexOfFirstItem + itemsPerPage;
    
    // Срезаем элементы из отфильтрованного и отсортированного списка
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

                {/* УПРАВЛЯЕМЫЕ ЧЕКБОКСЫ (Связанные со стейтом) */}
                <div className="sidebar__section">
                    <h3 className="section-title">Product Type</h3>
                    <div className="checkbox-group">
                        {availableCategories.map((type) => (
                            <label key={type} className="checkbox-container">
                                {type}
                                <input 
                                    type="checkbox" 
                                    checked={selectedKeywords.includes(type)}
                                    onChange={() => handleKeywordToggle(type)}
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
                                // 🌟 При каждом вводе буквы обновляем стейт и сбрасываем пагинацию на 1 страницу
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
                    
                    {/* КНОПКИ СОРТИРОВКИ */}
                    <div className={`sort-options-container ${isSortVisible ? 'mobile-visible' : ''}`}>
                        <div className="sort-options">
                            <button className={`sort-button ${sortBy === "new" ? "active-sort" : ""}`} onClick={() => setSortBy("new")}><span>New</span></button>
                            <button className={`sort-button ${sortBy === "price-asc" ? "active-sort" : ""}`} onClick={() => setSortBy("price-asc")}>Price ascending</button>
                            <button className={`sort-button ${sortBy === "price-desc" ? "active-sort" : ""}`} onClick={() => setSortBy("price-desc")}>Price descending</button>
                            <button className={`sort-button ${sortBy === "rating" ? "active-sort" : ""}`} onClick={() => setSortBy("rating")}>Rating</button>
                        </div>
                    </div>
                </div>
                {/* ВЫВОД КАТАЛОГА ТОВАРОВ */}
                {currentProducts.length > 0 ? (
                    <div className="product-grid">
                        {currentProducts?.map((product) => (
                            <Product key={product.id} product={product}/>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 text-gray-500 font-medium">
                        No products found matching the criteria.
                    </div>
                )}

                {/* ПАГИНАЦИЯ (Ваш дополненный и исправленный блок) */}
                {totalPages > 1 && (
                    <div className="pagination">
                        {/* Кнопка НАЗАД */}
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

                        {/* Номера страниц */}

                            {/* Список номеров страниц */}
                            <div className="pagination-list">
                                {pageNumbers.map((number) => (
                                    <Link
                                        key={number}
                                        // 🌟 ИСПРАВЛЕНО: Добавлены правильные бэктики для шаблона URL
                                        href={`?page=${number}`}
                                        // 🌟 ИСПРАВЛЕНО: Добавлены бэктики для динамического класса активности
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

                            {/* Кнопка ВПЕРЕД */}
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