import React from 'react';
import { Sun, Moon, Laptop } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { mode, setMode } = useTheme();

  return (
    <div className="flex items-center space-x-2 bg-gray-200 dark:bg-gray-700 p-1 rounded-full">
      <button
        onClick={() => setMode('light')}
        className={`p-1 rounded-full ${mode === 'light' ? 'bg-white text-black' : 'text-gray-500 dark:text-gray-400'}`}
        aria-label="Light mode"
      >
        <Sun size={16} />
      </button>
      <button
        onClick={() => setMode('system')}
        className={`p-1 rounded-full ${mode === 'system' ? 'bg-white text-black' : 'text-gray-500 dark:text-gray-400'}`}
        aria-label="System mode"
      >
        <Laptop size={16} />
      </button>
      <button
        onClick={() => setMode('dark')}
        className={`p-1 rounded-full ${mode === 'dark' ? 'bg-gray-800 text-white' : 'text-gray-500 dark:text-gray-400'}`}
        aria-label="Dark mode"
      >
        <Moon size={16} />
      </button>
    </div>
  );
};

export default ThemeToggle;