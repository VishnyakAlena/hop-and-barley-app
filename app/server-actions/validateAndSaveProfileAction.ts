"use server";

import { profileSchema } from "@/app/schemas/schemas";

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

    const validatedFields = profileSchema.safeParse(rawData);

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
