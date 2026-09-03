import { z } from 'zod';

export const profileSchema = z.object({
    full_name: z.string().min(2, "Name must be at least 2 characters long"),
    phone: z
        .string()
        .regex(/^\+?[0-9]{10,15}$/, "Invalid phone format (e.g. +375291234567)")
        .or(z.literal("")),
    city: z
        .string()
        .min(2, "City name is too short")
        .or(z.literal("")),
    address: z
        .string()
        .min(5, "Address must be at least 5 characters long")
        .or(z.literal("")),
});

export const registerSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required. ")
        .email("Invalid email address format. "),
    password: z
        .string()
        .min(1, "Password is required. ")
        .min(6, "Password must be at least 6 characters long. ")
        .regex(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/, 
            "The password must contain at least one uppercase letter, one lowercase letter, and one number."
        )
});

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Некорректный формат Email адреса"),
    password: z
        .string()
        .min(1, "Password is required") 
});


export const forgotEmailSchema = z.object({
    email: z.string().min(1, "Email is required").email("Некорректный формат Email адреса")
});

// Схема для Ввод и подтверждение пароля
export const updatePasswordSchema = z.object({
    password: z.string().min(6, "Пароль должен быть не менее 6 символов"),
    confirmPassword: z.string().min(1, "Повторите пароль")
}).refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"], // Ошибка привяжется к инпуту подтверждения
});