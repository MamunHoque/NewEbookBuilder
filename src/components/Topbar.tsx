"use client";  // Add this line at the top for client-side rendering

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Bell, Sun, Moon, Monitor, BookOpen } from 'lucide-react';

const Topbar: React.FC = () => {
  const [theme, setTheme] = useState('system'); // Default theme is system

  const toggleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left section: Search Bar */}
          <div className="flex items-center space-x-4">
            <div className="relative text-gray-600 dark:text-gray-200">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <Search className="h-5 w-5" />
              </span>
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Right section: Theme toggle, notifications, and new ebook button */}
          <div className="flex items-center space-x-6">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-1 rounded-full text-gray-600 dark:text-gray-200 hover:text-gray-800 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">Toggle theme</span>
              {theme === 'light' ? <Sun className="h-6 w-6" /> : theme === 'dark' ? <Moon className="h-6 w-6" /> : <Monitor className="h-6 w-6" />}
            </button>

            {/* Notifications Button */}
            <button className="p-1 rounded-full text-gray-600 dark:text-gray-200 hover:text-gray-800 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <span className="sr-only">View notifications</span>
              <Bell className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* New eBook Button */}
            <Link href="/builder">
              <button className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-all duration-200">
                New eBook
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;