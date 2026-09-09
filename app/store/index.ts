import { configureStore } from "@reduxjs/toolkit";
import cartSlice from './slices/cartSlice';
import userSlice from "./slices/userSlice";
import orderSlice from "./slices/orderSlice";
import productSlice from "./slices/productSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            cart: cartSlice,
            user: userSlice,
            order: orderSlice,
            products: productSlice,
        }
    });
};

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']