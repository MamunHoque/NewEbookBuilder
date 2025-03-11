import React, { useState, useCallback } from 'react';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange }) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleColorChange = useCallback((newColor: string) => {
    // Validate hex color
    if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(newColor)) {
      onChange(newColor);
    }
  }, [onChange]);

  return (
    <div className="relative">
      <div className="flex space-x-2">
        <div
          className="w-10 h-10 rounded border border-gray-300 dark:border-gray-600 cursor-pointer"
          style={{ backgroundColor: color }}
          onClick={() => setShowPicker(!showPicker)}
        />
        <input
          type="text"
          value={color}
          onChange={(e) => handleColorChange(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
          title="Please enter a valid hex color code"
        />
      </div>
      {showPicker && (
        <div className="absolute z-10 mt-2">
          <div 
            className="fixed inset-0" 
            onClick={() => setShowPicker(false)} 
          />
          <div className="absolute">
            <input
              type="color"
              value={color}
              onChange={(e) => handleColorChange(e.target.value)}
              className="w-56 h-40"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(ColorPicker);