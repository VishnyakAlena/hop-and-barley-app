"use server";

import { productCardSchema } from '@/app/schemas/schemas';
import { Iproduct } from '@/app/types';
import { revalidatePath } from 'next/cache';

export interface ProductActionResponse {
    success: boolean;
    errors?: {
        title?: string[];
        price?: string[];
        description?: string[];
        category?: string[];
        image_file?: string[];
        global?: string[];
    };
    message?: string;
    data?: Iproduct | null;
    timestamp?: number;
}

export async function saveProductAction(
    productId: string | null, 
    prevState: any, 
    formData: FormData
): Promise<ProductActionResponse> {
    try {
        const old_image = formData.get('old_image') as string | null;
        const base64_image = formData.get('base64_image') as string | null;

        const rawData = {
            title: formData.get('title'),
            price: formData.get('price'),
            category: formData.get('category'),
            description: formData.get('description'),   
        };

        const validatedFields = productCardSchema.safeParse(rawData);

        if (!validatedFields.success) {
            return {
                success: false,
                errors: validatedFields.error.flatten().fieldErrors,
                message: "Validation failed.",
                data: null,
                timestamp: Date.now()
            };
        }

        const { title, price, category, description } = validatedFields.data;

        const firstParagraph = Array.isArray(description) 
            ? (description[0] || '') 
            : (description || '');  
        const maxLength = 150;

        const autoShortDescription = firstParagraph.length > maxLength
            ? firstParagraph.slice(0, maxLength).trim() + '...'
            : firstParagraph;

        let imageUrl = '/images/Image-Preview.png'; 

        if (productId && old_image) {
            imageUrl = old_image; 
        }        
        
        if (base64_image && base64_image.trim() !== '') {
            imageUrl = base64_image; 
        }

        const finalId = productId ? parseInt(productId, 10) : Date.now();
        const formattedDate = new Date().toISOString().split('T')[0];

        let unitMetrics = "per 100g"; // Дефолтное значение
        const lowerCategory = category ? category.toLowerCase() : "";

        if ( lowerCategory.includes("malts") || lowerCategory.includes("wheat") ) {
            unitMetrics = "per 1 lb";
        } else if (lowerCategory.includes("yeast") ) {
            unitMetrics = "per pouch";
        } else if (lowerCategory.includes("hops") ) {
            unitMetrics = "per 100g";
        } else if (lowerCategory.includes("kits") ) {
            unitMetrics = "for 5 Gallons";
        }

        const productPayload: Iproduct = {
            id: finalId,
            name: title,
            description: description,               
            shortDescription: autoShortDescription, 
            unitMetrics: unitMetrics,
            price: Number(price), 
            category: category,
            technicalSpecifications: [], 
            createdAt: formattedDate,
            updatedAt: formattedDate, 
            image: imageUrl, 
            latestReviews: [],
        };

        console.log(`====== SERVER VALIDATION PASSED ======`);
        console.log(`Товар успешно сформирован для Redux:`, productPayload);
        console.log(`======================================`);

        revalidatePath('/admin/products');
        revalidatePath('/');

        return {
            success: true,
            message: productId ? "Товар успешно обновлен!" : "Товар успешно добавлен!",
            errors: {},
            data: productPayload, 
            timestamp: Date.now()
        };

    } catch (error) {
        console.log("❌❌❌ КРИТИЧЕСКАЯ ОШИБКА ВНУТРИ БЛОКА TRY: ❌❌❌");
        console.error(error); 

        return {
            success: false,
            errors: { global: ["Произошла внутренняя ошибка сервера."] },
            message: "Internal server error.",
            data: null,
            timestamp: Date.now()
        };
    }
}