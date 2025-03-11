import React, {useRef, useContext} from 'react';
import {X, Copy, Check} from 'lucide-react';
import {ThemeContext} from '../context/ThemeContext';
import {Element, Page} from '../types';

interface ViewSourceModalProps {
    isOpen: boolean;
    onClose: () => void;
    elements: Element[];
    canvasSize: { width: number; height: number };
    pages: Page[];
}

const ViewSourceModal: React.FC<ViewSourceModalProps> = ({
                                                             isOpen,
                                                             onClose,
                                                             elements,
                                                             canvasSize,
                                                             pages, // Accept pages prop
                                                         }) => {
    const [copied, setCopied] = React.useState(false);
    const textAreaRef = useRef<HTMLTextAreaElement>(null); // Hidden textarea for copying
    const {isDark} = useContext(ThemeContext);

    if (!isOpen) return null;

    // Function to generate the HTML for each page
  const generatePageHtml = (page: Page) => {
    const elementsHtml = JSON.parse(page.content).map((element: Element) => {
      const style = `
      width: ${element.width}%;
      height: ${element.height}%;
      ${Object.entries(element.style || {})
          .map(([key, value]) => `${key}: ${value};`)
          .join(' ')}
    `;

      return `<${element.type} style="${style.trim()}">${element.content}</${element.type}>`;
    }).join('\n    ');

    return `
    <div class="page">
      <div class="page-content">
        ${elementsHtml}
      </div>
    </div>`;
  };



  // Function to generate source code for all pages
  const generateSourceCode = () => {
    const pagesHtml = pages.map((page, index) => {
      return `<!-- Page ${index + 1} -->\n${generatePageHtml(page)}`;
    }).join('\n\n'); // Add space between page sections in the code

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>eBook Pages</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 20px;
        background-color: ${isDark ? '#333' : '#f0f0f0'};
      }
      .page {
        width: 816px;
        height: 1056px;
        position: relative;
        background-color: white;
        margin: 20px auto;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        overflow: hidden;
      }
      .page-content {
        padding: 40px; /* Ensure equal padding */
        height: 100%;
        box-sizing: border-box; /* Ensure padding fits within the page */
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr); /* 2-column grid */
        gap: 16px; /* Add gap between grid items */
      }
      img {
        width: 100%;
        height: auto;
      }
    </style>
</head>
<body>
  ${pagesHtml}
</body>
</html>`.trim();
  };


  const sourceCode = generateSourceCode();

    // Copy the source code to clipboard
    const handleCopy = () => {
        if (textAreaRef.current) {
            textAreaRef.current.select();
            document.execCommand('copy');
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div
                className={`bg-white dark:bg-gray-800 rounded-lg w-3/4 max-w-3xl max-h-[80vh] flex flex-col ${isDark ? 'dark' : ''}`}>
                <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">View Source Code</h2>
                    <button onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                        <X size={24}/>
                    </button>
                </div>
                <div className="flex-grow overflow-auto p-4">
          <pre
              className="w-full h-full min-h-[300px] p-2 text-sm font-mono bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 rounded whitespace-pre-wrap">
            <code>{sourceCode}</code>
          </pre>
                    {/* Hidden Textarea for copying */}
                    <textarea
                        ref={textAreaRef}
                        value={sourceCode}
                        readOnly
                        className="absolute opacity-0 pointer-events-none"
                        aria-hidden="true"
                    />
                </div>
                <div className="p-4 border-t dark:border-gray-700 flex justify-end">
                    <button
                        onClick={handleCopy}
                        className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                        {copied ? <Check size={18} className="mr-2"/> : <Copy size={18} className="mr-2"/>}
                        {copied ? 'Source Code Copied!' : 'Copy Source Code'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewSourceModal;
