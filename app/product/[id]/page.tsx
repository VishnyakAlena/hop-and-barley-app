import ProductPageComponent from "@/app/components/ProductPageComponent";
import { Iproduct } from "@/app/types";

interface IParams {
    params: Promise<{
        id: string
    }>
}

export default async function ProductPage({ params }: IParams) {
    const { id } = await params
    const response = await fetch(`http://localhost:3000/api/barley/${id}`, {
            next: { 
                revalidate: 60 * 60,
            }
        });
    const data:Iproduct = await response.json() 
    return (
        <section className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <ProductPageComponent product={data}/>
        </section>
    )
}