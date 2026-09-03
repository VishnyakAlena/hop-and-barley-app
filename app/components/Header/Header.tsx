"use client"

import Image from "next/image"
import './headerStyle.css'
import Link from 'next/link'; 
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/storeHooks";
import { initUsersDB, setUserProfile, updateOrderStatus } from "@/app/store/slices/userSlice";
import { usersAllInfo } from "@/app/db/UsersDB";
import { useSession } from "next-auth/react";
import { setCart } from "@/app/store/slices/cartSlice";


export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [wasOpened, setWasOpened] = useState(false); 

    // 2. Блокируем скролл страницы при открытом меню
    useEffect(() => {
        const body = document.body;
        if (isMenuOpen) {
            body.classList.add('lock-scroll');
        } else {
            body.classList.remove('lock-scroll');
        }

        // Чистим класс при размонтировании компонента
        return () => {
            body.classList.remove('lock-scroll');
        };
    }, [isMenuOpen]);

    // Эффект для обнуления состояний при переходе на десктоп
    useEffect(() => {
        // Создаем медиа-запрос, аналогичный вашему CSS (768px)
        const mediaQuery = window.matchMedia("(max-width: 768px)");

        const handleResize = (e: MediaQueryListEvent | MediaQueryList) => {
            // Если экран стал шире 768px (e.matches === false)
            if (!e.matches) {
                setIsMenuOpen(false); // Принудительно закрываем
                setWasOpened(false);  // Полностью обнуляем флаг первого открытия
            }
        };

        // Проверяем текущее состояние при монтировании
        handleResize(mediaQuery);

        // Вешаем слушатель на изменение разрешения
        mediaQuery.addEventListener("change", handleResize);

        // Чистим слушатель при размонтировании хедера
        return () => {
            mediaQuery.removeEventListener("change", handleResize);
        };
    }, []);

    // 3. Функция переключения состояния меню
    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
        if (!wasOpened) setWasOpened(true); // Запоминаем первое открытие
    };

    // 4. Функция принудительного закрытия при клике на ссылки
    const closeMenu = () => {
        setIsMenuOpen(false);
        setWasOpened(false);
    };

    // Вычисляем динамический класс для анимации закрытия/открытия бургера
    const burgerMenu = `burger-menu ${
        isMenuOpen ? 'active' : (wasOpened ? 'closing' : '')
    }`;

    const dispatch = useAppDispatch();
    const { data: session } = useSession();

    // 2. Объявляем новые переменные авторизации взамен Redux
    const { isAuth, currentUser } = useAppSelector((state) => state.user); 
    // Оставляем ТОЛЬКО первичную загрузку моков базы данных при старте сайта
    useEffect(() => {
        dispatch(initUsersDB(usersAllInfo));
    }, [dispatch]);

    useEffect(() => {
        // Метка времени ?t=... заставляет браузер делать честный запрос к серверу
        fetch(`/api/cart?t=${Date.now()}`)
            .then((res) => res.json())
            .then((data) => {
                dispatch(setCart(data));
            })
            .catch((err) => console.error("Header cart fetch error:", err));
    }, [dispatch]);

    useEffect(() => {
        if (session?.user?.email && !isAuth) {
                dispatch(setUserProfile({
                    name: session.user.name || 'User',
                    email: session.user.email,
                    image: session.user.image || '/images/icons/User_alt.svg'
                }));
            }
    }, [session, isAuth, dispatch]); 

    useEffect(() => {
        // Если пользователь не вошел или у него нет заказов — ничего не делаем
        if (!currentUser || !currentUser.orders || currentUser.orders.length === 0) return;

        const checkAndUpgradeStatuses = () => {
            const now = Date.now(); // Текущее время в миллисекундах

            currentUser.orders?.forEach((order) => {
                const orderTime = new Date(order.date).getTime(); // Время создания заказа
                const minutesPassed = (now - orderTime) / 1000 / 60; // Переводим разницу в минуты

                // 🔄 ЦЕПОЧКА СМЕНЫ СТАТУСОВ:
                // 1. Прошла 1 минута -> Переводим из Pending в Confirmed
                if (minutesPassed >= 1 && minutesPassed < 3 && order.status === 'Pending') {
                    dispatch(updateOrderStatus({
                        email: currentUser.email,
                        orderNumber: order.number,
                        newStatus: 'Confirmed'
                    }));
                }

                // 2. Прошло 3 минуты -> Переводим из Confirmed в Shipped
                if (minutesPassed >= 3 && minutesPassed < 5 && order.status === 'Confirmed') {
                    dispatch(updateOrderStatus({
                        email: currentUser.email,
                        orderNumber: order.number,
                        newStatus: 'Shipped'
                    }));
                }

                // 3. Прошло 5 минут -> Переводим в финальный статус Delivered
                if (minutesPassed >= 5 && order.status !== 'Delivered') {
                    dispatch(updateOrderStatus({
                        email: currentUser.email,
                        orderNumber: order.number,
                        newStatus: 'Delivered'
                    }));
                }
            });
        };

        // Запускаем проверку сразу при монтировании шапки
        checkAndUpgradeStatuses();

        // Каждые 10 секунд проверяем время заново
        const interval = setInterval(checkAndUpgradeStatuses, 10000);

        return () => clearInterval(interval); // Чистим таймер при уходе со страницы
    }, [currentUser, dispatch]);

    return (
        <header>
            <div className="container">
                <section className="header-container">
                    <div className="header__logo">
                        <Image src="/images/logo.svg" width={26} height={37} alt="Hop & Barley Logo" style={{ height: 'auto', width: 'auto' }}/>
                        <p className="logo-text">Hop & Barley</p>
                    </div>
                    <div className="header__nav-and-auth">
                        <nav className="header__nav">
                            <ul>
                                <li>
                                    <Link className="header__nav-link" href="/">Products</Link>
                                </li>
                                <li>
                                    <Link className="header__nav-link" href="/guides-recipes">Guides & Recipes</Link>
                                </li>
                                <li>
                                    <Link className="header__nav-link" href="/community">Community</Link>
                                </li>
                                <li>
                                    <Link className="header__nav-link" href="/resources">Resources</Link>
                                </li>
                                <li>
                                    <Link className="header__nav-link" href="/contact">Contact</Link>
                                </li>
                            </ul>
                        </nav>

                        <div className={`burger-icon ${isMenuOpen ? '_open' : ''}`} onClick={toggleMenu}>
                            <div className="line1"></div>
                            <div className="line2"></div>
                            <div className="line3"></div>
                        </div>

                        {/* Выпадающее меню: вешаем на него динамические классы */}
                        {wasOpened && (
                            <div className={`${burgerMenu}`}>
                                <ul>
                                    <li>
                                        {/* 🌟 Добавили onClick={closeMenu} к каждой ссылке */}
                                        <Link className="header__nav-link" href="/" onClick={closeMenu}>Products</Link>
                                    </li>
                                    <li>
                                        <Link className="header__nav-link" href="/guides-recipes" onClick={closeMenu}>Guides & Recipes</Link>
                                    </li>
                                    <li>
                                        <Link className="header__nav-link" href="/community" onClick={closeMenu}>Community</Link>
                                    </li>
                                    <li>
                                        <Link className="header__nav-link" href="/resources" onClick={closeMenu}>Resources</Link>
                                    </li>
                                    <li>
                                        <Link className="header__nav-link" href="/contact" onClick={closeMenu}>Contact</Link>
                                    </li>
                                </ul>
                            </div>
                        )}

                        {isAuth && currentUser ? (
                            <div className="header__user-actions header__auth-user " id="auth-user">
                                {/* Иконка профиля */}
                                <Link href={`/account/${currentUser.id}`} className="user-icon" aria-label="My Account">
                                    <Image src={currentUser.image || "/images/icons/User_alt.svg"} width={32} height={32} alt="User Account" />
                                </Link>
                                
                                {/* Иконка корзины */}
                                <Link href="/cart" className="cart-icon" aria-label="Shopping Cart">
                                    <Image src="/images/icons/Shopping_bag.svg" width={40} height={40} alt="Shopping Cart" />
                                </Link>
                            </div>
                        ) :  <div className="header__auth-buttons" id="auth-guest">
                                {/* Кнопка входа по клику вызывает signIn без создания отдельных компонентов */}
                                <Link 
                                    href="/login"
                                    className="button button--secondary "
                                >
                                    Sign in
                                </Link>
                                
                                {/* Ссылка на регистрацию из вашего шаблона */}
                                <Link 
                                    href="/register" 
                                    className="button button--primary"
                                >
                                    Register
                                </Link>
                            </div>
                    }
                    </div>
                </section>
            </div>
        </header>
    )
}