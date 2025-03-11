'use client';

import Link from 'next/link';
import { Home, LogIn, UserPlus, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext'; // Adjust the import path if necessary

const Navigation: React.FC = () => {
    const { isAuthenticated } = useAuth(); // Assuming isAuthenticated returns a boolean
    const loggedIn = isAuthenticated(); // Only check once to optimize re-renders

    // Define a reusable class for links
    const linkClass = "hover:text-green-400 transition-colors flex items-center";
    const buttonClass = "bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-4 rounded transition-colors flex items-center";

    return (
        <header className="bg-gray-800 sticky top-0 z-50">
            <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div className="text-xl font-bold">eBook Builder</div>
                <ul className="flex space-x-6">
                    <li>
                        <Link href="/" className={linkClass}>
                            <Home className="mr-2" size={18} aria-label="Home" />
                            Home
                        </Link>
                    </li>
                    {!loggedIn && (
                        <>
                            <li>
                                <Link href="/login" className={linkClass}>
                                    <LogIn className="mr-2" size={18} aria-label="Login" />
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link href="/signup" className={linkClass}>
                                    <UserPlus className="mr-2" size={18} aria-label="Signup" />
                                    Signup
                                </Link>
                            </li>
                        </>
                    )}
                    {loggedIn && (
                        <li>
                            <Link href="/dashboard" className={linkClass}>
                                <LayoutDashboard className="mr-2" size={18} aria-label="Dashboard" />
                                Dashboard
                            </Link>
                        </li>
                    )}
                    <li>
                        <Link href="/builder" className={buttonClass}>
                            <LayoutDashboard className="mr-2" size={18} aria-label="Try Builder" />
                            Try Builder
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Navigation;
