"use client";

import { useState } from 'react';
import { Check } from 'lucide-react';

const PricingTier = ({ name, price, features, isPopular, onChoosePlan }) => (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 flex flex-col justify-between ${isPopular ? 'border-2 border-purple-600' : ''}`}>
        {isPopular && (
            <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
        Popular
      </span>
        )}
        <div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{name}</h3>
            <p className="text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                ${price}<span className="text-base font-normal text-gray-600 dark:text-gray-300">/month</span>
            </p>
            <ul className="mb-8 space-y-4">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                        <Check className="text-green-500 mr-2" size={20} />
                        <span className="text-gray-900 dark:text-gray-300">{feature}</span>
                    </li>
                ))}
            </ul>
        </div>
        <button
            onClick={onChoosePlan}
            className={`w-full py-3 px-4 text-lg font-semibold rounded-md transition duration-200 mt-auto ${isPopular ? 'bg-purple-600 text-white hover:bg-purple-700' : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'}`}
        >
            {isPopular ? 'Start Free Trial' : 'Choose Plan'}
        </button>
    </div>
);

const Pricing = () => {
    const [billingCycle, setBillingCycle] = useState('monthly'); // State for billing cycle
    const pricingData = {
        monthly: [
            { name: 'Starter', price: 10, features: ['1 User', '10 eBooks', 'Basic Templates', 'Email Support'], isPopular: false },
            { name: 'Professional', price: 30, features: ['5 Users', 'Unlimited eBooks', 'Advanced Templates', 'Priority Support', 'Custom Branding'], isPopular: true },
            { name: 'Enterprise', price: 100, features: ['Unlimited Users', 'Unlimited eBooks', 'Custom Templates', '24/7 Support', 'API Access', 'White-label Solution'], isPopular: false },
        ],
        yearly: [
            { name: 'Starter', price: 8, features: ['1 User', '10 eBooks', 'Basic Templates', 'Email Support'], isPopular: false },
            { name: 'Professional', price: 25, features: ['5 Users', 'Unlimited eBooks', 'Advanced Templates', 'Priority Support', 'Custom Branding'], isPopular: true },
            { name: 'Enterprise', price: 80, features: ['Unlimited Users', 'Unlimited eBooks', 'Custom Templates', '24/7 Support', 'API Access', 'White-label Solution'], isPopular: false },
        ]
    };

    const handleBillingToggle = () => {
        setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly');
    };

    const handleChoosePlan = (planName) => {
        alert(`You have selected the ${planName} plan!`);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
                Choose the Right Plan for You
            </h2>

            <div className="flex justify-center mb-8">
                <div className="bg-gray-200 dark:bg-gray-700 p-1 rounded-full flex">
                    <button
                        className={`px-6 py-2 rounded-full text-lg font-semibold transition-colors duration-200 ${billingCycle === 'monthly' ? 'bg-white dark:bg-gray-800 shadow text-gray-900 dark:text-white' : 'text-gray-800 dark:text-white'}`}
                        onClick={handleBillingToggle}
                    >
                        Monthly
                    </button>
                    <button
                        className={`px-6 py-2 rounded-full text-lg font-semibold transition-colors duration-200 ${billingCycle === 'yearly' ? 'bg-white dark:bg-gray-800 shadow text-gray-900 dark:text-white' : 'text-gray-800 dark:text-white'}`}
                        onClick={handleBillingToggle}
                    >
                        Yearly <span className="text-sm font-light">(Save 20%)</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {pricingData[billingCycle].map((tier, index) => (
                    <PricingTier
                        key={index}
                        name={tier.name}
                        price={tier.price}
                        features={tier.features}
                        isPopular={tier.isPopular}
                        onChoosePlan={() => handleChoosePlan(tier.name)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Pricing;
