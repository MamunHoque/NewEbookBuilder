import React, { useState, useEffect, useCallback, memo } from 'react';
import TopBar from './components/TopBar';
import LeftSideMenu from './components/LeftSideMenu/LeftSideMenu';
import Canvas from './components/Canvas';
import RightSidebar from './components/RightSidebar';
import ViewSourceModal from './components/ViewSourceModal';
import PreviewModal from './components/PreviewModal';
import Loader from './components/Loader';
import { Element, Page } from './types';
import { initDB, savePages, getPages } from './utils/indexedDB';
import './builder.css';
import { ThemeProvider } from './context/ThemeContext';

// @ts-ignore
import {
  addToHistory,
  handleUpdateElement,
  handleDeleteElement,
  handlePageSizeChange,
  handleUndo,
  handleRedo,
  handleAddPage,
  handleDuplicatePage,
  handleDeletePage,
  switchPage,
  setTemplateContent
} from './builderMethods';

const MemoizedLeftSideMenu = memo(LeftSideMenu);
const MemoizedTopBar = memo(TopBar);
const MemoizedCanvas = memo(Canvas);
const MemoizedRightSidebar = memo(RightSidebar);
const MemoizedViewSourceModal = memo(ViewSourceModal);
const MemoizedPreviewModal = memo(PreviewModal);

interface BuilderProps {
  generateSourceCode: () => string
}

const Builder: React.FC<BuilderProps> = ({generateSourceCode}: BuilderProps) => {
  const [pages, setPages] = useState<Page[]>([{ pageNumber: 1, content: '[]' }]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [elements, setElements] = useState<Element[]>([]);
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [isViewSourceModalOpen, setIsViewSourceModalOpen] = useState<boolean>(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState<boolean>(false);
  const [canvasSize, setCanvasSize] = useState<{ width: number; height: number }>({ width: 8.5, height: 11 });
  const [zoom, setZoom] = useState<number>(100);
  const [isDBInitialized, setIsDBInitialized] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [history, setHistory] = useState<Element[][]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [showStylePanel, setShowStylePanel] = useState<boolean>(false);
console.log(pages)
  useEffect(() => {
    const initialize = async () => {
      await initDB();
      setIsDBInitialized(true);
      const storedPages = await getPages();
      if (storedPages.length > 0) {
        setPages(storedPages);
        const initialElements = JSON.parse(storedPages[0].content);
        setElements(initialElements);
        setHistory([initialElements]);
        setHistoryIndex(0);
      }
      setIsLoading(false);
    };
    initialize();
  }, []);

  const updateElement = useCallback(
    (updatedElement: Element) => {
      handleUpdateElement(updatedElement, setElements, setHistory, historyIndex, setHistoryIndex);
      const updatedPages = pages.map(page => 
        page.pageNumber === currentPage 
          ? { ...page, content: JSON.stringify(elements.map(el => el.id === updatedElement.id ? updatedElement : el)) }
          : page
      );
      setPages(updatedPages);
      savePages(updatedPages);
    },
    [historyIndex, setElements, setHistory, setHistoryIndex, pages, currentPage, elements]
  );

  const addElement = useCallback(
    (newElement: Element) => {
      setElements((prevElements) => {
        const newElements = [...prevElements, newElement];
        addToHistory(newElements, setHistory, historyIndex, setHistoryIndex);
        return newElements;
      });

      const updatedPages = pages.map(page => 
        page.pageNumber === currentPage 
          ? { ...page, content: JSON.stringify([...elements, newElement]) }
          : page
      );
      setPages(updatedPages);
      savePages(updatedPages);
    },
    [historyIndex, setElements, setHistory, setHistoryIndex, pages, currentPage, elements]
  );

  const deleteElement = useCallback(
    (elementId: string) => {
      handleDeleteElement(elementId, setElements, setHistory, historyIndex, setHistoryIndex);
      const updatedPages = pages.map(page => 
        page.pageNumber === currentPage 
          ? { ...page, content: JSON.stringify(elements.filter(el => el.id !== elementId)) }
          : page
      );
      setPages(updatedPages);
      savePages(updatedPages);
    },
    [historyIndex, setElements, setHistory, setHistoryIndex, pages, currentPage, elements]
  );

  const handleShowStylePanel = useCallback(() => {
    setShowStylePanel(true);
  }, []);

  const handleHideStylePanel = useCallback(() => {
    setShowStylePanel(false);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <ThemeProvider>
      <div className="flex h-screen">
        <MemoizedLeftSideMenu
          addElement={addElement}
          setTemplateContent={(content) =>
            setTemplateContent(
              content,
              setElements,
              setHistory,
              historyIndex,
              setHistoryIndex,
              currentPage,
              pages,
              setPages,
              savePages
            )
          }
          isCanvasEmpty={elements.length === 0}
          canvasSize={canvasSize}
          showStylePanel={showStylePanel}
          onHideStylePanel={handleHideStylePanel}
          selectedElement={selectedElement}
          updateElement={updateElement}
        />

        <div className="flex flex-col flex-1">
          <MemoizedTopBar
            selectedElement={selectedElement}
            updateElement={updateElement}
            undo={() => handleUndo(setHistoryIndex, historyIndex, setElements, history)}
            redo={() => handleRedo(setHistoryIndex, historyIndex, setElements, history)}
            canUndo={historyIndex > 0}
            canRedo={historyIndex < history.length - 1}
            onPageSizeChange={(width, height) => handlePageSizeChange(width, height, setCanvasSize)}
            canvasSize={canvasSize}
            elements={elements}
            onViewSourceCode={() => setIsViewSourceModalOpen(true)}
            onPreview={() => setIsPreviewModalOpen(true)}
           generateSourceCode={generateSourceCode}/>

          <div className="flex flex-1 overflow-hidden">
            <MemoizedCanvas
              elements={elements}
              updateElement={updateElement}
              deleteElement={deleteElement}
              setSelectedElement={setSelectedElement}
              selectedElement={selectedElement}
              canvasSize={canvasSize}
              zoom={zoom}
              setZoom={setZoom}
              currentPage={currentPage}
              pages={pages}
              setPages={setPages}
              addElement={addElement}
              onShowStylePanel={handleShowStylePanel}
            />

            <MemoizedRightSidebar
              pages={pages}
              currentPage={currentPage}
              setCurrentPage={(pageNumber) =>
                switchPage(
                  pageNumber,
                  currentPage,
                  elements,
                  pages,
                  setPages,
                  setCurrentPage,
                  setElements,
                  setHistory,
                  setHistoryIndex
                )
              }
              addNewPage={() => handleAddPage(pages, setPages, setCurrentPage, setElements)}
              duplicatePage={(pageNumber) => handleDuplicatePage(pageNumber, pages, setPages)}
              deletePage={(pageNumber) =>
                handleDeletePage(pageNumber, pages, setPages, currentPage, setCurrentPage, setElements)
              }
            />
          </div>
        </div>

        <MemoizedViewSourceModal
          isOpen={isViewSourceModalOpen}
          onClose={() => setIsViewSourceModalOpen(false)}
          elements={elements}
          canvasSize={canvasSize}
          pages={pages}
        />

        <MemoizedPreviewModal
          isOpen={isPreviewModalOpen}
          onClose={() => setIsPreviewModalOpen(false)}
          pages={pages}
          currentPage={currentPage}
          canvasSize={canvasSize}
          elements={elements}
        />
      </div>
    </ThemeProvider>
  );
};

export default Builder;