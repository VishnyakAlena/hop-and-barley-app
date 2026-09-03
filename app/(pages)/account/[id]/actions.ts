"use server";

import { z } from 'zod';

// Описываем правила валидации полей профиля через Zod
const profileSchema = z.object({
    full_name: z.string().min(2, "Name must be at least 2 characters long"),
    phone: z.string().regex(/^\+?[0-9]{10,15}$/, "Invalid phone format (e.g. +375291234567)"),
    city: z.string().min(2, "City name is too short"),
    address: z.string().min(5, "Address must be at least 5 characters long")
});

export interface ProfileActionResponse {
    success: boolean;
    errors?: {
        full_name?: string[];
        phone?: string[];
        city?: string[];
        address?: string[];
    };
    message?: string;
    data?: {
        full_name: string;
        phone: string;
        city: string;
        address: string;
    };
}

export async function validateAndSaveProfileAction(prevState: any, formData: FormData): Promise<ProfileActionResponse> {
    const rawData = {
        full_name: formData.get('full_name'),
        phone: formData.get('phone'),
        city: formData.get('city'),
        address: formData.get('address'),
    };

    // Проверяем данные через Zod
    const validatedFields = profileSchema.safeParse(rawData);

    // Если Zod нашёл ошибки — возвращаем их списком на фронтенд
    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Validation failed. Please check your fields."
        };
    }

    console.log("====== SERVER VALIDATION PASSED ======");
    console.log("Validated Data:", validatedFields.data);
    console.log("======================================");

    return { 
        success: true, 
        message: "Profile validated successfully!",
        data: validatedFields.data
    };
}
