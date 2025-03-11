import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Trash2 } from 'lucide-react';
import { Element, Page } from '../types';
import { savePages } from '../utils/indexedDB';

interface CanvasElementProps {
  element: Element;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (updatedElement: Element) => void;
  onDelete: (elementId: string) => void;
  canvasSize: { width: number; height: number };
  zoom: number;
  currentPage: number;
  pages: Page[];
  setPages: React.Dispatch<React.SetStateAction<Page[]>>;
  isHovered: boolean;
}

const CanvasElement: React.FC<CanvasElementProps> = ({
  element,
  isSelected,
  onSelect,
  onUpdate,
  onDelete,
  canvasSize,
  zoom,
  currentPage,
  pages,
  setPages,
  isHovered,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const contentEditableRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isResizing, setIsResizing] = useState(false);
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0 });
  const [selectionState, setSelectionState] = useState<{ start: number; end: number } | null>(null);

  const saveSelection = useCallback(() => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0 && contentEditableRef.current) {
      const range = selection.getRangeAt(0);
      const preSelectionRange = range.cloneRange();
      preSelectionRange.selectNodeContents(contentEditableRef.current);
      preSelectionRange.setEnd(range.startContainer, range.startOffset);
      const start = preSelectionRange.toString().length;

      return {
        start,
        end: start + range.toString().length
      };
    }
    return null;
  }, []);

  const restoreSelection = useCallback((savedSelection: { start: number; end: number } | null) => {
    if (savedSelection && contentEditableRef.current) {
      const range = document.createRange();
      let charIndex = 0;
      const nodeStack = [contentEditableRef.current];
      let node: Node | null;
      let foundStart = false;
      let foundEnd = false;

      while (!foundEnd && (node = nodeStack.pop())) {
        if (node.nodeType === Node.TEXT_NODE) {
          const nextCharIndex = charIndex + node.textContent!.length;
          if (!foundStart && savedSelection.start >= charIndex && savedSelection.start <= nextCharIndex) {
            range.setStart(node, savedSelection.start - charIndex);
            foundStart = true;
          }
          if (foundStart && savedSelection.end >= charIndex && savedSelection.end <= nextCharIndex) {
            range.setEnd(node, savedSelection.end - charIndex);
            foundEnd = true;
          }
          charIndex = nextCharIndex;
        } else {
          let i = node.childNodes.length;
          while (i--) {
            nodeStack.push(node.childNodes[i]);
          }
        }
      }

      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }, []);

  const handleChange = useCallback(() => {
    const newContent = contentEditableRef.current?.innerHTML || '';
    const updatedElement = { ...element, content: newContent };
    onUpdate(updatedElement);
    
    const updatedPages = pages.map(page => 
      page.pageNumber === currentPage 
        ? { ...page, content: JSON.stringify(JSON.parse(page.content).map((el: Element) => 
            el.id === element.id ? updatedElement : el
          ))}
        : page
    );
    setPages(updatedPages);
    savePages(updatedPages);

    setSelectionState(saveSelection());
  }, [element, onUpdate, pages, currentPage, setPages, saveSelection]);

  useEffect(() => {
    if (isEditing) {
      restoreSelection(selectionState);
    }
  }, [isEditing, selectionState, restoreSelection]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isEditing) return;
    e.stopPropagation();
    onSelect();
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging && !isResizing) return;

    if (isDragging) {
      const dx = (e.clientX - dragStart.x) / zoom;
      const dy = (e.clientY - dragStart.y) / zoom;

      const newLeft = element.left + (dx / canvasSize.width) * 100;
      const newTop = element.top + (dy / canvasSize.height) * 100;

      onUpdate({
        ...element,
        left: Math.max(0, Math.min(newLeft, 100 - element.width)),
        top: Math.max(0, Math.min(newTop, 100 - element.height)),
      });

      setDragStart({ x: e.clientX, y: e.clientY });
    }

    if (isResizing) {
      const dx = (e.clientX - resizeStart.x) / zoom;
      const dy = (e.clientY - resizeStart.y) / zoom;

      const newWidth = element.width + (dx / canvasSize.width) * 100;
      const newHeight = element.height + (dy / canvasSize.height) * 100;

      onUpdate({
        ...element,
        width: Math.max(5, Math.min(newWidth, 100 - element.left)),
        height: Math.max(5, Math.min(newHeight, 100 - element.top)),
      });

      setResizeStart({ x: e.clientX, y: e.clientY });
    }
  }, [isDragging, isResizing, dragStart, resizeStart, zoom, element, onUpdate, canvasSize]);

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  useEffect(() => {
    if (isDragging || isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, handleMouseMove]);

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    setSelectionState(null);
  };

  const handleDelete = () => {
    onDelete(element.id);
  };

  const handleResizeStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeStart({ x: e.clientX, y: e.clientY });
  };

  const style: React.CSSProperties = {
    position: 'absolute',
    left: `${element.left}%`,
    top: `${element.top}%`,
    width: `${element.width}%`,
    height: `${element.height}%`,
    zIndex: element.zIndex,
    cursor: isDragging ? 'move' : 'default',
    padding: '5px',
    boxSizing: 'border-box',
    color: 'black',
    ...element.style,
  };

  const resizeHandleStyle: React.CSSProperties = {
    position: 'absolute',
    width: '10px',
    height: '10px',
    background: '#3b82f6',
    right: '-5px',
    bottom: '-5px',
    cursor: 'se-resize',
  };

  return (
    <div
      ref={elementRef}
      style={style}
      className={`canvas-element ${isSelected ? 'selected' : ''} ${isHovered ? 'hovered' : ''}`}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
      data-element-id={element.id}
    >
      {(isSelected || isHovered) && !isEditing && (
        <>
          <button
            onClick={handleDelete}
            className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            title="Delete element"
          >
            <Trash2 size={14} />
          </button>
          <div
            style={resizeHandleStyle}
            onMouseDown={handleResizeStart}
          />
        </>
      )}

      <div
        ref={contentEditableRef}
        contentEditable={isEditing}
        onBlur={handleBlur}
        onInput={handleChange}
        dangerouslySetInnerHTML={{ __html: element.content }}
        style={{
          width: '100%',
          height: '100%',
          overflow: 'auto',
          cursor: isEditing ? 'text' : 'inherit',
          userSelect: 'text',
          pointerEvents: isEditing ? 'auto' : 'none',
          textAlign: 'left',
          direction: 'ltr',
          unicodeBidi: 'normal',
        }}
      />
    </div>
  );
};

export default React.memo(CanvasElement);