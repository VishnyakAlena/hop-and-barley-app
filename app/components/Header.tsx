"use client"

import { useSession } from "next-auth/react"
import UserBlock from "./UserBlock"



export default function Header() {
    const { data: session } = useSession()

    return (
        <section className="flex items-center gap-20 justify-center bg-zinc-50 font-sans dark:bg-black">
            <p>Main header</p>
            <UserBlock />
        </section>
    )
}