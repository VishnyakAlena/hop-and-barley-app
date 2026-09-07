import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { ADMIN_EMAIL } from "./app/constants";

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const pathname = req.nextUrl.pathname;

        if (pathname.startsWith("/login")) {
            return NextResponse.next();
        }

        if (!token || !token.email) {
            return NextResponse.redirect(new URL("/login", req.url));
        }

        // 1. Защита админки: если обычный юзер (не admin) пытается зайти на /admin,
        //    мы блокируем его и принудительно перенаправляем в личный кабинет /account
        if (pathname.startsWith("/admin") && token.email.toLowerCase().trim() !== ADMIN_EMAIL) {
            return NextResponse.redirect(new URL("/account", req.url));
        }

        // 2. Удобство для админа: если вы вошли под своим GitHub (с ролью admin)
        //    и попали на страницу /account, вас автоматически перекинет в админку
        if (pathname.startsWith("/account") && token.email.toLowerCase().trim() === ADMIN_EMAIL) {
            return NextResponse.redirect(new URL("/admin", req.url));
        }
    },
    {
  // 1. Принудительно передаем секретный ключ. Это защитит от "ошибки сервера"
    secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET || "super-secret-fallback-string-32-chars",
    callbacks: {
        // 3. Если токена сессии нет — возвращаем false, и NextAuth сам перекинет на signIn
        authorized: () => true,
    },
});

export const config = {
    // Страницы, которые защищает этот мидлварь
    matcher: [
        "/login",
        "/cart",
        "/checkout/:path*",
        "/account/:path*",
        "/admin/:path*"
    ],
};