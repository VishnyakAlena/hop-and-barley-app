import { IBarleysResponse } from "@/app/types";
import Product from "./Product";

export default async function ProductsList() {

    const response = await fetch('http://localhost:3000/api/barleys', {
        next: { 
            revalidate: 60 * 60,
        }
    });
    const data:IBarleysResponse = await response.json() 

    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            {data && data.map(item => <Product product={item} key={item.id}/>)}
        </div>
    )
}