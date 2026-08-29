import { useAppDispatch } from "../store/storeHooks";
import { setCart } from "../store/slices/cartSlice";
import { Iproduct } from "../types";

export function useCartActions() {
    const dispatch = useAppDispatch();

    async function addToCart(product: Iproduct) {
        try {
            const response = await fetch('/api/cart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ product })
            });
            if (response.ok) {
                const updatedCart = await response.json();
                dispatch(setCart(updatedCart));
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    }

    async function removeFromCart(product: Iproduct) {
        try {
            const response = await fetch('/api/cart', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ product, deleteAll: false })
            });
            if (response.ok) {
                const updatedCart = await response.json();
                dispatch(setCart(updatedCart));
            }
        } catch (error) {
            console.error("Error removing from cart:", error);
        }
    }

    async function clearProductFromCart(product: any) {
        try {
            const response = await fetch('/api/cart', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ product, deleteAll: true }) // Передаем флаг удаления
            });

            if (response.ok) {
                const updatedCart = await response.json(); 
                dispatch(setCart(updatedCart));           
            }
        } catch (error) {
            console.error("Ошибка при полном удалении:", error);
        }
    }

    // Возвращаем функции наружу
    return { addToCart, removeFromCart, clearProductFromCart };
}