// src/components/LandingLayout.tsx
import React, { ReactNode } from 'react';

interface LandingLayoutProps {
    children: ReactNode;
}

const LandingLayout: React.FC<LandingLayoutProps> = ({ children }) => {
    return (
        <div>
            <main>{children}</main>
        </div>
    );
};

export default LandingLayout;
