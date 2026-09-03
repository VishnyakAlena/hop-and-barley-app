'use client'

import Image from 'next/image'
import LoginForm from '../components/LoginForm/LoginForm'
import './loginStyle.css'

export default function LoginPage() {

    return (
        <main className="auth-page-wrapper">  
            <div className="auth-background">
                <Image 
                    src="/images/background/pattern.jpg" 
                    fill
                    sizes="100vw" 
                    alt="Background pattern" />
            </div>
            <LoginForm />
        </main>    
    )
}