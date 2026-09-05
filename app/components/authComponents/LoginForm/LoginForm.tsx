'use client'
import { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useAppDispatch, useAppSelector } from '@/app/store/storeHooks';
import { setUserProfile } from '@/app/store/slices/userSlice'; 
import { useRouter } from 'next/navigation';
import Link from 'next/link'; 
import './LoginFormStyle.css';
import { loginSchema } from '@/app/schemas/schemas';

export default function LoginForm() {
    const { data: session, status } = useSession();
    const dispatch = useAppDispatch();
    const router = useRouter();

    const { isAuth, currentUser, users: allUsers } = useAppSelector((state) => state.user); 
    const [email, setEmail] = useState('');
    const [formErrors, setFormErrors] = useState<{ email?: string; password?: string }>({});

    // Подгрузка сохраненного email
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedEmail = localStorage.getItem('saved_login_email');
            if (savedEmail) setEmail(savedEmail);
        }
    }, []);

    // Синхронизация сессии NextAuth (Google/GitHub или обычная сессия после перезагрузки)
    useEffect(() => {
        if (session?.user?.email && !isAuth) {
            const ADMIN_EMAIL = "vishnyak-elena@mail.ru";
            const isMyEmail = session.user.email.toLowerCase().trim() === ADMIN_EMAIL.toLowerCase().trim();
            const sessionRole = isMyEmail ? 'admin' : ((session.user as any).role || 'user');

            dispatch(setUserProfile({
                name: session.user.name || 'User',
                email: session.user.email,
                image: session.user.image || '/images/icons/User_alt.svg',
                role: sessionRole 
            }));
        }
    }, [session, isAuth, dispatch]);

    // Умный редирект
    useEffect(() => {
        if (isAuth && currentUser && currentUser.role) {
            if (currentUser.role === 'admin') {
                router.push('/admin');
            } else {
                router.push(`/account/${currentUser.id}?tab=info`);
            }
        }
    }, [isAuth, currentUser, router]);

    const handleEmailLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormErrors({});
        
        const formData = new FormData(e.currentTarget);
        const inputEmail = String(formData.get('email') || '').toLowerCase().trim();
        const password = String(formData.get('password') || '');
        const clientValidated = loginSchema.safeParse({ email: inputEmail, password });
        if (!clientValidated.success) {
            const fieldErrors = clientValidated.error.flatten().fieldErrors;
        // Извлекаем текст первых ошибок для каждого инпута
        setFormErrors({
            email: fieldErrors.email?.[0],
            password: fieldErrors.password?.[0]
        });
        return; 
        }

        if (typeof window !== 'undefined') {
            localStorage.setItem('saved_login_email', inputEmail);
        }

        // Восстанавливаем базу из localStorage, если Redux пуст
        let finalUsersList = allUsers;
        if (!finalUsersList || finalUsersList.length === 0) {
            if (typeof window !== 'undefined') {
                const savedUsers = localStorage.getItem('mock_users_db');
                if (savedUsers) finalUsersList = JSON.parse(savedUsers);
            }
        }


        // Передаем allUsers напрямую из Redux — теперь он никогда не будет пустым!
        const result = await signIn('credentials', {
            email: inputEmail,
            password: password,
            redirect: false, 
            usersJson: JSON.stringify(finalUsersList) 
        });

        if (result?.error) {
            setFormErrors({
                password: "Invalid email or password!"
            });
        } else {
            const ADMIN_EMAIL = "vishnyak-elena@mail.ru";
            const loggedInUser = finalUsersList.find(u => u.email.toLowerCase() === inputEmail);
            const dynamicId = loggedInUser?.id || inputEmail.split('').reduce((acc, char) => acc + char.charCodeAt(0), 100);
            const isMyEmail = inputEmail === ADMIN_EMAIL.toLowerCase().trim();
            const userRole = isMyEmail ? 'admin' : (loggedInUser?.role || 'user');

            dispatch(setUserProfile({
                id: dynamicId,
                name: inputEmail.split('@')[0], 
                email: inputEmail,
                image: "/images/icons/User_alt.svg",
                password: password,
                role: userRole  
            }));
            if (userRole === 'admin') {
                router.push('/admin');
            } else {
                router.push(`/account/${dynamicId}?tab=info`);
            }
        }
    };

    if (status === "loading") return <div className="text-center py-6 text-gray-500">Loading...</div>;

    return (
        <div className="auth-form-container">
            <div className="auth-container auth-container--login">
                <div className="Legend"><h1 className="auth-title">Sign In</h1></div>              
                    <form className="auth-form" onSubmit={handleEmailLogin} noValidate>
                        <div className="InputField">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" className="Input" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                            {formErrors.email && (
                                <span className="text-grey-500 text-sm mt-1 block">{formErrors.email}</span>
                            )}
                        </div>
                        <div className="InputField">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" className="Input" autoComplete="current-password" required/>
                            {formErrors.password && (
                                <span className="text-grey-500 text-sm mt-1 block">{formErrors.password}</span>
                            )}
                        </div>
                        <div className="ButtonGroup">
                            <button type="submit" className="button button--primary">Sign In</button>
                        </div>
                        <div className="TextLink">
                            <Link href="/forgot_password">Forgot password?</Link>
                        </div>
                    </form>
                <div className="devider">
                    <div className="line-devider"><svg viewBox="0 0 166 1" fill="none"><path d="M0.5 0.5L165 0.5" stroke="#E2E2E2" strokeLinecap="round" /></svg></div>
                    <span>Or</span>
                    <div className="line-devider"><svg viewBox="0 0 166 1" fill="none"><path d="M0.5 0.5L165 0.5" stroke="#E2E2E2" strokeLinecap="round" /></svg></div>
                </div>

                <div className="social-login-providers">
                    {/* Кнопка Google */}
                    <button type="button" onClick={() => signIn('google')} className="button button--secondary social-login-button">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://w3.org">
                            <path d="M21.7501 12.2242C21.7501 11.5615 21.6953 10.8951 21.5783 10.2431H12.1965V13.9976H17.569C17.3461 15.2084 16.6298 16.2796 15.5808 16.9603V19.3963H18.7861C20.6683 17.6982 21.7501 15.1905 21.7501 12.2242Z" fill="#4285F4" />
                            <path d="M12.1965 21.75C14.8791 21.75 17.1414 20.8866 18.7897 19.3963L15.5845 16.9603C14.6927 17.5549 13.5414 17.8917 12.2001 17.8917C9.60527 17.8917 7.4051 16.1757 6.61567 13.8686H3.30811V16.3799C4.99661 19.6722 8.43574 21.75 12.1965 21.75Z" fill="#34A853" />
                            <path d="M6.61196 13.8686C6.19532 12.6577 6.19532 11.3465 6.61196 10.1357V7.62436H3.30805C1.89732 10.3793 1.89732 13.625 3.30805 16.3799L6.61196 13.8686Z" fill="#FBBC04" />
                            <path d="M12.1965 6.10897C13.6145 6.08747 14.9851 6.61051 16.0121 7.57061L18.8518 4.78704C17.0537 3.13194 14.6671 2.222 12.1965 2.25066C8.43574 2.25066 4.99661 4.32848 3.30811 7.62435L6.61201 10.1357C7.39779 7.82497 9.60161 6.10897 12.1965 6.10897Z" fill="#EA4335" />
                        </svg>
                        <span>Continue with Google</span>
                    </button>

                    {/* Кнопка GitHub */}
                    <button type="button" onClick={() => signIn('github')} className="button button--secondary social-login-button">
                        {/* Иконка GitHub */}
                        <svg xmlns="http://w3.org" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        <span>Continue with GitHub</span>
                    </button>
                </div>
                <p className="auth-switch">Don't have an account? <Link href="/register">Register</Link></p>
            </div>
        </div>
    );
}