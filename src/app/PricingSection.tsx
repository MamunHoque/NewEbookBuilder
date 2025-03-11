'use client';

const pricingPlans = [
    { name: 'Basic', price: '$9.99/month', features: ['Feature 1', 'Feature 2', 'Feature 3'] },
    { name: 'Pro', price: '$19.99/month', features: ['All Basic features', 'Feature 4', 'Feature 5'] },
    { name: 'Enterprise', price: 'Custom', features: ['All Pro features', 'Feature 6', 'Feature 7'] },
];

const PricingSection = () => {
    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Choose Your Plan</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {pricingPlans.map((plan, index) => (
                        <div key={index} className="bg-gray-800 p-6 rounded-lg text-center">
                            <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                            <p className="text-2xl font-bold text-green-500 mb-4">{plan.price}</p>
                            <ul className="mb-6">
                                {plan.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="mb-2">
                                        <i className="fas fa-check text-green-500 mr-2"></i>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <button className="bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-4 rounded transition-colors">
                                Select Plan
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PricingSection;
