import { productsAllInfo } from '@/app/db/ProductsDB';
import { NextResponse } from 'next/server';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    
    const { id } = await params
    const productInfoId = parseInt(id, 10);
    const productInfo = productsAllInfo.find(t => t.id === productInfoId);

    if (!productInfo) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(productInfo);
}