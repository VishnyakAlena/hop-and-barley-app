import { NextResponse } from 'next/server';
import { ICartProduct } from '@/app/types';

// Имитация серверной базы данных корзины в памяти Node.js
let serverCart: ICartProduct[] = [];

// GET: Получить текущую корзину
export async function GET() {
    return NextResponse.json(serverCart);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        
        // 🌟 СТРАХОВКА: Если с фронтенда пришла команда полной очистки корзины
        if (body.clearAll === true) {
            serverCart = [];
            console.log("=== СЕРВЕР: Корзина успешно очищена через POST ===");
            return NextResponse.json(serverCart);
        }

        const { product } = body;

        if (!product || !product.id) {
            return NextResponse.json({ error: 'Invalid product data' }, { status: 400 });
        }

        const productId = typeof product.id === 'string' ? parseInt(product.id, 10) : product.id;
        const existingItem = serverCart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += 1;
            existingItem.totalPrice = existingItem.quantity * existingItem.product.price;
        } else {
            serverCart.push({
                id: productId,
                product: product, 
                quantity: 1,
                totalPrice: Number(product.price)
            });
        }

        return NextResponse.json(serverCart);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// DELETE: Уменьшить количество товара на 1, удалить полностью ИЛИ очистить всю корзину
export async function DELETE(request: Request) {
    try {
        const body = await request.json();
        
        // 🌟 СТРАХОВКА: Если с фронтенда пришел запрос на полную очистку корзины
        if (body.clearAll === true) {
            serverCart = [];
            console.log("=== СЕРВЕР: Корзина успешно очищена через DELETE ===");
            return NextResponse.json(serverCart);
        }

        const { product, deleteAll } = body;

        // Ваша стандартная проверка на наличие продукта (теперь она не упадет при clearAll)
        if (!product || !product.id) {
            return NextResponse.json({ error: 'Invalid product data' }, { status: 400 });
        }

        const productId = typeof product.id === 'string' ? parseInt(product.id, 10) : product.id;

        if (deleteAll) {
            serverCart = serverCart.filter(item => item.id !== productId);
        } else {
            const existingItem = serverCart.find(item => item.id === productId);

            if (existingItem) {
                if (existingItem.quantity > 1) {
                    existingItem.quantity -= 1;
                    existingItem.totalPrice = existingItem.quantity * existingItem.product.price;
                } else {
                    serverCart = serverCart.filter(item => item.id !== productId);
                }
            }
        }

        return NextResponse.json(serverCart);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}