"use server";

import { usersAllInfo } from "@/app/db/UsersDB"; // Убедитесь, что путь к вашей базе верный
import { revalidatePath } from 'next/cache';

// Наш экшен по вашей аналогии, принимает userId и formData
export async function updateProfileAction(userEmail: string, formData: FormData) {
    
    // Забираем данные из инпутов по значению их атрибутов 'name'
    const fullName = formData.get('full_name');
    const phone = formData.get('phone');
    const city = formData.get('city');
    const address = formData.get('address');

    // Находим индекс пользователя в массиве по его ID
    const userIndex = usersAllInfo.findIndex(u => u.email === userEmail);

    if (userIndex !== -1) {
        // По вашей аналогии: превращаем данные в строки с подстраховкой (String)
        usersAllInfo[userIndex].name = fullName ? String(fullName) : "GitHub User";
        usersAllInfo[userIndex].phone = phone ? String(phone) : "";
        usersAllInfo[userIndex].city = city ? String(city) : "";
        usersAllInfo[userIndex].address = address ? String(address) : "";

        console.log(`[Server Action] Данные пользователя ID ${userEmail} успешно обновлены!`);
    }

    // По вашей аналогии: очищаем кэш этой страницы, чтобы инпуты сразу обновились новыми defaultValue
    revalidatePath(`/account/${userEmail}`);
}