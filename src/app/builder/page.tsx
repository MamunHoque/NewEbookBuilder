"use client";

import dynamic from 'next/dynamic';

const Builder = dynamic(() => import('../../lib/builder/src/Builder'), { ssr: false });

export default function BuilderPage() {
    return (
        <div className="h-screen">
            <Builder />
        </div>
    );
}