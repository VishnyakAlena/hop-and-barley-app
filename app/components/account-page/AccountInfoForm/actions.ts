"use server";

import { usersAllInfo } from "@/app/db/UsersDB"; // Убедитесь, что путь к вашей базе верный
import { revalidatePath } from 'next/cache';

// Наш экшен по вашей аналогии, принимает userId и formData
export async function updateProfileAction(prevState: any, formData: FormData) {
    
    const userEmail = formData.get('user_email') ? String(formData.get('user_email')) : "";
    const fullName = formData.get('full_name');
    const phone = formData.get('phone');
    const city = formData.get('city');
    const address = formData.get('address');

    if (!userEmail) {
        return { success: false, message: "Email пользователя не указан" };
    }

    // Находим индекс пользователя в массиве по его ID
    const userIndex = usersAllInfo.findIndex(u => u.email === userEmail);

    if (userIndex !== -1) {
        // По вашей аналогии: превращаем данные в строки с подстраховкой (String)
        usersAllInfo[userIndex].name = fullName ? String(fullName) : "GitHub User";
        usersAllInfo[userIndex].phone = phone ? String(phone) : "";
        usersAllInfo[userIndex].city = city ? String(city) : "";
        usersAllInfo[userIndex].address = address ? String(address) : "";

        console.log(`[Server Action] Данные пользователя ID ${userEmail} успешно обновлены!`);

        revalidatePath(`/account/${userEmail}`);

        // Возвращаем объект успеха
        return { success: true, message: "Данные успешно сохранены!" };
    }

    return { success: false, message: "Пользователь не найден в базе данных" };
}