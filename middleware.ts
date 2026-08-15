import { withAuth } from "next-auth/middleware";

export default withAuth({
  // 1. Принудительно передаем секретный ключ. Это защитит от "ошибки сервера"
    secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET || "super-secret-fallback-string-32-chars",
    callbacks: {
        // 3. Если токена сессии нет — возвращаем false, и NextAuth сам перекинет на signIn
        authorized: ({ token }) => !!token,
    },
});

export const config = {
    // Страницы, которые защищает этот мидлварь
    matcher: [
        "/cart",
        "/account/[id]"
    ],
};