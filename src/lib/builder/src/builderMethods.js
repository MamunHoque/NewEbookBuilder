// builderMethods.js
import {savePages} from './utils/indexedDB';

/**
 * Adds a new version of elements to history for undo/redo functionality.
 */
export const addToHistory = (newElements, setHistory, historyIndex, setHistoryIndex) => {
    setHistory((prevHistory) => {
        const newHistory = prevHistory.slice(0, historyIndex + 1);
        return [...newHistory, newElements];
    });
    setHistoryIndex((prevIndex) => prevIndex + 1);
};

/**
 * Updates an element's properties and adds the new state to the history.
 */
export const handleUpdateElement = (updatedElement, setElements, setHistory, historyIndex, setHistoryIndex) => {
    setElements((prevElements) => {
        const newElements = prevElements.map((el) =>
            el.id === updatedElement.id ? updatedElement : el
        );
        addToHistory(newElements, setHistory, historyIndex, setHistoryIndex);
        return newElements;
    });
};

/**
 * Adds a new element to the current set of elements and updates the history.
 */
export const handleAddElement = (newElement, setElements, setHistory, historyIndex, setHistoryIndex) => {
    setElements((prevElements) => {
        const newElements = [...prevElements, newElement];
        addToHistory(newElements, setHistory, historyIndex, setHistoryIndex);
        return newElements;
    });
};

/**
 * Deletes an element by its ID and updates the history with the new state.
 */
export const handleDeleteElement = (elementId, setElements, setHistory, historyIndex, setHistoryIndex) => {
    setElements((prevElements) => {
        const newElements = prevElements.filter((el) => el.id !== elementId);
        addToHistory(newElements, setHistory, historyIndex, setHistoryIndex);
        return newElements;
    });
};

/**
 * Updates the canvas size (width and height) based on user input.
 */
export const handlePageSizeChange = (width, height, setCanvasSize) => {
    setCanvasSize({width, height});
};

/**
 * Performs an undo action by reverting to a previous state in the history.
 */
export const handleUndo = (setHistoryIndex, historyIndex, setElements, history) => {
    if (historyIndex > 0) {
        setHistoryIndex((prevIndex) => prevIndex - 1);
        setElements(history[historyIndex - 1]);
    }
};

/**
 * Performs a redo action by moving forward in the history if possible.
 */
export const handleRedo = (setHistoryIndex, historyIndex, setElements, history) => {
    if (historyIndex < history.length - 1) {
        setHistoryIndex((prevIndex) => prevIndex + 1);
        setElements(history[historyIndex + 1]);
    }
};

/**
 * Adds a new page to the document, sets it as the current page, and clears the elements for the new page.
 */
export const handleAddPage = async (pages, setPages, setCurrentPage, setElements) => {
    const newPageNumber = pages.length + 1;
    const newPage = {pageNumber: newPageNumber, content: '[]'};

    const updatedPages = [...pages, newPage];
    setPages(updatedPages);
    await savePages(updatedPages);

    setCurrentPage(newPageNumber);
    setElements([]);
};

/**
 * Duplicates an existing page by its page number, adding a new page with the same content.
 */
export const handleDuplicatePage = (pageNumber, pages, setPages) => {
    const pageToDuplicate = pages.find((page) => page.pageNumber === pageNumber);
    if (pageToDuplicate) {
        setPages((prevPages) => [
            ...prevPages,
            {pageNumber: prevPages.length + 1, content: pageToDuplicate.content},
        ]);
    }
};

/**
 * Deletes a page by its page number, updates all page numbers, and loads the content of the next page if the current page was deleted.
 */
export const handleDeletePage = async (
    pageNumber, pages, setPages, currentPage, setCurrentPage, setElements
) => {
    if (pages.length > 1) {
        const updatedPages = pages
            .filter((page) => page.pageNumber !== pageNumber)
            .map((page, index) => ({...page, pageNumber: index + 1}));

        setPages(updatedPages);
        await savePages(updatedPages);

        if (pageNumber === currentPage) {
            const nextPageIndex = Math.min(pageNumber, updatedPages.length) - 1;
            const newCurrentPage = updatedPages[nextPageIndex];
            setCurrentPage(newCurrentPage.pageNumber);
            const newElements = JSON.parse(newCurrentPage.content);
            setElements(newElements);
        }
    }
};


/**
 * Switches the current page to a different one by saving the current page's content and loading the content of the new page.
 */
export const switchPage = async (
    pageNumber,
    currentPage,
    elements,
    pages,
    setPages,
    setCurrentPage,
    setElements,
    setHistory,
    setHistoryIndex
) => {
    // Save the current page content first
    const updatedPages = pages.map((page) =>
        page.pageNumber === currentPage ? { ...page, content: JSON.stringify(elements) } : page
    );

    // Update the pages state immediately
    setPages(updatedPages);

    // Check if there are any pages left
    if (updatedPages.length === 0) {
        // Handle case when no pages exist anymore
        setCurrentPage(null); // Reset current page
        setElements([]); // Clear elements
        setHistory([]); // Clear history
        setHistoryIndex(-1); // Reset history index
        await savePages(updatedPages); // Save the empty state
        return; // Exit function early since no pages are available
    }

    // Now switch to the new page
    const nextPage = updatedPages.find((page) => page.pageNumber === pageNumber);

    // If the next page doesn't exist, reset or handle error
    if (!nextPage) {
        // If the requested page doesn't exist, handle this case gracefully
        setCurrentPage(null);
        setElements([]); // Clear elements since no page is found
        setHistory([]); // Clear history
        setHistoryIndex(-1); // Reset history index
        await savePages(updatedPages); // Save the state
        return; // Exit early
    }

    // Set elements and history for the new page
    const newElements = JSON.parse(nextPage.content);
    setElements(newElements);
    setHistory([newElements]);
    setHistoryIndex(0);

    // Set the current page after everything else
    setCurrentPage(pageNumber);

    // Save pages to persist the state
    await savePages(updatedPages);
};


/**
 * Sets template content for a page by adding HTML content as a new element and saving the page's updated state.
 */
export const setTemplateContent = async (
    content, setElements, setHistory, historyIndex, setHistoryIndex, currentPage, pages, setPages, savePages
) => {
    try {
        const newElement = {
            id: Date.now().toString(),
            type: 'html', // Adjust this type as needed
            content: content, // Store the HTML content as a string
            left: 0,
            top: 0,
            width: 100,
            height: 100,
            zIndex: 1,
        };

        // Update elements for the current page
        setElements([newElement]);
        addToHistory([newElement], setHistory, historyIndex, setHistoryIndex);

        // Safeguard against pages not being an array
        const currentPages = Array.isArray(pages) ? pages : [];

        // Update the content of the current page in the pages array
        const updatedPages = currentPages.map((page) =>
            page.pageNumber === currentPage ? {...page, content: JSON.stringify([newElement])} : page
        );

        setPages(updatedPages);

        // Save the updated pages to IndexedDB
        await savePages(updatedPages);
        console.log('Page content saved.');
    } catch (error) {
        console.log('Error in setTemplateContent:', error);
    }
};
