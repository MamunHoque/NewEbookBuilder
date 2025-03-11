import { Page } from '../types';

// Function to save pages to local storage
export const savePagesToLocalStorage = (pages: Page[]) => {
  localStorage.setItem('ebook-pages', JSON.stringify(pages));
};

// Function to load pages from local storage
export const loadPagesFromLocalStorage = (): Page[] => {
  const storedPages = localStorage.getItem('ebook-pages');
  return storedPages ? JSON.parse(storedPages) : [{ pageNumber: 1, content: '' }];
};

// Function to update a specific page's content
export const updatePageContent = (pages: Page[], pageNumber: number, content: string): Page[] => {
  return pages.map(page =>
    page.pageNumber === pageNumber ? { ...page, content } : page
  );
};

// Function to add a new page
export const addNewPage = (pages: Page[]): Page[] => {
  const newPageNumber = pages.length + 1;
  return [...pages, { pageNumber: newPageNumber, content: '' }];
};

// Function to duplicate a page
export const duplicatePage = (pages: Page[], pageNumber: number): Page[] => {
  const pageToDuplicate = pages.find(page => page.pageNumber === pageNumber);
  if (!pageToDuplicate) return pages;

  const newPageNumber = pages.length + 1;
  return [...pages, { pageNumber: newPageNumber, content: pageToDuplicate.content }];
};

// Function to delete a page
export const deletePage = (pages: Page[], pageNumber: number): Page[] => {
  if (pages.length === 1) return pages; // Don't delete the last page
  return pages.filter(page => page.pageNumber !== pageNumber)
    .map((page, index) => ({ ...page, pageNumber: index + 1 }));
};

// Function to generate JSON representation of pages
export const generatePagesJSON = (pages: Page[]): string => {
  return JSON.stringify(pages, null, 2);
};