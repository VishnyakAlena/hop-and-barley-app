import { ICartProduct, Iproduct } from "@/app/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

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
        addProduct: (state, action: PayloadAction<Iproduct>) => {
            const productIndex = state.products.findIndex(item => item.id === action.payload.id)

            if(productIndex !== -1) {
                state.products[productIndex].quantity = Number(state.products[productIndex].quantity) + 1;
                state.products[productIndex].totalPrice = Number(state.products[productIndex].totalPrice) + Number(action.payload.price);
            } else {
                const newProduct:ICartProduct = {
                    quantity: 1,
                    totalPrice: action.payload.price,
                    id: action.payload.id,
                    product: action.payload
                }
                state.products.push(newProduct)
            }

            state.total = state.products.reduce((sum, item) => sum + Number(item.totalPrice), 0);
        },
        removeProduct: (state, action: PayloadAction<Iproduct>) => {
            const productIndex = state.products.findIndex(item => item.id === action.payload.id)

            if(productIndex === -1) return
            
            if (state.products[productIndex].quantity === 1) {
                // Безопасное удаление элемента через splice (не ломает прокси-стейт Immer)
                state.products.splice(productIndex, 1);
            } else {
                // 3. Если товаров больше одного — уменьшаем количество и стоимость этой позиции
                state.products[productIndex].quantity = Number(state.products[productIndex].quantity) - 1;
                state.products[productIndex].totalPrice = Number(state.products[productIndex].totalPrice) - Number(action.payload.price);
            }
            state.total = state.products.reduce((sum, item) => sum + Number(item.totalPrice), 0);
        },
    }
})

export const {addProduct, removeProduct} = cartSlice.actions
export default cartSlice.reducer