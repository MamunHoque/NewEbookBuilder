'use client';

import { useState, useEffect } from 'react';
import Navigation from './Navigation';
import HeroSection from './HeroSection';
import FeatureSection from './FeatureSection';
import TestimonialSection from './TestimonialSection';
import Footer from './Footer';
import Pricing from "./../components/Pricing";

const LandingPage = () => {
    const [isClient, setIsClient] = useState(false);

    // This will ensure the component only renders on the client side after hydration
    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null; // Avoid rendering during SSR, return only after hydration
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-900 text-white">
            <Navigation />
            <main className="flex-grow">
                <HeroSection />
                <FeatureSection />
                <TestimonialSection />
                <Pricing />
            </main>
            <Footer />
        </div>
    );
};

export default LandingPage;
