import React, { useState } from 'react';
import { X, Type, PaintBucket, Move, Layers } from 'lucide-react';
import { Element } from '../types';

interface StylePanelProps {
  element: Element;
  onUpdate: (element: Element) => void;
  onClose: () => void;
}

const StylePanel: React.FC<StylePanelProps> = ({ element, onUpdate, onClose }) => {
  const [activeTab, setActiveTab] = useState('text');
  console.log(element, 'hello')
  const updateStyle = (property: string, value: string | number) => {
    onUpdate({
      ...element,
      style: {
        ...element.style,
        [property]: value,
      },
    });
  };

  const tabs = [
    { id: 'text', icon: Type, label: 'Text' },
    { id: 'background', icon: PaintBucket, label: 'Background' },
    { id: 'position', icon: Move, label: 'Position' },
    { id: 'layer', icon: Layers, label: 'Layer' },
  ];

  return (
    <div className="w-80 h-full bg-white dark:bg-gray-800 flex flex-col shadow-lg">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h3 className="font-semibold text-gray-800 dark:text-gray-200">Style Properties</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
        >
          <X size={16} className="text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      <div className="flex border-b border-gray-200 dark:border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 p-3 text-sm font-medium ${
              activeTab === tab.id
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <tab.icon size={16} className="mx-auto mb-1" />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'text' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Font Size
              </label>
              <input
                type="number"
                value={parseInt((element.style?.fontSize as string) || '16')}
                onChange={(e) => updateStyle('fontSize', `${e.target.value}px`)}
                className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Color
              </label>
              <input
                type="color"
                value={element.style?.color || '#000000'}
                onChange={(e) => updateStyle('color', e.target.value)}
                className="w-full p-1 h-10 border rounded bg-white dark:bg-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Text Align
              </label>
              <select
                value={element.style?.textAlign || 'left'}
                onChange={(e) => updateStyle('textAlign', e.target.value)}
                className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
                <option value="justify">Justify</option>
              </select>
            </div>
          </div>
        )}

        {activeTab === 'background' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Background Color
              </label>
              <input
                type="color"
                value={element.style?.backgroundColor || '#ffffff'}
                onChange={(e) => updateStyle('backgroundColor', e.target.value)}
                className="w-full p-1 h-10 border rounded bg-white dark:bg-gray-700"
              />
            </div>
          </div>
        )}

        {activeTab === 'position' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Left Position (%)
              </label>
              <input
                type="number"
                value={element.left}
                onChange={(e) => onUpdate({ ...element, left: Number(e.target.value) })}
                className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Top Position (%)
              </label>
              <input
                type="number"
                value={element.top}
                onChange={(e) => onUpdate({ ...element, top: Number(e.target.value) })}
                className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
        )}

        {activeTab === 'layer' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Z-Index
              </label>
              <input
                type="number"
                value={element.zIndex}
                onChange={(e) => onUpdate({ ...element, zIndex: Number(e.target.value) })}
                className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StylePanel;