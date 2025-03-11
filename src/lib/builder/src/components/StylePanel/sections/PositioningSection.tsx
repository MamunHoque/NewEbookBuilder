import React from 'react';
import { ArrowUpCircle, ArrowDownCircle, ChevronsUp, ChevronsDown } from 'lucide-react';
import { Element } from '../../../types';

interface PositioningSectionProps {
  element: Element;
  updateStyle: (style: Partial<CSSStyleDeclaration>) => void;
}

const PositioningSection: React.FC<PositioningSectionProps> = ({ element, updateStyle }) => {
  const handleZIndexChange = (change: number) => {
    const currentZIndex = parseInt(element.style?.zIndex || '1');
    updateStyle({ zIndex: (currentZIndex + change).toString() });
  };

  const handleZIndexInput = (value: string) => {
    const newZIndex = parseInt(value) || 1;
    updateStyle({ zIndex: newZIndex.toString() });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Layer Position
        </label>
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-sm text-gray-600 dark:text-gray-400">Z-Index:</span>
          <input
            type="number"
            value={element.style?.zIndex || '1'}
            onChange={(e) => handleZIndexInput(e.target.value)}
            className="w-20 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => handleZIndexChange(1000)}
            className="flex items-center justify-center px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
            title="Bring to Front"
          >
            <ChevronsUp size={16} className="mr-1" />
            Front
          </button>
          <button
            onClick={() => handleZIndexChange(1)}
            className="flex items-center justify-center px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
            title="Bring Forward"
          >
            <ArrowUpCircle size={16} className="mr-1" />
            Forward
          </button>
          <button
            onClick={() => handleZIndexChange(-1)}
            className="flex items-center justify-center px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
            title="Send Backward"
          >
            <ArrowDownCircle size={16} className="mr-1" />
            Back
          </button>
          <button
            onClick={() => handleZIndexChange(-1000)}
            className="flex items-center justify-center px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
            title="Send to Back"
          >
            <ChevronsDown size={16} className="mr-1" />
            Bottom
          </button>
        </div>
      </div>
    </div>
  );
};

export default PositioningSection;