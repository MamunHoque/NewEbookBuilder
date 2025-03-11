import React, { useState } from 'react';
import { Element } from '../../../types';
import ColorPicker from '../common/ColorPicker';
import Slider from '../common/Slider';

interface ShadowSectionProps {
  element: Element;
  updateStyle: (style: Partial<CSSStyleDeclaration>) => void;
}

const ShadowSection: React.FC<ShadowSectionProps> = ({ element, updateStyle }) => {
  const [activeTab, setActiveTab] = useState<'box' | 'text'>('box');
  const [shadowType, setShadowType] = useState<'outer' | 'inner'>('outer');

  const updateShadow = (values: { x: number; y: number; blur: number; spread: number; color: string }) => {
    const { x, y, blur, spread, color } = values;
    const shadowValue = shadowType === 'inner' 
      ? `inset ${x}px ${y}px ${blur}px ${spread}px ${color}`
      : `${x}px ${y}px ${blur}px ${spread}px ${color}`;
    
    if (activeTab === 'box') {
      updateStyle({ boxShadow: shadowValue });
    } else {
      updateStyle({ textShadow: `${x}px ${y}px ${blur}px ${color}` });
    }
  };

  const getCurrentShadowValues = () => {
    const defaultValues = { x: 0, y: 0, blur: 0, spread: 0, color: '#000000' };
    const shadow = activeTab === 'box' 
      ? element.style?.boxShadow 
      : element.style?.textShadow;

    if (!shadow) return defaultValues;

    const parts = shadow.split(' ');
    return {
      x: parseInt(parts[0]) || 0,
      y: parseInt(parts[1]) || 0,
      blur: parseInt(parts[2]) || 0,
      spread: activeTab === 'box' ? (parseInt(parts[3]) || 0) : 0,
      color: parts[parts.length - 1] || '#000000'
    };
  };

  const values = getCurrentShadowValues();

  return (
    <div className="space-y-4">
      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => setActiveTab('box')}
          className={`flex-1 py-2 px-4 rounded ${
            activeTab === 'box'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          Box Shadow
        </button>
        <button
          onClick={() => setActiveTab('text')}
          className={`flex-1 py-2 px-4 rounded ${
            activeTab === 'text'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          Text Shadow
        </button>
      </div>

      {activeTab === 'box' && (
        <div className="flex space-x-2 mb-4">
          <button
            onClick={() => setShadowType('outer')}
            className={`flex-1 py-2 px-4 rounded ${
              shadowType === 'outer'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Outer Shadow
          </button>
          <button
            onClick={() => setShadowType('inner')}
            className={`flex-1 py-2 px-4 rounded ${
              shadowType === 'inner'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Inner Shadow
          </button>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Shadow Color
        </label>
        <ColorPicker
          color={values.color}
          onChange={(color) => updateShadow({ ...values, color })}
        />
      </div>

      <Slider
        label="Offset X"
        min={-50}
        max={50}
        step={1}
        value={values.x}
        onChange={(x) => updateShadow({ ...values, x })}
        unit="px"
      />

      <Slider
        label="Offset Y"
        min={-50}
        max={50}
        step={1}
        value={values.y}
        onChange={(y) => updateShadow({ ...values, y })}
        unit="px"
      />

      <Slider
        label="Blur"
        min={0}
        max={100}
        step={1}
        value={values.blur}
        onChange={(blur) => updateShadow({ ...values, blur })}
        unit="px"
      />

      {activeTab === 'box' && (
        <Slider
          label="Spread"
          min={-50}
          max={50}
          step={1}
          value={values.spread}
          onChange={(spread) => updateShadow({ ...values, spread })}
          unit="px"
        />
      )}
    </div>
  );
};

export default ShadowSection;