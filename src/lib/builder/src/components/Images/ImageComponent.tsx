import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Search, Upload, X } from 'lucide-react';
import { Element } from '../../types';
import useImageCache from '../../hooks/useImageCache';

interface ImageComponentProps {
  addElement: (element: Element) => void;
  onClose: () => void;
  itemsPerRow?: number;
  searchEnabled?: boolean;
}

type ImageType = 'all' | 'photo' | 'illustration' | 'vector';

interface PixabayImage {
  id: number;
  previewURL: string;
  largeImageURL: string;
  tags: string;
  user: string;
  previewWidth: number;
  previewHeight: number;
}

const ImageComponent: React.FC<ImageComponentProps> = ({
  addElement,
  onClose,
  itemsPerRow = 3,
  searchEnabled = true,
}) => {
  const [activeTab, setActiveTab] = useState<'suggested' | 'my-images'>('suggested');
  const [imageType, setImageType] = useState<ImageType>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [images, setImages] = useState<PixabayImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { getCachedData, setCachedData } = useImageCache();
  const containerRef = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastImageRef = useRef<HTMLDivElement | null>(null);

  const PER_PAGE = 50;

  const fetchImages = useCallback(async () => {
    if (loading || !hasMore) return;

    const cacheKey = `pixabay_${imageType}_${searchTerm}_${currentPage}`;
    const cachedData = getCachedData(cacheKey);

    if (cachedData) {
      setImages(prev => [...prev, ...cachedData.hits]);
      setHasMore(cachedData.totalHits > currentPage * PER_PAGE);
      return;
    }

    setLoading(true);
    try {
      const encodedSearchTerm = encodeURIComponent(searchTerm);
      const response = await fetch(
        `https://pixabay.com/api/?key=${process.env.NEXT_PUBLIC_PIXABAY_API_KEY}&q=${encodedSearchTerm}&image_type=${imageType}&page=${currentPage}&per_page=${PER_PAGE}`
      );
      const data = await response.json();
      setImages(prev => [...prev, ...data.hits]);
      setHasMore(data.totalHits > currentPage * PER_PAGE);
      setCachedData(cacheKey, data);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  }, [imageType, searchTerm, currentPage, loading, hasMore, getCachedData, setCachedData]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  useEffect(() => {
    setImages([]);
    setCurrentPage(1);
    setHasMore(true);
  }, [imageType, searchTerm]);

  useEffect(() => {
    const options = {
      root: containerRef.current,
      rootMargin: '20px',
      threshold: 0.1,
    };

    observer.current = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !loading) {
        setCurrentPage(prev => prev + 1);
      }
    }, options);

    if (lastImageRef.current) {
      observer.current.observe(lastImageRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [hasMore, loading]);

  const handleImageClick = (image: PixabayImage) => {
    const highResUrl = image.previewURL.replace('_150', '_1280');
    
    const newElement: Element = {
      id: Date.now().toString(),
      type: 'image',
      content: `<img src="${highResUrl}" alt="${image.tags}" style="width: 100%; height: 100%; object-fit: cover;">`,
      left: 10,
      top: 10,
      width: 80,
      height: 60,
      zIndex: 1,
      style: {
        padding: '0',
        overflow: 'hidden',
        borderRadius: '4px',
      },
    };
    
    addElement(newElement);
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${itemsPerRow}, 1fr)`,
    gap: '1rem',
    padding: '1rem',
  };

  const imageTypes: ImageType[] = ['all', 'photo', 'illustration', 'vector'];

  return (
    <div className="w-80 h-full bg-white dark:bg-gray-800 flex flex-col shadow-lg">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h3 className="font-semibold text-gray-800 dark:text-gray-200">Images</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
        >
          <X size={16} className="text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('suggested')}
          className={`flex-1 p-3 text-sm font-medium ${
            activeTab === 'suggested'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Suggested Images
        </button>
        <button
          onClick={() => setActiveTab('my-images')}
          className={`flex-1 p-3 text-sm font-medium ${
            activeTab === 'my-images'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          My Images
        </button>
      </div>

      {searchEnabled && (
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <input
              type="text"
              placeholder="Search images..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 pl-8 border rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            />
            <Search size={16} className="absolute left-2 top-3 text-gray-400" />
          </div>
        </div>
      )}

      {activeTab === 'suggested' && (
        <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 px-4">
          <div className="flex-1 flex justify-between">
            {imageTypes.map((type) => (
              <button
                key={type}
                onClick={() => setImageType(type)}
                className={`p-2 text-sm font-medium capitalize whitespace-nowrap ${
                  imageType === type
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto" ref={containerRef}>
        {activeTab === 'suggested' ? (
          <div style={gridStyle}>
            {images.map((image, index) => (
              <div
                key={`${image.id}-${index}`}
                ref={index === images.length - 1 ? lastImageRef : null}
                className="relative group cursor-pointer"
                onClick={() => handleImageClick(image)}
              >
                <img
                  src={image.previewURL}
                  alt={image.tags}
                  className="w-full h-24 object-cover rounded-lg transition-transform group-hover:scale-105"
                />
              </div>
            ))}
            {loading && (
              <div className="col-span-full flex justify-center items-center p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            )}
          </div>
        ) : (
          <div className="p-4">
            <button className="w-full p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-colors">
              <Upload className="mx-auto mb-2" />
              <span>Upload Image</span>
            </button>
            <div className="mt-4 text-center text-gray-500">
              No images uploaded yet
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageComponent;