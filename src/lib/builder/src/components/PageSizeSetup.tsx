"use client";

import React, { useState, useCallback, useMemo } from 'react';
import { ChevronDown, RotateCw } from 'lucide-react';
import { useLocalStorage } from '../utils/useLocalStorage';

interface PageSize {
  name: string;
  width: number;
  height: number;
}

const standardSizes: PageSize[] = [
  { name: 'Letter', width: 8.5, height: 11 },
  { name: 'A4', width: 8.27, height: 11.69 },
  { name: 'A5', width: 5.83, height: 8.27 },
  { name: 'Legal', width: 8.5, height: 14 },
];

interface PageSizeSetupProps {
  onPageSizeChange: (width: number, height: number) => void;
}

const PageSizeSetup: React.FC<PageSizeSetupProps> = ({ onPageSizeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useLocalStorage<PageSize>('pageSize', standardSizes[0]);
  const [customWidth, setCustomWidth] = useState(selectedSize.width.toString());
  const [customHeight, setCustomHeight] = useState(selectedSize.height.toString());
  const [units, setUnits] = useLocalStorage<'inch' | 'mm' | 'px'>('pageUnits', 'inch');
  const [orientation, setOrientation] = useLocalStorage<'portrait' | 'landscape'>('pageOrientation', 'portrait');

  const handleSizeChange = useCallback((size: PageSize) => {
    setSelectedSize(size);
    setCustomWidth(size.width.toString());
    setCustomHeight(size.height.toString());
    setIsOpen(false);
    onPageSizeChange(size.width, size.height);
  }, [setSelectedSize, onPageSizeChange]);

  const handleCustomSizeChange = useCallback(() => {
    const width = parseFloat(customWidth);
    const height = parseFloat(customHeight);
    if (width > 0 && height > 0) {
      const newSize = { name: 'Custom', width, height };
      setSelectedSize(newSize);
      onPageSizeChange(width, height);
    }
  }, [customWidth, customHeight, setSelectedSize, onPageSizeChange]);

  const toggleOrientation = useCallback(() => {
    setOrientation(prev => {
      const newOrientation = prev === 'portrait' ? 'landscape' : 'portrait';
      const { width, height } = selectedSize;
      onPageSizeChange(newOrientation === 'portrait' ? width : height, newOrientation === 'portrait' ? height : width);
      return newOrientation;
    });
  }, [selectedSize, setOrientation, onPageSizeChange]);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <span className="text-gray-700 dark:text-gray-300">Page: {selectedSize.name}</span>
        <ChevronDown size={16} className="text-gray-400" />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-10">
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">Standard Sizes</h3>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {standardSizes.map((size) => (
                <button
                  key={size.name}
                  onClick={() => handleSizeChange(size)}
                  className={`px-3 py-2 text-sm rounded-md transition-colors ${
                    selectedSize.name === size.name
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {size.name}
                </button>
              ))}
            </div>
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">Custom Size</h3>
            <div className="flex space-x-2 mb-3">
              <input
                type="number"
                value={customWidth}
                onChange={(e) => setCustomWidth(e.target.value)}
                className="w-20 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                placeholder="Width"
              />
              <input
                type="number"
                value={customHeight}
                onChange={(e) => setCustomHeight(e.target.value)}
                className="w-20 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                placeholder="Height"
              />
              <select
                value={units}
                onChange={(e) => setUnits(e.target.value as 'inch' | 'mm' | 'px')}
                className="px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="inch">inch</option>
                <option value="mm">mm</option>
                <option value="px">px</option>
              </select>
            </div>
            <button
              onClick={handleCustomSizeChange}
              className="w-full px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm font-medium"
            >
              Apply Custom Size
            </button>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
            <span className="text-sm text-gray-700 dark:text-gray-300">Orientation: {orientation}</span>
            <button
              onClick={toggleOrientation}
              className="p-2 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <RotateCw size={16} className="text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(PageSizeSetup);