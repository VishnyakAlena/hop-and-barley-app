import { ICartProduct, Iproduct } from "@/app/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";

interface ICartState {
    products: ICartProduct[],
    total: number
}

const initialState:ICartState = {
    products: [],
    total: 0,
    }

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state, action: PayloadAction<ICartProduct[]>) => {
            state.products = action.payload;
            state.total = action.payload.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
        },
        
        // Экшен для полной очистки корзины (понадобится после успешного оформления заказа)
        clearCart: (state) => {
            state.products = [];
            state.total = 0;
        }
    }
})

export const {setCart, clearCart} = cartSlice.actions
export default cartSlice.reducer
export const selectTotalCartPrice = (state: RootState) => {
    return state.cart.products.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
};