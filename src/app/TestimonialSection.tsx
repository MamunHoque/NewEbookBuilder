'use client';


interface Testimonial {
    name: string;
    photo: string;
    quote: string;
}

const testimonials: Testimonial[] = [
    { name: 'John Doe', photo: '/facebook.jpg', quote: 'This eBook builder has revolutionized my publishing process!' },
    { name: 'Jane Smith', photo: '/facebook.jpg', quote: 'I love how easy it is to create interactive content with this tool.' },
    { name: 'Jane Smith', photo: '/facebook.jpg', quote: 'I love how easy it is to create interactive content with this tool.' },
    // Add more testimonials
];

const TestimonialSection: React.FC = () => {
    return (
        <section className="bg-gray-800 py-20">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-gray-700 p-6 rounded-lg">
                            <img src={testimonial.photo} alt={testimonial.name} className="w-20 h-20 rounded-full mx-auto mb-4" />
                            <p className="text-lg italic mb-4">"{testimonial.quote}"</p>
                            <p className="font-semibold">{testimonial.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialSection;
