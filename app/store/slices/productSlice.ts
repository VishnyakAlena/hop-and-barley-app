import { RootState } from '../index'; 
import { productsWitoutUsersofReviews } from '@/app/db/ProductsDB'; // импортируем сырые продукты

// Селектор, который собирает отзывы с актуальными пользователями из Redux на лету!
export const allProductsInfo = (state: RootState) => {
    const allReduxUsers = state.user.users; // Наша живая база пользователей в Redux

    return productsWitoutUsersofReviews.map(product => {
        return {
            ...product,
            latestReviews: product.latestReviews?.map(review => {
                // Ищем пользователя в живой Редукс-базе данных
                const user = allReduxUsers.find(u => String(u.id) === String(review.userId));
                
                return {
                    ...review,
                    // Динамически подставляем имя и фото из Redux стора!
                    userName: user ? user.name : "Anonymous User",
                    userImage: user ? user.image : "/images/icons/User_alt.svg"
                };
            }) || []
        };
    });
};