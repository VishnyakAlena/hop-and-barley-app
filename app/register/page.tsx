import Image from 'next/image'
import './registerStyle.css'
import RegisterForm from '../components/RegisterForm/RegisterForm'

export default function RegisterPage() {

    return (
        <main className="auth-page-wrapper">  
            <div className="auth-background">
                <Image 
                    src="/images/background/pattern.jpg" 
                    fill
                    sizes="100vw" 
                    alt="Background pattern" />
                </div>
                <RegisterForm />
        </main>
    )
}