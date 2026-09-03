import { configureStore } from "@reduxjs/toolkit";
import cartSlice from './slices/cartSlice';
import userSlice from "./slices/userSlice";
import orderSlice from "./slices/orderSlice";

// 1. Создаем функцию для изоляции хранилища под каждый запрос/клиент
export const makeStore = () => {
    return configureStore({
        reducer: {
            cart: cartSlice,
            user: userSlice,
            order: orderSlice,
        }
    });
};

// 2. Выводим типы на основе функции makeStore, а не глобального объекта store
export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']