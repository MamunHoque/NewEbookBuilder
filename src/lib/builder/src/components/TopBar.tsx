import React, { useCallback, useMemo, useContext } from 'react';
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Code, Eye, Download, Undo, Redo } from 'lucide-react';
import PageSizeSetup from './PageSizeSetup';
import { Element } from '../types';
import ThemeToggle from './ThemeToggle';
import { ThemeContext } from '../context/ThemeContext';

interface TopBarProps {
  selectedElement: Element | null;
  updateElement: (updatedElement: Element) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  generateSourceCode: () => string;
  onPageSizeChange: (width: number, height: number) => void;
  canvasSize: { width: number; height: number };
  elements: Element[];
  onViewSourceCode: () => void;
  onPreview: () => void;
}

const TopBar: React.FC<TopBarProps> = ({
  selectedElement,
  updateElement,
  undo,
  redo,
  canUndo,
  canRedo,
  generateSourceCode,
  onPageSizeChange,
  canvasSize,
  elements,
  onViewSourceCode,
  onPreview,
}) => {
  const { isDark } = useContext(ThemeContext);

  const handleStyleChange = useCallback((style: string) => {
    if (selectedElement) {
      updateElement({
        ...selectedElement,
        style: { ...selectedElement.style, [style]: !selectedElement.style?.[style] },
      });
    }
  }, [selectedElement, updateElement]);

  const handleAlignChange = useCallback((align: string) => {
    if (selectedElement) {
      updateElement({
        ...selectedElement,
        style: { ...selectedElement.style, textAlign: align },
      });
    }
  }, [selectedElement, updateElement]);

  const memoizedPageSizeSetup = useMemo(() => (
    <PageSizeSetup onPageSizeChange={onPageSizeChange} />
  ), [onPageSizeChange]);

  const iconClass = isDark ? 'text-gray-300' : 'text-gray-700';
  const buttonClass = `p-1 ${isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'} rounded`;

  return (
    <div className={`flex items-center justify-between py-2 px-4 ${isDark ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'} border-b`}>
      <div className="flex items-center space-x-2">
        {memoizedPageSizeSetup}
      </div>
      <div className="flex items-center space-x-2">
        <button onClick={undo} disabled={!canUndo} className={`${buttonClass} ${!canUndo && 'opacity-50 cursor-not-allowed'}`}><Undo size={18} className={iconClass} /></button>
        <button onClick={redo} disabled={!canRedo} className={`${buttonClass} ${!canRedo && 'opacity-50 cursor-not-allowed'}`}><Redo size={18} className={iconClass} /></button>
        <ThemeToggle />
        <button onClick={onViewSourceCode} className={buttonClass}><Code size={18} className={iconClass} /></button>
        <button onClick={onPreview} className={buttonClass}><Eye size={18} className={iconClass} /></button>
        <button className={buttonClass}><Download size={18} className={iconClass} /></button>
      </div>
    </div>
  );
};

export default React.memo(TopBar);