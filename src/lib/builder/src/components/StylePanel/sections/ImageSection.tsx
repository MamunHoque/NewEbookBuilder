import React, { useState } from 'react';
import { Upload, Square, Circle, Image as ImageIcon } from 'lucide-react';
import { Element } from '../../../types';
import Slider from '../common/Slider';
import ImageComponent from '../../Images/ImageComponent';

interface ImageSectionProps {
  element: Element;
  updateStyle: (style: Partial<CSSStyleDeclaration>) => void;
}

const ImageSection: React.FC<ImageSectionProps> = ({ element, updateStyle }) => {
  const [showImagePicker, setShowImagePicker] = useState(false);

  // Parse current opacity from style
  const getCurrentOpacity = () => {
    const opacity = element.style?.opacity;
    return opacity ? parseFloat(opacity) : 1;
  };

  // Parse current rotation from transform style
  const getCurrentRotation = () => {
    const transform = element.style?.transform;
    if (!transform) return 0;
    const match = transform.match(/rotate\(([-\d.]+)deg\)/);
    return match ? parseFloat(match[1]) : 0;
  };

  const handleOpacityChange = (value: number) => {
    updateStyle({ opacity: value.toString() });
  };

  const handleRotateChange = (value: number) => {
    updateStyle({ transform: `rotate(${value}deg)` });
  };

  const handleShapeChange = (shape: string) => {
    let borderRadius = '0';
    switch (shape) {
      case 'rounded':
        borderRadius = '8px';
        break;
      case 'circle':
        borderRadius = '50%';
        break;
      case 'thumbnail':
        borderRadius = '4px';
        break;
    }
    updateStyle({ borderRadius });
  };

  const handleImageSelect = (newElement: Element) => {
    // Extract image URL from the new element's content
    const imageUrl = newElement.content.match(/src="([^"]*)"/)?.[1];
    if (imageUrl) {
      // Update the current element's content with the new image while preserving other attributes
      const newContent = element.content.replace(/src="[^"]*"/, `src="${imageUrl}"`);
      updateStyle({ content: newContent });
    }
    setShowImagePicker(false);
  };

  // Extract current image URL for preview
  const getCurrentImageUrl = () => {
    const match = element.content.match(/src="([^"]*)"/);
    return match ? match[1] : '';
  };

  if (showImagePicker) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg w-3/4 max-w-2xl max-h-[80vh] overflow-hidden">
          <ImageComponent
            addElement={handleImageSelect}
            onClose={() => setShowImagePicker(false)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Current Image
        </label>
        <div className="relative mb-2 h-32 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
          <img
            src={getCurrentImageUrl()}
            alt="Current"
            className="w-full h-full object-contain"
          />
        </div>
        <button
          onClick={() => setShowImagePicker(true)}
          className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <Upload size={16} className="mr-2" />
          Replace Image
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Shape
        </label>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => handleShapeChange('default')}
            className={`p-3 rounded flex items-center justify-center ${
              !element.style?.borderRadius
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            <Square size={20} />
          </button>
          <button
            onClick={() => handleShapeChange('rounded')}
            className={`p-3 rounded flex items-center justify-center ${
              element.style?.borderRadius === '8px'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            <Square size={20} className="rounded" />
          </button>
          <button
            onClick={() => handleShapeChange('circle')}
            className={`p-3 rounded flex items-center justify-center ${
              element.style?.borderRadius === '50%'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            <Circle size={20} />
          </button>
        </div>
      </div>

      <Slider
        label="Opacity"
        min={0}
        max={1}
        step={0.1}
        value={getCurrentOpacity()}
        onChange={handleOpacityChange}
      />

      <Slider
        label="Rotate"
        min={-180}
        max={180}
        step={1}
        value={getCurrentRotation()}
        onChange={handleRotateChange}
        unit="°"
      />
    </div>
  );
};

export default ImageSection;