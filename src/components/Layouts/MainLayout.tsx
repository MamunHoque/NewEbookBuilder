// src/components/MainLayout.tsx
import React, { ReactNode } from 'react';
import Sidebar from './../Sidebar';
import Topbar from './../Topbar';
import ProtectedRoute from './../ProtectedRoute';

interface LayoutProps {
    children: ReactNode;
}

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <ProtectedRoute>
            <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
                <Sidebar />
                <div className="flex-1 flex flex-col overflow-hidden">
                    <Topbar />
                    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
                        {children}
                    </main>
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default MainLayout;
