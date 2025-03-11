'use client';

import { Icon as LucideIcon, Edit, Users } from 'lucide-react';

interface Feature {
    Icon: LucideIcon;
    title: string;
    description: string;
}

const features: Feature[] = [
    { Icon: Edit, title: 'Drag-and-Drop Editor', description: 'Easy-to-use interface for creating stunning eBooks' },
    { Icon: Edit, title: 'Multi-Format Export', description: 'Export to PDF, EPUB, HTML, and more' },
    { Icon: Users, title: 'Real-Time Collaboration', description: 'Work together with your team in real-time' },
    { Icon: Edit, title: 'Interactive Content', description: 'Add quizzes, videos, and more to engage readers' },
];

const FeatureSection: React.FC = () => {
    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-gray-800 p-6 rounded-lg hover:shadow-lg transition-shadow">
                            <feature.Icon className="w-12 h-12 text-green-500 mb-4" />
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-gray-400">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeatureSection;
