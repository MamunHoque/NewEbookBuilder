import React from 'react';
import { Book } from 'lucide-react';

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900 z-50">
      <div className="text-center">
        <div className="animate-bounce mb-4">
          <Book size={48} className="text-blue-500 dark:text-blue-400" />
        </div>
        <div className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          Loading eBook Builder
        </div>
        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Please wait while we set things up...
        </div>
      </div>
    </div>
  );
};

export default Loader;