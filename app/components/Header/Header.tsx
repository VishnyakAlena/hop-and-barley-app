"use client"

import Image from "next/image"
import './headerStyle.css'
import Link from 'next/link'; 
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/storeHooks";
import { allOrdersInfo, initUsersDB, setUserProfile, updateOrderStatus } from "@/app/store/slices/userSlice";
import { usersAllInfo } from "@/app/db/UsersDB";
import { signOut, useSession } from "next-auth/react";
import { setCart } from "@/app/store/slices/cartSlice";
import { useSelector } from "react-redux";
import { ADMIN_EMAIL } from "@/app/constants";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [wasOpened, setWasOpened] = useState(false); 

    useEffect(() => {
        const body = document.body;
        if (isMenuOpen) {
            body.classList.add('lock-scroll');
        } else {
            body.classList.remove('lock-scroll');
        }

        return () => {
            body.classList.remove('lock-scroll');
        };
    }, [isMenuOpen]);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 768px)");
        const handleResize = (e: MediaQueryListEvent | MediaQueryList) => {
            if (!e.matches) {
                setIsMenuOpen(false); 
                setWasOpened(false);  
            }
        };

        handleResize(mediaQuery);

        mediaQuery.addEventListener("change", handleResize);

        return () => {
            mediaQuery.removeEventListener("change", handleResize);
        };
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
        if (!wasOpened) setWasOpened(true); 
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
        setWasOpened(false);
    };

    const burgerMenu = `burger-menu ${
        isMenuOpen ? 'active' : (wasOpened ? 'closing' : '')
    }`;

    const dispatch = useAppDispatch();
    const { data: session } = useSession();

    const { isAuth, currentUser } = useAppSelector((state) => state.user); 
    // Оставляем ТОЛЬКО первичную загрузку моков базы данных при старте сайта
    useEffect(() => {
        dispatch(initUsersDB(usersAllInfo));
    }, [dispatch]);

    useEffect(() => {
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

    const globalOrdersList = useSelector(allOrdersInfo) || []; 

    useEffect(() => {
        if (!globalOrdersList || globalOrdersList.length === 0) return;

        const checkAndUpgradeStatuses = () => {
            const now = Date.now(); 
            globalOrdersList.forEach((order) => {
                const orderTime = new Date(order.date).getTime(); 
                const minutesPassed = (now - orderTime) / 1000 / 60; 
                if (minutesPassed >= 1 && minutesPassed < 10 && order.status === 'Pending') {
                    dispatch(updateOrderStatus({
                        orderNumber: order.number,
                        newStatus: 'Confirmed'
                    }));
                }
                if (minutesPassed >= 10 && minutesPassed < 20 && order.status === 'Confirmed') {
                    dispatch(updateOrderStatus({
                        orderNumber: order.number,
                        newStatus: 'Shipped'
                    }));
                }
                if (minutesPassed >= 20 && order.status === 'Shipped') {
                    dispatch(updateOrderStatus({
                        orderNumber: order.number,
                        newStatus: 'Delivered'
                    }));
                }
            });
        };
        checkAndUpgradeStatuses();
        const interval = setInterval(checkAndUpgradeStatuses, 10000);
        return () => clearInterval(interval); 
    }, [globalOrdersList.length, dispatch]);

    return (
        <header>
            <div className="container">
                <section className="header-container">
                    <div className="header__logo">
                        <Image src="/images/logo.svg" width={26} height={37} alt="Hop & Barley Logo" style={{ height: 'auto' }}/>
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
                        {wasOpened && (
                            <div className={`${burgerMenu}`}>
                                <ul>
                                    <li>
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
                            <div className="header__user-actions header__auth-user" id="auth-user">
                                <Link 
                                    href={currentUser.email === ADMIN_EMAIL ? "/admin" : `/account/${currentUser.id}`} 
                                    className="user-icon" 
                                    aria-label={currentUser.email === ADMIN_EMAIL ? "Admin Dashboard" : "My Account"}
                                >
                                    <Image src={currentUser.image || "/images/icons/User_alt.svg"} width={32} height={32} alt="User Account" />
                                </Link>
                                {currentUser.email === ADMIN_EMAIL ? (
                                    <button 
                                        type="button"
                                        onClick={() => signOut({ callbackUrl: '/login' })} 
                                        className="logout-icon-btn flex items-center justify-center ml-1" 
                                        aria-label="Sign Out"
                                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                                    >
                                        <svg fill="#000000" width="30px" height="30px" version="1.1" viewBox="144 144 512 512" xmlns="http://www.w3.org/2000/svg">
                                            <g>
                                            <path d="m619.61 424.27c1.0625-2.5664 1.0625-5.4531 0-8.0195-0.52344-1.2812-1.2969-2.4453-2.2773-3.4219l-41.984-41.984c-4.1172-3.9766-10.664-3.9219-14.711 0.12891-4.0508 4.0469-4.1055 10.594-0.12891 14.715l24.066 24.066h-100.61c-5.793 0-10.492 4.6992-10.492 10.496s4.6992 10.496 10.492 10.496h100.61l-24.066 24.066h0.003906c-2.0273 1.957-3.1797 4.6445-3.207 7.457-0.023438 2.8164 1.0859 5.5234 3.0742 7.5156 1.9922 1.9883 4.6992 3.0977 7.5156 3.0742 2.8125-0.027344 5.5-1.1797 7.457-3.207l41.984-41.984v0.003907c0.97266-0.97656 1.7422-2.1328 2.2656-3.4023z"/>
                                            <path d="m396.66 604.25c8.6523-5.8555 13.832-15.625 13.836-26.07v-21.477h136.45c8.3516 0 16.363-3.3164 22.266-9.2227 5.9062-5.9023 9.2227-13.914 9.2227-22.266v-20.992c0-5.7969-4.6992-10.496-10.496-10.496s-10.496 4.6992-10.496 10.496v20.992c0 2.7852-1.1055 5.4531-3.0742 7.4219s-4.6367 3.0742-7.4219 3.0742h-136.45v-228.43c0.019531-5.8516-1.5977-11.594-4.6758-16.574-3.0742-4.9805-7.4844-8.9961-12.727-11.598l-167.94-83.969c-9.7617-4.8828-21.359-4.3594-30.645 1.3789-9.2812 5.7383-14.934 15.879-14.93 26.793v287.68c-0.019531 6.3008 1.8555 12.461 5.3867 17.676 3.5312 5.2148 8.5508 9.2461 14.41 11.566l167.94 67.176h-0.003906c9.7109 3.9102 20.73 2.7305 29.391-3.1484zm-189.48-83.547c-3.9727-1.5898-6.5859-5.4297-6.6016-9.7109v-287.68c-0.019531-3.6484 1.8555-7.043 4.9531-8.9688 3.0977-1.9297 6.9727-2.1094 10.234-0.47656l167.94 83.969c3.5586 1.7773 5.8047 5.4141 5.8047 9.3906v270.9c-0.003906 3.4844-1.7305 6.7344-4.6133 8.6875-2.8828 1.9492-6.5469 2.3477-9.7773 1.0547z"/>
                                            <path d="m567.93 346.79c2.7852 0 5.4531-1.1055 7.4219-3.0742s3.0742-4.6406 3.0742-7.4219v-104.96c0-8.3516-3.3164-16.359-9.2227-22.266-5.9023-5.9062-13.914-9.2227-22.266-9.2227h-230.91c-5.7969 0-10.496 4.6992-10.496 10.496 0 5.7969 4.6992 10.496 10.496 10.496h230.91c2.7852 0 5.4531 1.1055 7.4219 3.0742s3.0742 4.6367 3.0742 7.4219v104.96c0 2.7812 1.1055 5.4531 3.0742 7.4219s4.6406 3.0742 7.4219 3.0742z"/>
                                            </g>
                                        </svg>
                                    </button>
                                ) : (
                                    <Link href="/cart" className="cart-icon" aria-label="Shopping Cart">
                                        <Image src="/images/icons/Shopping_bag.svg" width={40} height={40} alt="Shopping Cart" />
                                    </Link>
                                )}
                            </div>
                        ) : (
                            <div className="header__auth-buttons" id="auth-guest">
                                <Link 
                                    href="/login"
                                    className="button button--secondary"
                                >
                                    Sign in
                                </Link>
                                <Link 
                                    href="/register" 
                                    className="button button--primary"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </header>
    )
}