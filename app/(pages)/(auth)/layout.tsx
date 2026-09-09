import Image from "next/image";
import './style.css'

export default function AuthLayout({
    children,
    }: {
    children: React.ReactNode;
    }) {
    return (
        <main className="auth-page-wrapper">  
            <div className="auth-background">
                <Image 
                    src="/images/background/pattern.jpg" 
                    fill
                    sizes="100vw" 
                    alt="Background pattern" 
                />
            </div>
            {children}
        </main>
    );
}