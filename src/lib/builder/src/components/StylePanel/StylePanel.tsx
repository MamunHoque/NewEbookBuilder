import React, { useState, useCallback } from 'react';
import { ChevronDown, ChevronRight, Image, Type, Layout, Box, Layers, Palette } from 'lucide-react';
import { Element } from '../../types';
import ImageSection from './sections/ImageSection';
import TextStyleSection from './sections/TextStyleSection';
import BackgroundSection from './sections/BackgroundSection';
import PositioningSection from './sections/PositioningSection';
import SpacingSection from './sections/SpacingSection';
import ShadowSection from './sections/ShadowSection';

interface StylePanelProps {
  element: Element;
  onUpdate: (element: Element) => void;
  onClose: () => void;
}

interface Section {
  id: string;
  title: string;
  icon: React.FC<{ size?: number; className?: string }>;
  component: React.FC<{ element: Element; updateStyle: (style: Partial<CSSStyleDeclaration>) => void }>;
  visibleFor?: string[];
}

const StylePanel: React.FC<StylePanelProps> = ({ element, onUpdate, onClose }) => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['textStyle']);

  const updateStyle = useCallback((updates: Partial<CSSStyleDeclaration>) => {
    const updatedStyle = {
      ...element.style,
      ...updates
    };

    // Remove any undefined or null values
    Object.keys(updatedStyle).forEach(key => {
      if (updatedStyle[key] === undefined || updatedStyle[key] === null) {
        delete updatedStyle[key];
      }
    });

    onUpdate({
      ...element,
      style: updatedStyle
    });
  }, [element, onUpdate]);

  const sections: Section[] = [
    {
      id: 'image',
      title: 'Image',
      icon: Image,
      component: ImageSection,
      visibleFor: ['image', 'icon']
    },
    {
      id: 'textStyle',
      title: 'Text Style',
      icon: Type,
      component: TextStyleSection,
      visibleFor: ['text', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'div']
    },
    {
      id: 'background',
      title: 'Background',
      icon: Palette,
      component: BackgroundSection
    },
    {
      id: 'positioning',
      title: 'Layer Position',
      icon: Layers,
      component: PositioningSection
    },
    {
      id: 'spacing',
      title: 'Spacing & Border',
      icon: Layout,
      component: SpacingSection
    },
    {
      id: 'shadow',
      title: 'Shadow',
      icon: Box,
      component: ShadowSection
    }
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  return (
    <div className="w-80 h-full bg-white dark:bg-gray-800 flex flex-col shadow-lg">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h3 className="font-semibold text-gray-800 dark:text-gray-200">Style Properties</h3>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
        >
          <ChevronRight size={20} className="text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {sections.map(section => {
          if (section.visibleFor && !section.visibleFor.includes(element.type)) {
            return null;
          }

          const isExpanded = expandedSections.includes(section.id);
          const SectionIcon = section.icon;
          const SectionComponent = section.component;

          return (
            <div key={section.id} className="border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <SectionIcon size={18} className="text-gray-600 dark:text-gray-400" />
                  <span className="font-medium text-gray-800 dark:text-gray-200">{section.title}</span>
                </div>
                {isExpanded ? (
                  <ChevronDown size={18} className="text-gray-600 dark:text-gray-400" />
                ) : (
                  <ChevronRight size={18} className="text-gray-600 dark:text-gray-400" />
                )}
              </button>
              {isExpanded && (
                <div className="p-4 bg-gray-50 dark:bg-gray-900">
                  <SectionComponent
                    element={element}
                    updateStyle={updateStyle}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StylePanel;