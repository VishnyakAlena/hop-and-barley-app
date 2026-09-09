import { NextResponse } from 'next/server';
import { ICartProduct } from '@/app/types';

let serverCart: ICartProduct[] = [];

export async function GET() {
    return NextResponse.json(serverCart);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        
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

export async function DELETE(request: Request) {
    try {
        const body = await request.json();
        
        if (body.clearAll === true) {
            serverCart = [];
            console.log("=== СЕРВЕР: Корзина успешно очищена через DELETE ===");
            return NextResponse.json(serverCart);
        }

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