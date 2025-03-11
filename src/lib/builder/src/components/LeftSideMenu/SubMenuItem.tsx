import React, { useState } from 'react';
import { Element } from '../../types';
import { Crown } from 'lucide-react';
import { Icon } from '@iconify/react';
import ConfirmationModal from '../ConfirmationModal';

interface SubMenuItemProps {
  item: {
    icon: string;
    name: string;
    type: string;
    content: string;
    imageUrl?: string;
    planType: string;
    canvasAction: 'replace' | 'append';
  };
  addElement: (element: Element) => void;
  setTemplateContent: (content: string) => void;
  isCanvasEmpty: boolean;
  canvasSize: { width: number; height: number };
  isTemplate: boolean;
}

const SubMenuItem: React.FC<SubMenuItemProps> = ({
  item,
  addElement,
  setTemplateContent,
  isCanvasEmpty,
  canvasSize,
  isTemplate
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleItemClick = () => {
    if (isTemplate && item.canvasAction === 'replace' && !isCanvasEmpty) {
      setIsModalOpen(true);
    } else {
      addItemToCanvas();
    }
  };

 const addItemToCanvas = () => {
    if (isTemplate) {
      setTemplateContent(item.content);
    } else {
      const newElement: Element = {
        id: Date.now().toString(),
        type: item.type,
        content: item.content,
        left: 25, // Center horizontally
        top: 25, // Center vertically
        width: Math.min(50, getMinWidth(item.type)), // 50% of canvas width, but not smaller than minimum
        height: Math.min(50, getMinHeight(item.type)), // 50% of canvas height, but not smaller than minimum
        zIndex: 1,
      };
      addElement(newElement);
    }
  };

   const getMinWidth = (type: string): number => {
    switch (type) {
      case 'heading':
        return 30;
      case 'text':
        return 25;
      case 'shape':
        return 10;
      case 'line':
        return 20;
      case 'interactive':
        return 40;
      default:
        return 20;
    }
  };

  const getMinHeight = (type: string): number => {
    switch (type) {
      case 'heading':
        return 10;
      case 'text':
        return 20;
      case 'shape':
        return 10;
      case 'line':
        return 5;
      case 'interactive':
        return 30;
      default:
        return 15;
    }
  };
  return (
    <>
      <div
        className={`cursor-pointer p-2 rounded-lg transition-colors relative flex flex-col items-center justify-center shadow-md hover:shadow-lg ${
          isTemplate
            ? 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
            : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
        }`}
        onClick={handleItemClick}
      >
        {item.planType === 'Premium' && (
          <Crown size={16} className="absolute top-1 right-1 text-yellow-500" />
        )}
        {isTemplate && item.imageUrl ? (
          <img src={item.imageUrl} alt={item.name} className="w-full h-24 object-cover rounded-md mb-2" />
        ) : (
          <div className="w-12 h-12 flex items-center justify-center bg-white dark:bg-gray-800 rounded-full mb-2">
            <Icon icon={item.icon} className="text-gray-600 dark:text-gray-300" width="24" height="24" />
          </div>
        )}
        <span className="text-xs font-medium text-gray-800 dark:text-gray-200 text-center">{item.name}</span>
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          addItemToCanvas();
          setIsModalOpen(false);
        }}
        onCancel={() => setIsModalOpen(false)}
        message="This will replace your current content. Are you sure you want to continue?"
        confirmText="Confirm"
        cancelText="Cancel"
      />
    </>
  );
};

export default SubMenuItem;