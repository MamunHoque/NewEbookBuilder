import { useState, useCallback } from 'react';

interface CacheItem {
  data: any;
  timestamp: number;
}

const CACHE_DURATION = 12 * 60 * 60 * 1000; // 12 hours in milliseconds

const useImageCache = () => {
  const [cache] = useState<{ [key: string]: CacheItem }>({});

  const getCachedData = useCallback((key: string) => {
    const item = cache[key];
    if (!item) return null;

    const now = Date.now();
    if (now - item.timestamp > CACHE_DURATION) {
      delete cache[key];
      return null;
    }

    return item.data;
  }, [cache]);

  const setCachedData = useCallback((key: string, data: any) => {
    cache[key] = {
      data,
      timestamp: Date.now(),
    };
  }, [cache]);

  return { getCachedData, setCachedData };
};

export default useImageCache;