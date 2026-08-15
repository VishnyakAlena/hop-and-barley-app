'use client'

import { useAppSelector } from "../store/storeHooks"

export default async function CartPage() {
    const { products, total } = useAppSelector((state) => state.cart)

    return (
        <section className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <p>Cart page</p>
            {products.map(item => <div>
                <span>{item.product.name} : {item.quantity}</span>
            </div>)}
            <p>Total price: {total.toFixed(2)}</p>
        </section>
    )
}