import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { user, items, totalPrice } = body;

        if (!items || items.length === 0) {
            return NextResponse.json({ message: "Cart items are required" }, { status: 400 });
        }
        if (!user || !user.fullName) {
            return NextResponse.json({ message: "Full Name is required to place an order" }, { status: 400 });
        }

        console.log("=== СЕРВЕР: СОЗДАН НОВЫЙ ЗАКАЗ ===");
        console.log("Покупатель:", user.fullName, `(${user.email || 'OAuth / Гость'})`);
        console.log("Адрес доставки:", `г. ${user.city || 'Не указан'}, ул. ${user.address || 'Не указан'}`);
        console.log("Метод оплаты:", user.paymentMethod);
        console.log("Товары:", items.map((i: any) => `${i.title} (x${i.quantity})`).join(', '));
        console.log("Итоговая сумма:", totalPrice, "$");
        console.log("===================================");

        const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

        return NextResponse.json({
            success: true,
            message: "Order created successfully!",
            orderId: orderId
        }, { status: 201 });

    } catch (error) {
        console.error("API Order Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}