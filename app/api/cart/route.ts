import { NextResponse } from 'next/server';
import { ICartProduct } from '@/app/types';

// Имитация серверной базы данных корзины в памяти Node.js
let serverCart: ICartProduct[] = [];

// GET: Получить текущую корзину (понадобится для инициализации на страницах)
export async function GET() {
    return NextResponse.json(serverCart);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        // Извлекаем продукт из переданного body
        const { product } = body;

        if (!product || !product.id) {
            return NextResponse.json({ error: 'Invalid product data' }, { status: 400 });
        }

        // Приводим ID к числу, так как у вас в БД id имеет тип number
        const productId = typeof product.id === 'string' ? parseInt(product.id, 10) : product.id;

        // Ищем, есть ли уже этот товар в корзине на сервере
        const existingItem = serverCart.find(item => item.id === productId);

        if (existingItem) {
            // Если есть — просто увеличиваем счетчик количества
            existingItem.quantity += 1;
            existingItem.totalPrice = existingItem.quantity * existingItem.product.price;
        } else {
            // Если нет — пушим новый объект с начальным количеством 1
            serverCart.push({
                id: productId,
                product: product, // сохраняем весь объект товара (со всеми картинками и метриками)
                quantity: 1,
                totalPrice: Number(product.price)
            });
        }

        // Всегда возвращаем актуальный массив всей корзины
        return NextResponse.json(serverCart);

    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// DELETE: Уменьшить количество товара на 1 или полностью удалить, если оно равно 1
export async function DELETE(request: Request) {
    try {
        const body = await request.json();
        const { product, deleteAll } = body;

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
                    // Если товаров больше одного — уменьшаем на 1
                    existingItem.quantity -= 1;
                    existingItem.totalPrice = existingItem.quantity * existingItem.product.price;
                } else {
                    // Если товар был один — полностью удаляем его из массива
                    serverCart = serverCart.filter(item => item.id !== productId);
                }
            }
        }

        // Возвращаем измененную корзину обратно клиенту
        return NextResponse.json(serverCart);

    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}