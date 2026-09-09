"use server"
import { revalidatePath } from "next/cache";

export async function deleteProductAction(productId: string | null) {
    if (!productId) return { success: false, message: "ID не передан" };

    revalidatePath('/admin/products');
    revalidatePath('/');

    return {
        success: true,
        message: "Товар успешно удален с сервера"
    };
}