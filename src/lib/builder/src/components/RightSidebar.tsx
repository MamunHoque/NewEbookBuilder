"use client";

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Copy, Trash2 } from 'lucide-react';
import { Page } from '../types';

interface RightSidebarProps {
  pages: Page[];
  currentPage: number;
  setCurrentPage: (pageNumber: number) => void;
  addNewPage: () => void;
  duplicatePage: (pageNumber: number) => void;
  deletePage: (pageNumber: number) => void;
}

const RightSidebar: React.FC<RightSidebarProps> = ({
                                                     pages,
                                                     currentPage,
                                                     setCurrentPage,
                                                     addNewPage,
                                                     duplicatePage,
                                                     deletePage,
                                                   }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
      <div
          className={`h-full bg-white dark:bg-gray-800 transition-all duration-300 border-l border-gray-200 dark:border-gray-700 flex flex-col ${
              isExpanded ? 'w-64' : 'w-10'
          }`}
      >
        <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            title={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isExpanded ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>

        {isExpanded && (
            <>
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200">Pages</h3>
                  <div className="flex space-x-2">
                    <button
                        onClick={addNewPage}
                        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                        title="Add New Page"
                    >
                      <Plus className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    </button>
                    <button
                        onClick={() => duplicatePage(currentPage)}
                        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                        title="Duplicate Current Page"
                    >
                      <Copy className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    </button>
                    <button
                        onClick={() => deletePage(currentPage)}
                        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                        title="Delete Current Page"
                        disabled={pages.length === 1}
                    >
                      <Trash2 className={`w-5 h-5 ${pages.length === 1 ? 'text-gray-400 dark:text-gray-600' : 'text-gray-600 dark:text-gray-300'}`} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                {pages.map((page) => (
                    <button
                        key={page.pageNumber}
                        onClick={() => setCurrentPage(page.pageNumber)}
                        className={`w-full text-left p-2 mb-2 rounded ${
                            currentPage === page.pageNumber
                                ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                                : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200'
                        }`}
                    >
                      Page {page.pageNumber}
                    </button>
                ))}
              </div>
            </>
        )}
      </div>
  );
};

export default RightSidebar;