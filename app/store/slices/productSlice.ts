import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Iproduct } from '@/app/types';
import { productsWitoutUsersofReviews } from '@/app/db/ProductsDB'; // Ваша статичная база

interface ProductState {
    products: Iproduct[];
}

const getInitialProducts = (): any[] => {
    if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('mock_products_db');
        // Если в браузере уже есть сохраненная база (с новыми ценами) — берем её, иначе — берем файл DB
        return saved ? JSON.parse(saved) : (productsWitoutUsersofReviews || []);
    }
    return productsWitoutUsersofReviews || [];
};

const initialState: ProductState = {
    products: getInitialProducts(), 
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        // Редюсер для добавления нового товара
        addProduct: (state, action: PayloadAction<Iproduct>) => {
            state.products.push(action.payload);
            if (typeof window !== 'undefined') {
                localStorage.setItem('mock_products_db', JSON.stringify(state.products));
            }
        },
        // Редюсер для редактирования существующего товара
        updateProduct: (state, action: PayloadAction<Partial<Iproduct> & { id: number | string }>) => {
            const index = state.products.findIndex(p => String(p.id) === String(action.payload.id));
            if (index !== -1) {
                // Точечно перезаписываем свойства
                if (action.payload.name) state.products[index].name = action.payload.name;
                if (action.payload.unitMetrics) state.products[index].unitMetrics = action.payload.unitMetrics;
                if (action.payload.price) state.products[index].price = action.payload.price; 
                if (action.payload.category) state.products[index].category = action.payload.category;
                if (action.payload.description) state.products[index].description = action.payload.description;
                if (action.payload.shortDescription) state.products[index].shortDescription = action.payload.shortDescription;
                if (action.payload.image) state.products[index].image = action.payload.image;
                state.products[index].updatedAt = new Date().toISOString().split('T')[0];

                if (typeof window !== 'undefined') {
                    localStorage.setItem('mock_products_db', JSON.stringify(state.products));
                }
            }
        },
        deleteProduct: (state, action: PayloadAction<number | string>) => {
            state.products = state.products.filter(p => String(p.id) !== String(action.payload));

            if (typeof window !== 'undefined') {
                localStorage.setItem('mock_products_db', JSON.stringify(state.products));
            }
        },
        toggleHideProduct: (state, action: PayloadAction<number | string>) => {
            const index = state.products.findIndex(p => String(p.id) === String(action.payload));
            if (index !== -1) {
                // Инвертируем текущий статус скрытия (если было false/undefined -> станет true)
                state.products[index].isHidden = !state.products[index].isHidden;
                state.products[index].updatedAt = new Date().toISOString().split('T')[0];

                // Синхронизируем с LocalStorage
                if (typeof window !== 'undefined') {
                    localStorage.setItem('mock_products_db', JSON.stringify(state.products));
                }
            }
        },
    },
});

export const { addProduct, updateProduct, deleteProduct, toggleHideProduct } = productSlice.actions;

// Базовый селектор, который теперь обязан читать умный селектор отзывов!
export const selectRawProducts = (state: any) => state.products.products;

export default productSlice.reducer;