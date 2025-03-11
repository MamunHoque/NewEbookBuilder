import React from 'react';
import { Element } from '../../../types';
import Slider from '../common/Slider';
import ColorPicker from '../common/ColorPicker';
import Select from '../common/Select';

interface SpacingSectionProps {
  element: Element;
  updateStyle: (style: Partial<CSSStyleDeclaration>) => void;
}

const SpacingSection: React.FC<SpacingSectionProps> = ({ element, updateStyle }) => {
  const borderStyles = [
    { value: 'none', label: 'None' },
    { value: 'solid', label: 'Solid' },
    { value: 'dashed', label: 'Dashed' },
    { value: 'dotted', label: 'Dotted' },
    { value: 'double', label: 'Double' }
  ];

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Padding
        </label>
        <div className="grid grid-cols-2 gap-4">
          <Slider
            label="Top"
            min={0}
            max={100}
            step={1}
            value={parseInt(element.style?.paddingTop || '0')}
            onChange={(value) => updateStyle({ paddingTop: `${value}px` })}
            unit="px"
          />
          <Slider
            label="Right"
            min={0}
            max={100}
            step={1}
            value={parseInt(element.style?.paddingRight || '0')}
            onChange={(value) => updateStyle({ paddingRight: `${value}px` })}
            unit="px"
          />
          <Slider
            label="Bottom"
            min={0}
            max={100}
            step={1}
            value={parseInt(element.style?.paddingBottom || '0')}
            onChange={(value) => updateStyle({ paddingBottom: `${value}px` })}
            unit="px"
          />
          <Slider
            label="Left"
            min={0}
            max={100}
            step={1}
            value={parseInt(element.style?.paddingLeft || '0')}
            onChange={(value) => updateStyle({ paddingLeft: `${value}px` })}
            unit="px"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Border
        </label>
        <div className="space-y-4">
          <Select
            label="Style"
            value={element.style?.borderStyle || 'none'}
            options={borderStyles}
            onChange={(value) => updateStyle({ borderStyle: value })}
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Color
            </label>
            <ColorPicker
              color={element.style?.borderColor || '#000000'}
              onChange={(color) => updateStyle({ borderColor: color })}
            />
          </div>

          <Slider
            label="Width"
            min={0}
            max={20}
            step={1}
            value={parseInt(element.style?.borderWidth || '0')}
            onChange={(value) => updateStyle({ borderWidth: `${value}px` })}
            unit="px"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Border Radius
        </label>
        <div className="grid grid-cols-2 gap-4">
          <Slider
            label="Top Left"
            min={0}
            max={50}
            step={1}
            value={parseInt(element.style?.borderTopLeftRadius || '0')}
            onChange={(value) => updateStyle({ borderTopLeftRadius: `${value}px` })}
            unit="px"
          />
          <Slider
            label="Top Right"
            min={0}
            max={50}
            step={1}
            value={parseInt(element.style?.borderTopRightRadius || '0')}
            onChange={(value) => updateStyle({ borderTopRightRadius: `${value}px` })}
            unit="px"
          />
          <Slider
            label="Bottom Left"
            min={0}
            max={50}
            step={1}
            value={parseInt(element.style?.borderBottomLeftRadius || '0')}
            onChange={(value) => updateStyle({ borderBottomLeftRadius: `${value}px` })}
            unit="px"
          />
          <Slider
            label="Bottom Right"
            min={0}
            max={50}
            step={1}
            value={parseInt(element.style?.borderBottomRightRadius || '0')}
            onChange={(value) => updateStyle({ borderBottomRightRadius: `${value}px` })}
            unit="px"
          />
        </div>
      </div>
    </div>
  );
};

export default SpacingSection;