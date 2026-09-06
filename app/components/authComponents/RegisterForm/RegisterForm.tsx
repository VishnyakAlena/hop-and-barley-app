'use client'
import Link from 'next/link'; 
import './RegisterStyle.css'
import { useActionState, useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useAppDispatch, useAppSelector } from '@/app/store/storeHooks';
import { registerNewUser, setUserProfile } from '@/app/store/slices/userSlice'; // 🌟 ИМПОРТИРОВАЛИ setUserProfile
import { validateRegisterAction, RegisterActionResponse } from '@/app/(pages)/(auth)/register/actions';
import { IUserMock } from '@/app/types';
import { useRouter } from 'next/navigation';

const initialState: RegisterActionResponse = { success: false, errors: {}, data: undefined, timestamp: 0 };

export default function RegisterForm() {
    const dispatch = useAppDispatch();
    const router = useRouter(); 
    const allUsers = useAppSelector((state) => state.user.users);

    const [rememberMe, setRememberMe] = useState(true);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [email, setEmail] = useState('');
    const [state, formAction, isPending] = useActionState(validateRegisterAction, initialState);

    useEffect(() => {
        if (!state.timestamp || !state.success || !state.data) return;

        const validatedEmail = state.data.email.toLowerCase().trim();
        const validatedPassword = state.data.password;

        if (!validatedEmail || !validatedPassword) return;

        const emailExists = allUsers.some(u => u.email.toLowerCase() === validatedEmail);
        if (emailExists) {
            setSubmitError("User with this email already exists!");
            return;
        }

        setSubmitError(null);

        if (rememberMe) {
            localStorage.setItem('saved_login_email', validatedEmail);
        } else {
            localStorage.removeItem('saved_login_email');
        }

        const dynamicId = validatedEmail.split('').reduce((acc, char) => acc + char.charCodeAt(0), 100);

        const newUser: IUserMock = {
            id: dynamicId,
            name: validatedEmail.split('@')[0], 
            email: validatedEmail,
            password: validatedPassword,
            image: "/images/icons/User_alt.svg",
            phone: '', city: '', address: '', orders: [] // Массив заказов железно инициализирован!
        };

        // 1. Сначала сохраняем в общий список пользователей Redux (для админа)
        dispatch(registerNewUser(newUser));

        // Формируем список для NextAuth
        const updatedUsersList = [...allUsers, newUser];

        signIn('credentials', {
            email: validatedEmail,
            password: validatedPassword,
            usersJson: JSON.stringify(updatedUsersList), 
            redirect: false 
        }).then((res) => {
            if (res?.error) {
                setSubmitError(res.error);
            } else {
                // 🌟 ИСПРАВЛЕНО: Устанавливаем пользователя как активного в профиле Redux!
                // Это заставит стейт currentUser наполниться данными и синхронизирует 
                // все будущие заказы этого человека с общей базой данных админа.
                dispatch(setUserProfile({
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email,
                    image: newUser.image,
                    password: newUser.password,
                    role: 'user' // по умолчанию обычный пользователь
                }));

                router.push(`/account/${dynamicId}?tab=info`);
            }
        });

    }, [state.timestamp, router, dispatch, rememberMe, allUsers]);

    return (
        <div className="auth-form-container">
            <div className="auth-container auth-container--register">
                <div className="Legend"><h1 className="auth-title">Register</h1></div>
                {/* 🌟 Добавлен вывод ошибки сабмита, если NextAuth вернет сбой */}
                {submitError && <div className="text-red-500 text-sm mb-4 text-center">{submitError}</div>}
                
                <form className="auth-form" action={formAction} noValidate>
                    <div className="InputField">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" className="Input" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        {state.errors?.email && <span className="text-grey-500 text-sm mt-1 block">{state.errors.email}</span>}
                    </div>
                    <div className="InputField">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" className="Input" autoComplete="new-password"  required/>
                        {state.errors?.password && <span className="text-grey-500 text-sm mt-1 block">{state.errors.password}</span>}
                    </div>
                    <div className="CheckboxField">
                        <label className="checkbox-container">Remember me
                            <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                    <div className="ButtonGroup">
                        <button type="submit" className="button button--primary" disabled={isPending}>{isPending ? 'Registering...' : 'Register'}</button>
                    </div>
                </form>
                <p className="auth-switch">Already have an account? <Link href="/login">Sign in</Link></p>
            </div>
        </div>
    )
}