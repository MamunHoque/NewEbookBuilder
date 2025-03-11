import MainLayout from '../../components/Layouts/MainLayout';
import {ChevronDown} from 'lucide-react';

export default function TemplatesPage() {
    return (
        <MainLayout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-lg">
                        <h2 className="text-2xl font-bold mb-2">Explore our Suggested Templates</h2>
                        <p>Find the perfect template for your next eBook</p>
                    </div>
                    <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white p-6 rounded-lg">
                        <h2 className="text-2xl font-bold mb-2">Browse popular creators this year</h2>
                        <p>Get inspired by top eBook creators</p>
                    </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">All Templates</h2>
                    <div className="flex space-x-4">
                        <div className="relative">
                            <select
                                className="block appearance-none w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                <option>Trending</option>
                                <option>Last added</option>
                            </select>
                            <div
                                className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                                <ChevronDown size={20}/>
                            </div>
                        </div>
                        <button
                            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition duration-200">
                            Filter
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div key={item} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                            <img
                                src={`https://images.unsplash.com/photo-1539877254216-818ed7c76096?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
                                alt="Template" className="w-full h-48 object-cover"/>
                            <div className="p-4">
                                <h3 className="font-semibold mb-2">Template Name</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Category</p>
                                <button
                                    className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition duration-200 w-full">
                                    Use Template
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
}