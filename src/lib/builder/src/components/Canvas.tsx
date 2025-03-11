import React, { useRef, useEffect, useState } from 'react';
import CanvasElement from './CanvasElement';
import ZoomToolbar from './ZoomToolbar';
import { Element, Page } from '../types';
import ConfirmationModal from './ConfirmationModal';
import detectSource from '../utils/detectSource';
import cleanContent from '../utils/cleanContent';

interface CanvasProps {
  elements: Element[];
  updateElement: (updatedElement: Element) => void;
  deleteElement: (elementId: string) => void;
  setSelectedElement: (element: Element | null) => void;
  selectedElement: Element | null;
  canvasSize: { width: number; height: number };
  zoom: number;
  setZoom: (zoom: number) => void;
  currentPage: number;
  pages: Page[];
  setPages: React.Dispatch<React.SetStateAction<Page[]>>;
  addElement: (element: Element) => void;
  onShowStylePanel: () => void;
}

const Canvas: React.FC<CanvasProps> = ({
  elements,
  updateElement,
  deleteElement,
  setSelectedElement,
  selectedElement,
  canvasSize,
  zoom,
  setZoom,
  currentPage,
  pages,
  setPages,
  addElement,
  onShowStylePanel,
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [needsScroll, setNeedsScroll] = useState(false);
  const [showPasteModal, setShowPasteModal] = useState(false);
  const [pastedContent, setPastedContent] = useState('');
  const [contentSource, setContentSource] = useState<'microsoft_office' | 'google_docs' | 'excel' | 'unknown'>('unknown');
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      e.preventDefault();
      const text = e.clipboardData?.getData('text/html') || e.clipboardData?.getData('text');
      if (text) {
        setPastedContent(text);
        setContentSource(detectSource(text));
        setShowPasteModal(true);
      }
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const elementContainer = target.closest('.canvas-element');
      
      if (elementContainer) {
        const elementId = elementContainer.getAttribute('data-element-id');
        const element = elements.find(el => el.id === elementId);
        if (element) {
          setSelectedElement(element);
          onShowStylePanel();
        }
      } else if (target === canvasRef.current) {
        setSelectedElement(null);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const elementContainer = target.closest('.canvas-element');
      if (elementContainer) {
        const elementId = elementContainer.getAttribute('data-element-id');
        setHoveredElement(elementId);
      } else {
        setHoveredElement(null);
      }
    };

    const handleMouseOut = () => {
      setHoveredElement(null);
    };

    const canvasElement = canvasRef.current;
    if (canvasElement) {
      canvasElement.addEventListener('paste', handlePaste);
      canvasElement.addEventListener('click', handleClick);
      canvasElement.addEventListener('mouseover', handleMouseOver);
      canvasElement.addEventListener('mouseout', handleMouseOut);
    }

    return () => {
      if (canvasElement) {
        canvasElement.removeEventListener('paste', handlePaste);
        canvasElement.removeEventListener('click', handleClick);
        canvasElement.removeEventListener('mouseover', handleMouseOver);
        canvasElement.removeEventListener('mouseout', handleMouseOut);
      }
    };
  }, [elements, setSelectedElement, onShowStylePanel]);

  const handlePasteConfirm = (keepFormatting: boolean) => {
    const cleanedContent = cleanContent(pastedContent, contentSource, keepFormatting);
    const newElement: Element = {
      id: Date.now().toString(),
      type: 'div',
      content: cleanedContent,
      left: 0,
      top: 0,
      width: 100,
      height: 100,
      zIndex: elements.length + 1,
      style: {
        overflow: 'auto',
        padding: '20px',
        boxSizing: 'border-box',
      },
    };
    addElement(newElement);
    setShowPasteModal(false);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === canvasRef.current) {
      setSelectedElement(null);
    }
  };

  const canvasStyle: React.CSSProperties = {
    width: `${canvasSize.width * 96}px`,
    height: `${canvasSize.height * 96}px`,
    backgroundColor: 'white',
    color: 'black',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    transform: `scale(${zoom / 100})`,
    transformOrigin: 'top left',
    transition: 'transform 0.3s ease',
    padding: '40px',
    boxSizing: 'border-box',
    position: 'relative',
    overflow: 'hidden',
  };

  const containerStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    overflow: 'auto',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '20px 0',
    position: 'relative',
  };

  return (
    <div className="flex-1 bg-gray-100 dark:bg-gray-900 overflow-hidden">
      <div style={containerStyle} className="canvas-container">
        <style>
          {`
            .canvas-container::-webkit-scrollbar {
              display: none;
            }
            .canvas-element {
              transition: outline 0.2s ease;
            }
            .canvas-element:hover {
              outline: 2px solid #3b82f6;
            }
            .canvas-element.selected {
              outline: 2px solid #2563eb;
            }
          `}
        </style>
        <div
          ref={canvasRef}
          className="canvas relative"
          onClick={handleCanvasClick}
          style={canvasStyle}
        >
          {elements.map((element) => (
            <CanvasElement
              key={element.id}
              element={element}
              isSelected={selectedElement?.id === element.id}
              onSelect={() => {
                setSelectedElement(element);
                onShowStylePanel();
              }}
              onUpdate={updateElement}
              onDelete={deleteElement}
              canvasSize={canvasSize}
              zoom={zoom}
              currentPage={currentPage}
              pages={pages}
              setPages={setPages}
              isHovered={hoveredElement === element.id}
            />
          ))}
        </div>
      </div>
      <ZoomToolbar
        zoom={zoom}
        onZoom={setZoom}
        onPageNext={() => {}}
        onPagePrevious={() => {}}
      />
      <ConfirmationModal
        isOpen={showPasteModal}
        onClose={() => setShowPasteModal(false)}
        onConfirm={() => handlePasteConfirm(true)}
        onCancel={() => handlePasteConfirm(false)}
        message="How would you like to paste the content?"
        confirmText="Keep Formatting"
        cancelText="Remove Formatting"
      />
    </div>
  );
};

export default Canvas;