// src/app/layout.tsx
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { AuthProvider } from '../context/AuthContext'; // Ensure correct path

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Your App Title",
    description: "Your App Description",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <AuthProvider>
            {children}
        </AuthProvider>
        </body>
        </html>
    );
}
