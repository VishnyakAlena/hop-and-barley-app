import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ICheckoutInfo {
    fullName: string;
    phone: string;
    city: string;
    address: string;
    paymentMethod: string;
}

interface OrderState {
    checkoutInfo: ICheckoutInfo | null;
    isSuccess: boolean;
}

const initialState: OrderState = {
    checkoutInfo: null,
    isSuccess: false,
};

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        saveCheckoutInfo: (state, action: PayloadAction<ICheckoutInfo>) => {
            state.checkoutInfo = action.payload;
        },
        setOrderSuccess: (state, action: PayloadAction<boolean>) => {
            state.isSuccess = action.payload;
        },
        clearOrderState: (state) => {
            state.checkoutInfo = null;
            state.isSuccess = false;
        },
    }
});

export const { saveCheckoutInfo, setOrderSuccess, clearOrderState } = orderSlice.actions;

export default orderSlice.reducer;