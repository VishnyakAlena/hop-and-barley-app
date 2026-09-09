import { createSelector } from '@reduxjs/toolkit'; 
import { RootState } from '../index';
import { productsWitoutUsersofReviews } from '@/app/db/ProductsDB'; 
import { selectRawProducts } from './productSlice';
import { Iproduct } from '@/app/types';

const selectAllReduxUsers = (state: RootState) => state.user.users;

export const allProductsInfo = createSelector(
    [selectAllReduxUsers, selectRawProducts], 
    (allReduxUsers, allReduxProducts) => {
        if (!productsWitoutUsersofReviews) return [];
        return allReduxProducts.map((product: Iproduct) => {
            return {
                ...product,
                latestReviews: product.latestReviews?.map(review => {
                    const user = Array.isArray(allReduxUsers) 
                        ? allReduxUsers.find(u => String(u.id) === String(review.userId))
                        : null;
                    return {
                        ...review,
                        userName: user?.name  ? (Array.isArray(user.name) ? user.name[0] : user.name) : "Anonymous User",
                        userImage: user?.image ? user.image : "/images/icons/User_alt.svg"
                    };
                }) || []
            };
        });
    }
);