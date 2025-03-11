'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

interface SocialLink {
    href: string;
    Icon: React.FC<{ size: number }>;
}

const socialLinks: SocialLink[] = [
    { href: '#', Icon: Facebook },
    { href: '#', Icon: Twitter },
    { href: '#', Icon: Instagram },
    { href: '#', Icon: Linkedin },
];

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <h3 className="text-xl font-bold mb-2">eBook Builder</h3>
                        <p className="text-gray-400">Create stunning interactive eBooks with ease</p>
                    </div>
                    <div className="flex space-x-4 mb-4 md:mb-0">
                        {socialLinks.map((social, index) => (
                            <a
                                key={index}
                                href={social.href}
                                className="text-green-500 hover:text-green-400 transition-colors"
                                aria-label={social.href}
                            >
                                <social.Icon size={24} />
                            </a>
                        ))}
                    </div>
                    <nav>
                        <ul className="flex flex-wrap justify-center md:justify-end space-x-4">
                            <li><Link href="/privacy" className="hover:text-green-400 transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-green-400 transition-colors">Terms of Service</Link></li>
                            <li><Link href="/about" className="hover:text-green-400 transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-green-400 transition-colors">Contact</Link></li>
                        </ul>
                    </nav>
                </div>
                <div className="mt-8 text-center text-gray-400">
                    <p>&copy; 2023 eBook Builder. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
