"use client";

import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import { BookOpen, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import {useRouter} from "next/navigation";


export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const { register, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(name, email, password, passwordConfirmation);
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        {/* Card Header */}
        <div className="flex items-center justify-start mb-6">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <BookOpen className="h-10 w-10 text-purple-600" /> {/* Increased size */}
          </div>
          {/* Title and Description Section */}
          <div className="ml-4 flex-grow">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Create an account</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap overflow-hidden text-ellipsis">Join eBookBuilder and start creating amazing eBooks</p>
          </div>
        </div>

        {/* Sign up with Google/Facebook Buttons */}
        <button className="w-full bg-red-500 text-white py-2 px-4 rounded-md mb-4 flex items-center justify-center">
          <img src="/google-icon.png" alt="Google" className="w-5 h-5 mr-2" />
          Sign up with Google
        </button>
        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md mb-4 flex items-center justify-center">
          <img src="/facebook-icon.png" alt="Facebook" className="w-5 h-5 mr-2" />
          Sign up with Facebook
        </button>

        {/* Separator */}
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-4 text-gray-500">or sign up with email</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
                type="text"
                placeholder="Name"
                className="w-full px-3 py-2 border rounded-md pr-10 text-gray-800 dark:text-white"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
          </div>
          <div className="mb-4">
            <input
                type="email"
                placeholder="Email"
                className="w-full px-3 py-2 border rounded-md pr-10 text-gray-800 dark:text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
          </div>
          <div className="mb-6 relative">
            <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-3 py-2 border rounded-md pr-10 text-gray-800 dark:text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
            </button>
          </div>

          <div className="mb-6 relative">
            <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="w-full px-3 py-2 border rounded-md pr-10 text-gray-800 dark:text-white"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                required
            />
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
            </button>
          </div>

          <button type="submit" className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700">
            Sign Up
          </button>
        </form>

        {/* Footer Links */}
        <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
          Already have an account? <Link href="/login" className="text-purple-600 hover:underline">Sign in</Link>
        </p>
        {/* Bottom Section */}
        <div className="mt-8">
          <p className="text-center text-sm text-gray-500">
            By signing in, you agree to our <a href="#" className="text-purple-600 hover:underline">Terms and
            Conditions</a>
          </p>
          <p className="mt-4 text-center text-sm text-gray-500">
            © 2023 eBookBuilder. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
