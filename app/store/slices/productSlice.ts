import { createSelector } from '@reduxjs/toolkit'; 
import { RootState } from '../index';
import { productsWitoutUsersofReviews } from '@/app/db/ProductsDB'; 

const selectAllReduxUsers = (state: RootState) => state.user.users;

export const allProductsInfo = createSelector(
    [selectAllReduxUsers], // Передаем зависимости
    (allReduxUsers) => {
        // Логика сборки сработает ТОЛЬКО если изменился массив allReduxUsers!
        console.log("=== СЕЛЕКТОР: Сборка продуктов с живыми отзывами из кэша ===");
        if (!productsWitoutUsersofReviews) return [];
        return productsWitoutUsersofReviews.map(product => {
            return {
                ...product,
                latestReviews: product.latestReviews?.map(review => {
                    // Ищем пользователя в живой Редукс-базе данных
                    const user = Array.isArray(allReduxUsers) 
                        ? allReduxUsers.find(u => String(u.id) === String(review.userId))
                        : null;
                    
                    return {
                        ...review,
                        // Динамически подставляем имя и фото из Redux стора!
                        userName: user?.name  ? (Array.isArray(user.name) ? user.name[0] : user.name) : "Anonymous User",
                        userImage: user?.image ? user.image : "/images/icons/User_alt.svg"
                    };
                }) || []
            };
        });
    }
);