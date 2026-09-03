import { createSelector } from '@reduxjs/toolkit'; // 🌟 1. Импортируем createSelector
import { RootState } from '../index';
import { productsWitoutUsersofReviews } from '@/app/db/ProductsDB'; // импортируем сырые продукты

// 🌟 2. Создаем простой «входной» селектор, который следит только за пользователями
const selectAllReduxUsers = (state: RootState) => state.user.users;

// 🌟 3. Переписываем allProductsInfo на createSelector для кэширования ссылок
export const allProductsInfo = createSelector(
    [selectAllReduxUsers], // Передаем зависимости
    (allReduxUsers) => {
        // Логика сборки сработает ТОЛЬКО если изменился массив allReduxUsers!
        console.log("=== СЕЛЕКТОР: Сборка продуктов с живыми отзывами из кэша ===");

        return productsWitoutUsersofReviews.map(product => {
            return {
                ...product,
                latestReviews: product.latestReviews?.map(review => {
                    // Ищем пользователя в живой Редукс-базе данных
                    const user = allReduxUsers.find(u => String(u.id) === String(review.userId));
                    
                    return {
                        ...review,
                        // Динамически подставляем имя и фото из Redux стора!
                        userName: user ? (Array.isArray(user.name) ? user.name[0] : user.name) : "Anonymous User",
                        userImage: user ? user.image : "/images/icons/User_alt.svg"
                    };
                }) || []
            };
        });
    }
);