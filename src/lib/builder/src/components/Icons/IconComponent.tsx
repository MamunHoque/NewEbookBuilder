import React, { useState, useCallback, useEffect } from 'react';
import { Search, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Element } from '../../types';
import useIconCache from '../../hooks/useIconCache';

interface IconComponentProps {
  addElement: (element: Element) => void;
  onClose: () => void;
  itemsPerRow?: number;
  searchEnabled?: boolean;
}

interface IconifyIcon {
  prefix: string;
  name: string;
  width: number;
  height: number;
  body: string;
}

const API_ENDPOINTS = [
  'https://api.iconify.design',
  'https://api.simplesvg.com',
  'https://api.unisvg.com'
];

const IconComponent: React.FC<IconComponentProps> = ({
  addElement,
  onClose,
  itemsPerRow = 4,
  searchEnabled = true,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [icons, setIcons] = useState<IconifyIcon[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCollection, setSelectedCollection] = useState('material-symbols');
  const { getCachedData, setCachedData } = useIconCache();

  const PER_PAGE = 32;

  const fetchIcons = useCallback(async () => {
    const cacheKey = `iconify_${selectedCollection}_${searchTerm}_${currentPage}`;
    const cachedData = getCachedData(cacheKey);

    if (cachedData) {
      setIcons(cachedData.icons);
      setTotalPages(Math.ceil(cachedData.total / PER_PAGE));
      return;
    }

    setLoading(true);
    let success = false;
    let currentEndpointIndex = 0;

    while (!success && currentEndpointIndex < API_ENDPOINTS.length) {
      try {
        const baseUrl = API_ENDPOINTS[currentEndpointIndex];
        const response = await fetch(
          `${baseUrl}/collection/${selectedCollection}?query=${searchTerm}&start=${(currentPage - 1) * PER_PAGE}&limit=${PER_PAGE}`
        );
        
        if (!response.ok) throw new Error('API request failed');
        
        const data = await response.json();
        setIcons(data.icons || []);
        setTotalPages(Math.ceil((data.total || 0) / PER_PAGE));
        setCachedData(cacheKey, { icons: data.icons, total: data.total });
        success = true;
      } catch (error) {
        currentEndpointIndex++;
        if (currentEndpointIndex === API_ENDPOINTS.length) {
          console.error('All API endpoints failed:', error);
        }
      }
    }
    setLoading(false);
  }, [selectedCollection, searchTerm, currentPage, getCachedData, setCachedData]);

  useEffect(() => {
    fetchIcons();
  }, [fetchIcons]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCollection, searchTerm]);

  const handleIconClick = (icon: IconifyIcon) => {
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 ${icon.width} ${icon.height}">${icon.body}</svg>`;
    
    const newElement: Element = {
      id: Date.now().toString(),
      type: 'icon',
      content: svgContent,
      left: 10,
      top: 10,
      width: 20,
      height: 20,
      zIndex: 1,
      style: {
        padding: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    };
    
    addElement(newElement);
  };

  const collections = [
    { id: 'material-symbols', name: 'Material Symbols' },
    { id: 'mdi', name: 'Material Design Icons' },
    { id: 'fa', name: 'Font Awesome' },
    { id: 'carbon', name: 'Carbon' },
  ];

  return (
    <div className="w-80 h-full bg-white dark:bg-gray-800 flex flex-col shadow-lg">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h3 className="font-semibold text-gray-800 dark:text-gray-200">Icons</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
        >
          <X size={16} className="text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      {searchEnabled && (
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <input
              type="text"
              placeholder="Search icons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 pl-8 border rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            />
            <Search size={16} className="absolute left-2 top-3 text-gray-400" />
          </div>
        </div>
      )}

      <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 px-4">
        <div className="flex-1 flex justify-between">
          {collections.map((collection) => (
            <button
              key={collection.id}
              onClick={() => setSelectedCollection(collection.id)}
              className={`p-2 text-sm font-medium whitespace-nowrap ${
                selectedCollection === collection.id
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {collection.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className={`grid grid-cols-${itemsPerRow} gap-4 p-4 pb-16`}>
          {loading ? (
            <div className="col-span-full flex justify-center items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            icons.map((icon, index) => (
              <div
                key={`${icon.prefix}:${icon.name}-${index}`}
                className="aspect-square p-2 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                onClick={() => handleIconClick(icon)}
                dangerouslySetInnerHTML={{
                  __html: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 ${icon.width} ${icon.height}">${icon.body}</svg>`
                }}
              />
            ))
          )}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className={`p-1 rounded ${
              currentPage === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <ChevronLeft size={20} />
          </button>
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className={`p-1 rounded ${
              currentPage === totalPages
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default IconComponent;