import React, { useState, useEffect } from 'react';
import { X, Search } from 'lucide-react';
import { Element } from '../../types';
import SubMenuItem from './SubMenuItem';
import ImageComponent from '../Images/ImageComponent';
import IconComponent from '../Icons/IconComponent';

interface Section {
  name: string;
  layout: {
    itemsPerRow: number;
    searchEnabled: boolean;
    accessType: string;
    renderType?: string;
    componentName?: string;
  };
  items: any[];
}

interface SubMenuProps {
  section: Section;
  onClose: () => void;
  addElement: (element: Element) => void;
  setTemplateContent: (content: string) => void;
  isCanvasEmpty: boolean;
  canvasSize: { width: number; height: number };
}

const SubMenu: React.FC<SubMenuProps> = ({
  section,
  onClose,
  addElement,
  setTemplateContent,
  isCanvasEmpty,
  canvasSize
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [filteredItems, setFilteredItems] = useState(section.items);

  useEffect(() => {
    setSelectedType(null);
    setSearchTerm('');
    setFilteredItems(section.items);
  }, [section]);

  useEffect(() => {
    const filtered = section.items.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedType ? item.type === selectedType : true)
    );
    setFilteredItems(filtered);
  }, [section.items, searchTerm, selectedType]);

  // If the section has a renderType of "ReactComponent", render the specified component
  if (section.layout.renderType === 'ReactComponent') {
    switch (section.layout.componentName) {
      case 'ImageComponent':
        return (
          <ImageComponent
            addElement={addElement}
            onClose={onClose}
            itemsPerRow={section.layout.itemsPerRow}
            searchEnabled={section.layout.searchEnabled}
          />
        );
      case 'IconComponent':
        return <IconComponent onClose={onClose} />;
      default:
        return null;
    }
  }

  const uniqueTypes = ['All', ...new Set(section.items.map(item => item.type))];

  const getPaddingClass = () => {
    switch (section.layout.itemsPerRow) {
      case 1:
      case 2:
        return 'p-4';
      case 3:
        return 'p-3';
      case 4:
      case 5:
        return 'p-2';
      default:
        return 'p-4';
    }
  };

  return (
    <div className="w-80 h-full bg-white dark:bg-gray-800 flex flex-col shadow-lg">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h3 className="font-semibold text-gray-800 dark:text-gray-200">{section.name}</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
        >
          <X size={16} className="text-gray-600 dark:text-gray-400" />
        </button>
      </div>
      
      <div className="border-b border-gray-200 dark:border-gray-700 px-4">
        <nav className="flex -mb-px overflow-x-auto">
          {uniqueTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type === 'All' ? null : type)}
              className={`${
                (type === 'All' && !selectedType) || selectedType === type
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-3 border-b-2 font-medium text-sm capitalize`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {section.layout.searchEnabled && (
        <div className="p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 pl-8 border rounded bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
            />
            <Search size={16} className="absolute left-2 top-3 text-gray-400 dark:text-gray-500" />
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        <div className={`grid grid-cols-${section.layout.itemsPerRow} gap-2 ${getPaddingClass()}`}>
          {filteredItems.map((item, index) => (
            <SubMenuItem
              key={index}
              item={item}
              addElement={addElement}
              setTemplateContent={setTemplateContent}
              isCanvasEmpty={isCanvasEmpty}
              canvasSize={canvasSize}
              isTemplate={section.name === 'Templates'}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubMenu;