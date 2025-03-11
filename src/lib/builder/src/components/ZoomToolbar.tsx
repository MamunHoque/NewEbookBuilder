import React, { useEffect } from 'react';
import { ZoomIn, ZoomOut } from 'lucide-react';

interface ZoomToolbarProps {
    zoom: number;
    onZoom: (newZoom: number) => void;
    onPageNext: () => void;
    onPagePrevious: () => void;
}

const ZoomToolbar: React.FC<ZoomToolbarProps> = ({ zoom, onZoom, onPageNext, onPagePrevious }) => {
    const handleZoomIn = () => {
        onZoom(Math.min(zoom + 10, 200));
    };

    const handleZoomOut = () => {
        onZoom(Math.max(zoom - 10, 50));
    };

    // Add keyboard shortcuts
    useEffect(() => {
        const handleKeydown = (event: KeyboardEvent) => {
            if (event.key === '+') {
                handleZoomIn();
            } else if (event.key === '-') {
                handleZoomOut();
            } else if (event.key === 'ArrowRight') {
                onPageNext();
            } else if (event.key === 'ArrowLeft') {
                onPagePrevious();
            }
        };

        window.addEventListener('keydown', handleKeydown);

        return () => {
            window.removeEventListener('keydown', handleKeydown);
        };
    }, [zoom, onZoom, onPageNext, onPagePrevious]);

    return (
        <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 rounded-full shadow-md flex items-center px-3 py-1 space-x-2 z-50">
            <button
                onClick={handleZoomOut}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                aria-label="Zoom out"
            >
                <ZoomOut size={16} className="text-gray-600 dark:text-gray-300" />
            </button>
            <span className="text-xs font-medium text-gray-800 dark:text-gray-200">{zoom}%</span>
            <button
                onClick={handleZoomIn}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                aria-label="Zoom in"
            >
                <ZoomIn size={16} className="text-gray-600 dark:text-gray-300" />
            </button>
        </div>
    );
};

export default ZoomToolbar;
