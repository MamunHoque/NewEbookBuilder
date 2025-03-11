import React from 'react';
import { FileText, Type, Square, Shapes, Image } from 'lucide-react';

interface Section {
  name: string;
  layout: {
    itemsPerRow: number;
    searchEnabled: boolean;
    accessType: string;
  };
  items: any[];
}

interface MainMenuProps {
  sections: Section[];
  selectedSection: string | null;
  onSectionClick: (sectionName: string) => void;
}

const getIconForSection = (sectionName: string) => {
  switch (sectionName.toLowerCase()) {
    case 'templates':
      return FileText;
    case 'elements':
      return Square;
    case 'text':
      return Type;
    case 'shapes and line':
      return Shapes;
    case 'icons':
    case 'images':
      return Image;
    default:
      return FileText;
  }
};

const MainMenu: React.FC<MainMenuProps> = ({ sections, selectedSection, onSectionClick }) => {
  return (
    <div className="flex-1 overflow-y-auto">
      {sections.map((section) => {
        const IconComponent = getIconForSection(section.name);
        return (
          <button
            key={section.name}
            className={`w-full p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
              selectedSection === section.name ? 'bg-gray-200 dark:bg-gray-600' : ''
            }`}
            onClick={() => onSectionClick(section.name)}
          >
            <IconComponent className="mx-auto text-gray-600 dark:text-gray-300" size={24} />
          </button>
        );
      })}
    </div>
  );
};

export default MainMenu;