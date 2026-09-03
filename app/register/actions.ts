"use server";

import { registerSchema } from '@/app/schemas/schemas'; 

export interface RegisterActionResponse {
    success: boolean;
    errors?: {
        email?: string[];
        password?: string[];
        global?: string;
    };
    message?: string;
    data?: {
        email: string;
        password?: string;
    };
    timestamp?: number;
}

export async function validateRegisterAction(prevState: RegisterActionResponse, formData: FormData): Promise<RegisterActionResponse> {
    const rawData = {
        email: formData.get('email'),
        password: formData.get('password'),
    };

    const validatedFields = registerSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Registration failed.",
            timestamp: Date.now()
        };
    }

    return {
        success: true,
        message: "Validation successful!",
        data: validatedFields.data,
        timestamp: Date.now()
    };
}