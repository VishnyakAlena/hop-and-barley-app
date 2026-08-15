"use client"

import { useSession } from "next-auth/react"
import Image from "next/image"
import { SignInButton, SignOutButton } from "./SignIn"


export default function UserBlock() {
    const { data: session } = useSession()

    return (
        <section className="flex items-center gap-20 justify-center bg-zinc-50 font-sans dark:bg-black">
            {session?.user ? (
                <>
                    <p>Привет, {session.user.name}</p>
                    <Image 
                        src={session.user.image || ''} 
                        alt="user-image"
                        width={100} 
                        height={100}
                    />
                    <SignOutButton />
                </>
            ) : <>
                    <p>Вы не авторизованы</p>
                    <SignInButton />
                </>
            }
        </section>
    )
}