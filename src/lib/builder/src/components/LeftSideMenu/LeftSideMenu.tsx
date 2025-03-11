import React, { useState } from 'react';
import { FileText, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Element } from '../../types';
import MainMenu from './MainMenu';
import SubMenu from './SubMenu';
import StylePanel from '../StylePanel/StylePanel';
import { menuDataSource } from './menuDataSource';

interface LeftSideMenuProps {
  addElement: (element: Element) => void;
  setTemplateContent: (content: string) => void;
  isCanvasEmpty: boolean;
  canvasSize: { width: number; height: number };
  showStylePanel: boolean;
  onHideStylePanel: () => void;
  selectedElement: Element | null;
  updateElement: (element: Element) => void;
}

const LeftSideMenu: React.FC<LeftSideMenuProps> = ({
  addElement,
  setTemplateContent,
  isCanvasEmpty,
  canvasSize,
  showStylePanel,
  onHideStylePanel,
  selectedElement,
  updateElement,
}) => {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const handleSectionClick = (sectionName: string) => {
    if (showStylePanel) {
      onHideStylePanel();
    }
    setSelectedSection(prevSection => 
      prevSection === sectionName ? null : sectionName
    );
  };

  const handleStylePanelClose = () => {
    onHideStylePanel();
  };

  const handleSubMenuClose = () => {
    setSelectedSection(null);
  };

  return (
    <div className="flex h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="w-16 h-full flex flex-col border-r border-gray-200 dark:border-gray-700">
        <div className="flex justify-center items-center h-14 border-b border-gray-200 dark:border-gray-700">
          <FileText size={32} className="text-blue-500" />
        </div>
        <MainMenu
          sections={menuDataSource.sections}
          selectedSection={selectedSection}
          onSectionClick={handleSectionClick}
        />
        <div className="mt-auto p-2">
          <Link href="/dashboard">
            <button className="w-full flex items-center justify-center p-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
              <ArrowLeft size={20} />
            </button>
          </Link>
        </div>
      </div>
      {showStylePanel && selectedElement ? (
        <StylePanel
          element={selectedElement}
          onUpdate={updateElement}
          onClose={handleStylePanelClose}
        />
      ) : selectedSection ? (
        <SubMenu
          section={menuDataSource.sections.find(s => s.name === selectedSection)!}
          onClose={handleSubMenuClose}
          addElement={addElement}
          setTemplateContent={setTemplateContent}
          isCanvasEmpty={isCanvasEmpty}
          canvasSize={canvasSize}
        />
      ) : null}
    </div>
  );
};

export default LeftSideMenu;