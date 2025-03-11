import React, { useState } from 'react';
import { Image, X } from 'lucide-react';
import { Element } from '../../../types';
import ColorPicker from '../common/ColorPicker';
import Select from '../common/Select';
import ImageComponent from '../../Images/ImageComponent';

interface BackgroundSectionProps {
  element: Element;
  updateStyle: (style: Partial<CSSStyleDeclaration>) => void;
}

const BackgroundSection: React.FC<BackgroundSectionProps> = ({ element, updateStyle }) => {
  const [activeTab, setActiveTab] = useState<'color' | 'image'>('color');
  const [showImagePicker, setShowImagePicker] = useState(false);

  const repeatOptions = [
    { value: 'no-repeat', label: 'No Repeat' },
    { value: 'repeat-x', label: 'Repeat Horizontally' },
    { value: 'repeat-y', label: 'Repeat Vertically' },
    { value: 'repeat', label: 'Repeat Both' }
  ];

  // Extract current background image URL
  const getCurrentBackgroundImage = () => {
    const bgImage = element.style?.backgroundImage;
    if (!bgImage || bgImage === 'none') return '';
    const match = bgImage.match(/url\(['"]?(.*?)['"]?\)/);
    return match ? match[1] : '';
  };

  const handleImageSelect = (newElement: Element) => {
    const imageUrl = newElement.content.match(/src="([^"]*)"/)?.[1];
    if (imageUrl) {
      updateStyle({
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      });
    }
    setShowImagePicker(false);
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
      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => setActiveTab('color')}
          className={`flex-1 py-2 px-4 rounded ${
            activeTab === 'color'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          Color
        </button>
        <button
          onClick={() => setActiveTab('image')}
          className={`flex-1 py-2 px-4 rounded ${
            activeTab === 'image'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          Image
        </button>
      </div>

      {activeTab === 'color' ? (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Background Color
          </label>
          <ColorPicker
            color={element.style?.backgroundColor || '#ffffff'}
            onChange={(color) => updateStyle({ backgroundColor: color })}
          />
        </div>
      ) : (
        <div className="space-y-4">
          {getCurrentBackgroundImage() && (
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Current Background
              </label>
              <div className="relative h-32 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                <img
                  src={getCurrentBackgroundImage()}
                  alt="Background"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => updateStyle({
                    backgroundImage: 'none',
                    backgroundRepeat: 'no-repeat'
                  })}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          )}

          <button
            onClick={() => setShowImagePicker(true)}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <Image size={16} className="mr-2" />
            {getCurrentBackgroundImage() ? 'Change Background Image' : 'Add Background Image'}
          </button>

          {getCurrentBackgroundImage() && (
            <Select
              label="Repeat"
              value={element.style?.backgroundRepeat || 'no-repeat'}
              options={repeatOptions}
              onChange={(value) => updateStyle({ backgroundRepeat: value })}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default BackgroundSection;