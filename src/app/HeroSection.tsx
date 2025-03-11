'use client';

import Link from 'next/link';

const HeroSection: React.FC = () => {
    return (
        <section className="bg-gray-800 py-20 text-center">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Create and Publish Interactive eBooks Effortlessly</h1>
                <h2 className="text-xl md:text-2xl mb-8 opacity-80">The ultimate tool for authors, educators, and publishers</h2>
                <Link href="/builder" className="bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-6 rounded-lg text-lg transition-colors">
                    Get Started
                </Link>
            </div>
        </section>
    );
};

export default HeroSection;
