"use client";

import React, {useState} from 'react';
import {Plus, FileText, Upload, Bell, X, Grid as GridIcon, List as ListIcon} from 'lucide-react';
import MainLayout from '../../components/Layouts/MainLayout';

export default function DashboardPage() {
    const [showAlert, setShowAlert] = useState(true);
    const [isGridView, setIsGridView] = useState(true); // Toggle between grid and list view

    const projects = [
        {
            id: 1,
            name: 'Project Alpha',
            workspace: 'Branding Tips',
            updated: '2 days ago',
            imageUrl: 'https://images.unsplash.com/photo-1539877254216-818ed7c76096?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            userImage: 'https://randomuser.me/api/portraits/men/32.jpg',
        },
        {
            id: 2,
            name: 'Project Beta',
            workspace: 'Card Tutorial',
            updated: '5 days ago',
            imageUrl: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            userImage: 'https://randomuser.me/api/portraits/women/32.jpg',
        },
        {
            id: 3,
            name: 'Project Gamma',
            workspace: 'Social Media Campaign',
            updated: '1 week ago',
            imageUrl: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            userImage: 'https://randomuser.me/api/portraits/men/33.jpg',
        },
        {
            id: 4,
            name: 'Project Delta',
            workspace: 'Brand Development',
            updated: '3 days ago',
            imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            userImage: 'https://randomuser.me/api/portraits/women/33.jpg',
        },
        {
            id: 5,
            name: 'Project Epsilon',
            workspace: 'Marketing Strategy',
            updated: '2 weeks ago',
            imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            userImage: 'https://randomuser.me/api/portraits/men/34.jpg',
        },
        {
            id: 6,
            name: 'Project Zeta',
            workspace: 'UI/UX Design',
            updated: '4 days ago',
            imageUrl: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            userImage: 'https://randomuser.me/api/portraits/women/34.jpg',
        },
    ];

    return (
        <MainLayout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Notification Section (Alert) */}
                {showAlert && (
                    <div
                        className="bg-purple-600 text-white p-4 rounded-lg mb-8 flex items-center justify-between w-full">
                        <div className="flex items-center">
                            <Bell className="h-6 w-6 text-white mr-3"/>
                            <p>Don't Miss This Opportunity! Get 20% Discount For All Our Products!</p>
                        </div>
                        <div className="flex items-center">
                            <button
                                className="bg-white text-purple-600 px-4 py-2 rounded-md hover:bg-gray-100 transition duration-200">
                                Get Now
                            </button>
                            <button
                                className="ml-4 text-white hover:text-gray-200"
                                onClick={() => setShowAlert(false)}
                            >
                                <X className="h-6 w-6"/>
                            </button>
                        </div>
                    </div>
                )}

                {/* Create eBook Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div
                        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                        <Plus className="h-10 w-10 text-purple-600 mr-4"/>
                        <div>
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white">New eBook</h3>
                            <p className="text-gray-600 dark:text-gray-300">Create from scratch</p>
                        </div>
                    </div>

                    <div
                        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                        <Upload className="h-10 w-10 text-purple-600 mr-4"/>
                        <div>
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Import Files</h3>
                            <p className="text-gray-600 dark:text-gray-300">Import files or docs</p>
                        </div>
                    </div>

                    <div
                        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                        <FileText className="h-10 w-10 text-purple-600 mr-4"/>
                        <div>
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Templates</h3>
                            <p className="text-gray-600 dark:text-gray-300">Find the best templates</p>
                        </div>
                    </div>
                </div>

                {/* Recent Work Section */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Recent Work</h2>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setIsGridView(false)}
                                className={`p-2 rounded-md ${!isGridView ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white'} hover:bg-gray-300 dark:hover:bg-gray-600`}
                            >
                                <ListIcon className="h-5 w-5"/>
                            </button>
                            <button
                                onClick={() => setIsGridView(true)}
                                className={`p-2 rounded-md ${isGridView ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white'} hover:bg-gray-300 dark:hover:bg-gray-600`}
                            >
                                <GridIcon className="h-5 w-5"/>
                            </button>
                        </div>
                    </div>

                    {/* Recent Work Cards */}
                    <div className={isGridView ? 'grid grid-cols-1 md:grid-cols-3 gap-6' : 'space-y-4'}>
                        {projects.map((project) => (
                            <div key={project.id}
                                 className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                                {/* Image */}
                                <img
                                    className="w-full h-40 object-cover"
                                    src={project.imageUrl}
                                    alt={project.name}
                                />
                                {/* Card Footer */}
                                <div className="p-4 flex justify-between items-center">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-800 dark:text-white">{project.name}</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">Workspace: {project.workspace}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{project.updated}</p>
                                    </div>
                                    <img
                                        src={project.userImage}
                                        alt="User"
                                        className="h-10 w-10 rounded-full"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
