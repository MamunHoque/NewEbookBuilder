// src/components/Sidebar.tsx
"use client";

import Link from 'next/link';
import {
  FileText,
  Users,
  Plus,
  Briefcase,
  Star,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext'; // Adjust the import path as necessary

const Sidebar = () => {
  const { logout } = useAuth();

  return (
      <div className="bg-white dark:bg-gray-800 w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
        {/* User Profile Section */}
        <div className="flex flex-col items-center mb-6">
          <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Profile"
              className="h-16 w-16 rounded-full object-cover mb-2"
          />
          <span className="text-lg font-semibold text-gray-800 dark:text-white">
          John Doe
        </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
          (Starter Package)
        </span>
          <hr className="border-gray-300 dark:border-gray-700 w-full my-4" />
        </div>

        {/* Menu Section */}
        <nav className="space-y-2">
          <Link
              href="/dashboard"
              className="flex items-center py-2.5 px-4 rounded-lg transition duration-200 hover:bg-purple-500 hover:text-white text-gray-700 dark:text-gray-200"
          >
            <Briefcase className="mr-2" size={20} /> Recent Work
          </Link>
          <Link
              href="/templates"
              className="flex items-center py-2.5 px-4 rounded-lg transition duration-200 hover:bg-purple-500 hover:text-white text-gray-700 dark:text-gray-200"
          >
            <FileText className="mr-2" size={20} /> Templates
          </Link>
          <Link
              href="/team-members"
              className="flex items-center py-2.5 px-4 rounded-lg transition duration-200 hover:bg-purple-500 hover:text-white text-gray-700 dark:text-gray-200"
          >
            <Users className="mr-2" size={20} /> Invite Members
          </Link>
          <hr className="border-gray-300 dark:border-gray-700 w-full my-4" />

          {/* Workspaces Section */}
          <div className="px-4 text-gray-800 dark:text-gray-400 text-sm font-semibold mb-2">
            Workspaces
          </div>
          <Link
              href="/workspace/branding-tips"
              className="flex items-center py-2.5 px-4 rounded-lg transition duration-200 hover:bg-purple-500 hover:text-white text-gray-700 dark:text-gray-200"
          >
            <Star className="mr-2" size={20} /> Branding Tips
          </Link>
          <Link
              href="/workspace/card-tutorial"
              className="flex items-center py-2.5 px-4 rounded-lg transition duration-200 hover:bg-purple-500 hover:text-white text-gray-700 dark:text-gray-200"
          >
            <Star className="mr-2" size={20} /> Card Tutorial
          </Link>
          <button className="flex items-center py-2.5 px-4 rounded-lg text-purple-600 hover:bg-purple-100 dark:hover:bg-purple-900 transition duration-200 w-full">
            <Plus className="mr-2" size={20} /> Add New Workspace
          </button>
        </nav>

        {/* Footer Section */}
        <div className="mt-auto px-4 space-y-2">
          <Link
              href="/pricing"
              className="bg-purple-600 text-white py-2 px-4 rounded-lg w-full hover:bg-purple-700 transition duration-200 text-center block"
          >
            Upgrade to Pro
          </Link>

          <button
              onClick={logout}
              className="flex items-center py-2.5 px-4 rounded-lg transition duration-200 hover:bg-red-500 hover:text-white text-gray-700 dark:text-gray-200 w-full"
          >
            <LogOut className="mr-2" size={20}/> Logout
          </button>
        </div>
      </div>
  );
};

export default Sidebar;
