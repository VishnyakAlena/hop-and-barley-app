import { productsAllInfo } from '@/app/db/ProductsDB';
import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json(productsAllInfo);
}