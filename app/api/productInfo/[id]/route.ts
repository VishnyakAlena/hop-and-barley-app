import { productsWitoutUsersofReviews } from '@/app/db/ProductsDB';
import { NextResponse } from 'next/server';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const productInfoId = parseInt(id, 10);
        const productInfo = productsWitoutUsersofReviews.find(t => t.id === productInfoId);

        if (!productInfo) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json(productInfo);
        
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}