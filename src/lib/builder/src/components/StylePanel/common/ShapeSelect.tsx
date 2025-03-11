import React from 'react';

interface ShapeSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const ShapeSelect: React.FC<ShapeSelectProps> = ({ value, onChange }) => {
  const shapes = [
    { value: 'default', label: 'Default' },
    { value: 'rounded', label: 'Rounded' },
    { value: 'circle', label: 'Circle' },
    { value: 'thumbnail', label: 'Thumbnail' }
  ];

  return (
    <div className="grid grid-cols-4 gap-2">
      {shapes.map((shape) => (
        <button
          key={shape.value}
          onClick={() => onChange(shape.value)}
          className={`p-2 text-sm rounded ${
            value === shape.value
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          {shape.label}
        </button>
      ))}
    </div>
  );
};

export default ShapeSelect;