import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

// `handlers` экспортирует GET и POST обработчики
const  handler = NextAuth({
    providers: [
        // Добавляем провайдера GitHub
        GitHubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || ''
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET || "super-secret-fallback-string-32-chars",
});

export { handler as GET, handler as POST }