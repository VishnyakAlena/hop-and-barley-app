import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google'; 
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
                usersJson: { type: "text" } 
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password are required");
                }

                const email = credentials.email.toLowerCase().trim();
                const password = credentials.password;

                // Парсим базу данных, присланную клиентом
                const users = credentials?.usersJson ? JSON.parse(credentials.usersJson) : [];

                // Ищем пользователя, приводя оба email к нижнему регистру
                const foundUser = users.find(
                    (u: any) => u && u.email && u.email.toLowerCase().trim() === email
                );

                if (!foundUser) {
                    throw new Error("Invalid email or password!");
                }

                // Проверяем пароль
                if (String(foundUser.password).trim() !== String(password).trim()) {
                    throw new Error("Invalid email or password!");
                }

                return {
                    id: String(foundUser.id),
                    name: foundUser.name, 
                    email: foundUser.email,
                    image: foundUser.image || '/images/icons/User_alt.svg'
                };
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || ''
        }),
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET || "super-secret-fallback-string-32-chars",
    callbacks: {
        async signIn({ user }) {
            return true; 
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user && token) {
                const extendedUser = session.user as { id?: string; name?: string | null; email?: string | null; image?: string | null };
                extendedUser.id = token.id as string;
            }
            return session;
        }
    }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };