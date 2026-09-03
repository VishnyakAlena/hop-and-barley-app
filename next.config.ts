import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL('http://localhost:3000/api/barley/**'),
       {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com', // Полностью разрешаем домен GitHub
        port: '',
        pathname: '/**', // Разрешаем любые подпапки, ID пользователей и маски путей
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // Полностью разрешаем домен Google
        port: '',
        pathname: '/**', // Игнорируем search параметры, чтобы пропускать любые размеры вроде =s96-c
      },
    ]
  }
};

export default nextConfig;
