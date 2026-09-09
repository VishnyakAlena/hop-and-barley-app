import { z } from 'zod';

export const profileSchema = z.object({
    full_name: z.string().min(2, "Name must be at least 2 characters long. "),
    phone: z
        .string()
        .regex(/^\+?[0-9]{10,15}$/, "Invalid phone format (e.g. +375291234567). ")
        .or(z.literal("")),
    city: z
        .string()
        .min(2, "City name is too short. ")
        .or(z.literal("")),
    address: z
        .string()
        .min(5, "Address must be at least 5 characters long. ")
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
            "The password must contain at least one uppercase letter, one lowercase letter, and one number. "
        )
});

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required. ")
        .email("Invalid email address. "),
    password: z
        .string()
        .min(1, "Password is required. ") 
});

export const forgotEmailSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email address. ")
});

export const updatePasswordSchema = z.object({
    password: z.string().min(6, "Password must be at least 6 characters. "),
    confirmPassword: z.string().min(1, "Confirm password. ")
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match. ",
    path: ["confirmPassword"],
});

export const productCardSchema = z.object({
    title: z.string().min(1, "Product name is required. "),
    category: z.string(),
    price: z
        .string()
        .min(1, "Product price is required. ") // 1. Четко проверяет пустоту строки
        .regex(/^\d+([.,]\d{1,2})?$/, "Price must be a number (e.g., 150 or 12.99). ") // 2. Защищает от букв
        .transform((val) => Number(val.replace(',', '.'))),
    description: z
        .string()
        .default('') 
        .transform((text) => {
            const paragraphs = text
                .split(/\n+/)
                .map((p) => p.trim())
                .filter((p) => p.length > 0);
            return paragraphs.length > 0 ? paragraphs : [''];
        }),
});