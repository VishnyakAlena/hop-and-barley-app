"use client"

import { signIn, useSession } from "next-auth/react"
import Image from "next/image"

import './headerStyle.css'
import Link from 'next/link'; 

export default function Header() {
    const { data: session } = useSession()

    return (
        <header>
            <div className="container">
                <section className="header-container">
                    <div className="header__logo">
                        <Image src="/images/logo.svg" width={26} height={37} alt="Hop & Barley Logo"/>
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
                        {session?.user ? (
                        <div className="header__user-actions header__auth-user " id="auth-user">
                            {/* Иконка профиля */}
                            <Link href="/account" className="user-icon" aria-label="My Account">
                                <Image src="/images/icons/User_alt.svg" width={32} height={32} alt="User Account" />
                            </Link>
                            
                            {/* Иконка корзины */}
                            <Link href="/cart" className="cart-icon" aria-label="Shopping Cart">
                                <Image src="/images/icons/Shopping_bag.svg" width={40} height={40} alt="Shopping Cart" />
                            </Link>
                        </div>
                    ) :  <div className="header__auth-buttons" id="auth-guest">
                            {/* Кнопка входа по клику вызывает signIn без создания отдельных компонентов */}
                            <button 
                                onClick={() => signIn('github')} 
                                className="button button--secondary "
                            >
                                Sign in
                            </button>
                            
                            {/* Ссылка на регистрацию из вашего шаблона */}
                            <Link href="/register" className="button button--primary">
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