'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/app/store/storeHooks';
import { updateUserPassword } from '@/app/store/slices/userSlice';
import { forgotEmailSchema, updatePasswordSchema } from '@/app/schemas/schemas';
import './ForgotPasswordStyle.css';

export default function ForgotPasswordForm() {
    const dispatch = useAppDispatch();
    
    // 🌟 Больше никаких useRef! Берем пользователей напрямую из реактивного стейта Redux
    const allUsers = useAppSelector((state) => state.user.users);

    // Управляем этапами восстановления: 'email' | 'new-password' | 'success'
    const [step, setStep] = useState<'email' | 'new-password' | 'success'>('email');
    
    // Стейты данных полей
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Стейты раздельного вывода ошибок (строки)
    const [formErrors, setFormErrors] = useState<{ email?: string; password?: string; confirmPassword?: string }>({});

    // Подтягиваем сохраненный email из браузера при первом входе (если был сохранен)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedEmail = localStorage.getItem('saved_login_email');
            if (savedEmail) {
                setEmail(savedEmail);
            }
        }
    }, []);

    // Хэндлер Шага 1: Проверка Email
    const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormErrors({});

        const validation = forgotEmailSchema.safeParse({ email: email.toLowerCase().trim() });
        if (!validation.success) {
            const fieldErrors = validation.error.flatten().fieldErrors;
            setFormErrors({ email: fieldErrors.email?.[0] });
            return;
        }

        // Проверяем в Redux, зарегистрирован ли такой пользователь (allUsers всегда актуален)
        const userExists = allUsers.some(u => u.email.toLowerCase() === email.toLowerCase().trim());
        if (!userExists) {
            setFormErrors({ email: "Пользователь с таким Email не найден!" });
            return;
        }

        setStep('new-password');
    };

    // Хэндлер Шага 2: Сохранение нового пароля с проверкой равенства
    const handlePasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormErrors({});

        // Вызываем Zod-схему (в ней уже заложена поочередная валидация и проверка равенства паролей)
        const validation = updatePasswordSchema.safeParse({ password, confirmPassword });
        
        if (!validation.success) {
            const fieldErrors = validation.error.flatten().fieldErrors;
            setFormErrors({
                password: fieldErrors.password?.[0],
                confirmPassword: fieldErrors.confirmPassword?.[0]
            });
            return;
        }

        // 🌟 Redux-слайс теперь сам обновит состояние и перезапишет `mock_users_db` в localStorage!
        dispatch(updateUserPassword({ email: email.toLowerCase().trim(), newPassword: password }));

        // Переключаем на финальный экран успеха
        setStep('success');
    };

    return (
        <div className="auth-form-container">
            <div className="auth-container auth-container--forgot-password">
                
                {/* 1️⃣ ЭКРАН 1: Ввод Email */}
                {step === 'email' && (
                    <>
                        <div className="Legend">
                            <h1 className="auth-title">Reset Password</h1>
                        </div>
                        <form className="auth-form mt-6" onSubmit={handleEmailSubmit} noValidate>
                            <div className="InputField">
                                <label htmlFor="email">Email</label>
                                <input 
                                    type="email" id="email" name="email" className="Input" placeholder="Value" required 
                                    value={email} onChange={(e) => setEmail(e.target.value)}
                                />
                                {formErrors.email && <span className="text-red-500 text-sm mt-1 block">{formErrors.email}</span>}
                            </div>
                            <div className="ButtonGroup ButtonGroup--center">
                                <Link href="/login" className="button button--cancel">Cancel</Link>
                                <button type="submit" className="button button--primary">Reset Password</button>
                            </div>
                        </form>
                    </>
                )}

                {/* 2️⃣ ЭКРАН 2: Ввод нового пароля */}
                {step === 'new-password' && (
                    <>
                        <div className="Legend">
                            <h2 className="auth-title">New Password</h2>
                            <p className="auth-subtitle text-sm text-gray-500 mt-2">
                                Create a new strong password for <span className="text-gray-900 font-medium">{email}</span>.
                            </p>
                        </div>
                        <form className="auth-form mt-6" onSubmit={handlePasswordSubmit} noValidate>
                            <div className="InputField">
                                <label htmlFor="password">New Password</label>
                                <input 
                                    type="password" id="password" name="password" className="Input" placeholder="At least 6 characters" required 
                                    value={password} onChange={(e) => setPassword(e.target.value)}
                                />
                                {formErrors.password && <span className="text-grey-500 text-sm mt-1 block">{formErrors.password}</span>}
                            </div>
                            <div className="InputField">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input 
                                    type="password" id="confirmPassword" name="confirmPassword" className="Input" placeholder="Repeat password" required 
                                    value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                {formErrors.confirmPassword && <span className="text-grey-500 text-sm mt-1 block">{formErrors.confirmPassword}</span>}
                            </div>
                            <div className="ButtonGroup mt-4">
                                <button type="submit" className="button button--primary w-full">Save Changes</button>
                            </div>
                        </form>
                    </>
                )}

                {/* 3️⃣ ЭКРАН 3: Успешное завершение */}
                {step === 'success' && (
                    <div className="success-state text-center">
                        <div className="Legend">
                            <h1 className="auth-title">Success!</h1>
                        </div>
                        <p className="success-message my-4 text-gray-600">
                            Ваш пароль был успешно изменен в базе данных Redux. Теперь вы можете войти в систему, используя новые учетные данные.
                        </p>
                        <div className="ButtonGroup mt-6">
                            <Link href="/login" className="button button--primary text-center block w-full py-2">
                                Go to Sign In
                            </Link>
                        </div>
                    </div>
                )}
                
            </div>
        </div>
    );
}