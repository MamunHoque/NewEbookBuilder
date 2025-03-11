import React from 'react';
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'lucide-react';
import { Element } from '../../../types';
import ColorPicker from '../common/ColorPicker';
import Slider from '../common/Slider';
import Select from '../common/Select';

interface TextStyleSectionProps {
  element: Element;
  updateStyle: (style: Partial<CSSStyleDeclaration>) => void;
}

const TextStyleSection: React.FC<TextStyleSectionProps> = ({ element, updateStyle }) => {
  const fonts = [
    { value: 'Arial, sans-serif', label: 'Arial' },
    { value: 'Times New Roman, serif', label: 'Times New Roman' },
    { value: 'Helvetica, sans-serif', label: 'Helvetica' },
    { value: 'Courier New, monospace', label: 'Courier New' }
  ];

  const fontSizes = Array.from({ length: 20 }, (_, i) => ({
    value: `${(i + 1) * 50}%`,
    label: `${(i + 1) * 50}%`
  }));

  return (
    <div className="space-y-4">
      <Select
        label="Font Family"
        value={element.style?.fontFamily || fonts[0].value}
        options={fonts}
        onChange={(value) => updateStyle({ fontFamily: value })}
      />

      <Select
        label="Font Size"
        value={element.style?.fontSize || '100%'}
        options={fontSizes}
        onChange={(value) => updateStyle({ fontSize: value })}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Text Color
        </label>
        <ColorPicker
          color={element.style?.color || '#000000'}
          onChange={(color) => updateStyle({ color })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Text Alignment
        </label>
        <div className="flex space-x-2">
          {[
            { icon: AlignLeft, value: 'left' },
            { icon: AlignCenter, value: 'center' },
            { icon: AlignRight, value: 'right' },
            { icon: AlignJustify, value: 'justify' }
          ].map(({ icon: Icon, value }) => (
            <button
              key={value}
              onClick={() => updateStyle({ textAlign: value })}
              className={`p-2 rounded ${
                element.style?.textAlign === value
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              <Icon size={16} />
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Text Style
        </label>
        <div className="flex space-x-2">
          {[
            { icon: Bold, style: 'fontWeight', value: 'bold' },
            { icon: Italic, style: 'fontStyle', value: 'italic' },
            { icon: Underline, style: 'textDecoration', value: 'underline' }
          ].map(({ icon: Icon, style, value }) => (
            <button
              key={style}
              onClick={() => updateStyle({ [style]: element.style?.[style] === value ? 'normal' : value })}
              className={`p-2 rounded ${
                element.style?.[style] === value
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              <Icon size={16} />
            </button>
          ))}
        </div>
      </div>

      <Slider
        label="Letter Spacing"
        min={-2}
        max={10}
        step={0.1}
        value={parseFloat(element.style?.letterSpacing || '0')}
        onChange={(value) => updateStyle({ letterSpacing: `${value}px` })}
        unit="px"
      />

      <Slider
        label="Line Height"
        min={1}
        max={3}
        step={0.1}
        value={parseFloat(element.style?.lineHeight || '1.5')}
        onChange={(value) => updateStyle({ lineHeight: value.toString() })}
      />
    </div>
  );
};

export default TextStyleSection;