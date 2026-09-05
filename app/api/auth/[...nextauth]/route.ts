import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google'; 
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';

const ADMIN_EMAIL = "vishnyak-elena@mail.ru";

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
                    image: foundUser.image || '/images/icons/User_alt.svg',
                    role: foundUser.role || 'user' 
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
    pages: {
        signIn: '/login', // Говорит NextAuth: "Моя форма входа лежит по адресу /login"
    },
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
                
                // Проверяем админскую почту на сервере (для входа через GitHub/Google)
                const isMyAdminEmail = user.email?.toLowerCase().trim() === ADMIN_EMAIL.toLowerCase().trim();
                
                if (isMyAdminEmail) {
                    token.role = 'admin';
                } else {
                    token.role = (user as any).role || 'user';
                }
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user && token) {
                const extendedUser = session.user as { 
                    id?: string; 
                    name?: string | null; 
                    email?: string | null; 
                    image?: string | null;
                    role?: string; 
                };
                extendedUser.id = token.id as string;
                extendedUser.role = token.role as string;
            }
            return session;
        },
        async redirect({ url, baseUrl }) {
            // NextAuth v4 передает в url ту страницу, с которой пользователь пришел, 
            // либо относительный путь. Перенаправляем на основе флага или параметров URL.
            
            // Если мы уже находимся в процессе перенаправления на админку или аккаунт, не зацикливаем
            if (url.startsWith(baseUrl)) {
                return url;
            } else if (url.startsWith("/")) {
                return `${baseUrl}${url}`;
            }
            
            return baseUrl;
        }
    }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };