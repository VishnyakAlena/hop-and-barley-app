import Image from 'next/image'
import './ForgotPasswordPage.css'
import ForgotPasswordForm from '../components/ForgotPasswordForm/ForgotPasswordForm'

export default function ForgotPasswordPage() {

    return (
        <main className="auth-page-wrapper">  
            <div className="auth-background">
                <Image 
                    src="/images/background/pattern.jpg" 
                    fill
                    sizes="100vw" 
                    alt="Background pattern" />
            </div>
            <ForgotPasswordForm />
        </main>
    )
}