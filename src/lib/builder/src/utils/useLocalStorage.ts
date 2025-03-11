import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    // Initialize from localStorage if key exists
    if (typeof window !== 'undefined') {
      try {
        const item = window.localStorage.getItem(key);
        return item !== null && item !== 'undefined' ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.error(`Error reading localStorage key: ${key}`, error);
        return initialValue;
      }
    }
    return initialValue;
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error(`Error setting localStorage key: ${key}`, error);
    }
  };

  useEffect(() => {
    // Only runs to synchronize the localStorage with storedValue change
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      } catch (error) {
        console.error(`Error updating localStorage key: ${key}`, error);
      }
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
}
