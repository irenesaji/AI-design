import React from 'react';

export const Header: React.FC = () => (
  <header className="bg-white shadow-sm sticky top-0 z-50">
    <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center py-3 border-b">
            <a href="#" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">
                &larr; Back to Dashboard
            </a>
            <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-indigo-500 rounded-md flex items-center justify-center text-white font-bold text-lg">
                    A
                </div>
                <h1 className="text-xl font-bold text-gray-800 tracking-tight">
                    AI House Designer
                </h1>
            </div>
        </div>
    </div>
  </header>
);
