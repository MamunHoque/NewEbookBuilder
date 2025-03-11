import React, { useContext } from 'react';
import {X} from 'lucide-react';
import { Element } from '../../types';
import { ThemeContext } from '../../context/ThemeContext';

interface TextMenuProps {
  onClose: () => void;
  addElement: (element: Element) => void;
}

const TextMenu: React.FC<TextMenuProps> = ({ addElement, onClose }) => {

  const { isDark } = useContext(ThemeContext);

  const textElements = [
    { name: 'Heading 1', tag: 'h1' },
    { name: 'Heading 2', tag: 'h2' },
    { name: 'Heading 3', tag: 'h3' },
    { name: 'Heading 4', tag: 'h4' },
    { name: 'Heading 5', tag: 'h5' },
    { name: 'Heading 6', tag: 'h6' },
    { name: 'Paragraph', tag: 'p' },
  ] as const;

  const handleAddTextElement = (tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p') => {
    const newElement: Element = {
      id: Date.now().toString(),
      type: tag,
      content: `New ${tag} element`,
      left: 10,
      top: 10,
      width: 80,
      height: 10,
      zIndex: 1,
    };
    addElement(newElement);
  };

  return (
    <div className={`w-64 ${isDark ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'} border-r border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col`}>
      <div
          className={`p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'} flex justify-between items-center`}>
        <h3 className="font-semibold">Text Elements</h3>
        <button
            onClick={onClose}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
        >
          <X size={16} className="text-gray-600 dark:text-gray-400"/>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {textElements.map((element) => (
              <button
                    key={element.name}
                    className={`w-full py-3 px-4 flex items-center space-x-3 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer text-left p-2 ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded transition-colors`}
                    onClick={() => handleAddTextElement(element.tag)}
                >
                  {element.name}
                </button>

          ))}
        </div>
      </div>
    </div>
  );
};

export default TextMenu;