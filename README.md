# Hop & Barley - E-Commerce Application

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org).

## Tech Stack & Architecture
- **Framework:** Next.js 15 (React 19, Server & Client Components)
- **State Management:** Redux Toolkit (with `createSelector` reference memoization & LocalStorage synchronization)
- **Authentication:** NextAuth.js (Credentials, Google, and GitHub Providers)
- **Styling:** Modular CSS

---

## Authentication & Access Guide (For Reviewers)

The application utilizes a secure, unified authentication system. Access control (Customer vs. Administrator views) is determined dynamically via custom Next.js Middleware and strict evaluation of the authenticated user's email address against environment configurations.

### IMPORTANT: Environment Setup (Action Required)
To be able to run the application locally and access the Administrator Dashboard (OPTION A: Reviewing via Local Cloning (GitHub Repository)), **you must create your own `.env` file** in the root directory of the project 

1. Create a file named `.env` in the root folder.
2. Copy and paste the following configuration structure, filling in your own values:

```bash
# Application URL & NextAuth Core Config
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="super-secret-fallback-string-32-chars"

# ADMINISTRATOR EMAIL
# Put your own email address here to dynamically grant Admin dashboard privileges upon login:
NEXT_PUBLIC_ADMIN_EMAIL="your-personal-email@mail.ru"

# E-Commerce Gateways (Mock Integration / Feature Flag)
# Reserved for future production payment gateway connection (e.g., Stripe public key):
NEXT_PUBLIC_KEY="mock-public-key-placeholder"

# OAuth Integration Keys (Optional for local review)
# Fill these from your Google/GitHub Developer Consoles if testing Social login:
GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```
*Note: If the development server is already running, you must restart it (`npm run dev`) after creating or modifying the `.env` file so Next.js can read the new variables.*

---

### Testing as a Regular User
To explore the store from a customer's perspective (Cart, Checkout, and Personal Order History):
1. Navigate to the **Register** page (`/register`).
2. Create a new account with **any email** (except the one you specified in `NEXT_PUBLIC_ADMIN_EMAIL`).
3. Upon successful registration, you will be automatically logged in and redirected to your personal profile at `/account/[id]?tab=info`.
4. Add items to your cart, change quantities, place an order, and watch the status progress in the order history table.

---

### Testing as an Administrator (Admin Panel)

### OPTION A: Reviewing via Local Cloning (GitHub Repository)

To view global analytics, cumulative store metrics, and test live data updates:
1. Navigate to the **Register** page (`/register`) or **Sign In** page (`/login`).
2. Log in or create an account using **EXACTLY the same email** you provided in your `.env` file under `NEXT_PUBLIC_ADMIN_EMAIL` (any password will be accepted).
3. The system evaluates your email directly at the middleware and route layer, instantly granting full administration privileges.
4. You will be automatically redirected to the **Admin Dashboard** (`/admin`).
5. **Real-time Status Engine:** The application includes a background status timer inside the header layout. You can watch your user orders automatically move from `Pending` ➔ `Confirmed` ➔ `Shipped` ➔ `Delivered` directly on the dashboard analytics in real time without refreshing the tab.

###  OPTION B: Reviewing via Live Vercel Deployment
Since the application is deployed on Vercel, the administrator email is already pre-configured in the hosting environment variables. 

**To access the Admin Panel, follow these steps:**
1. Navigate to the **Register** page (`/register`).
2. Create a new account using **EXACTLY this email**: `admin@test.ru`. You can choose any password.
3. The system will detect that this email matches the environment configuration, automatically grant full administration privileges, and instantly redirect you to the **Admin Dashboard** (`/admin`).

---

### Troubleshooting Cyclic Redirects / Clear Stale Cache
If you previously tested the application with varying environment or store states, browser storage conflicts might occur. To reset to a clean database state:
1. Open Browser DevTools (`F12`) ➔ Go to the **Application** (Storage) tab.
2. In the left menu, expand **Local Storage** and select `http://localhost:3000`.
3. Locate the **`mock_users_db`** key and delete it.
4. Perform a hard page refresh (**`Ctrl + F5`** or **`Cmd + Shift + R`**).

---

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org) to automatically optimize and load [Geist](https://vercel.com), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/app/building-your-application/deploying) for more details.