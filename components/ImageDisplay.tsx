import React from 'react';
import type { GeneratedImage } from '../types';

interface ImageDisplayProps {
  images: GeneratedImage[] | null;
  isLoading: boolean;
  error: string | null;
}

const LoadingState: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full text-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-indigo-500"></div>
        <p className="mt-4 text-lg text-gray-600">Generating your architectural designs...</p>
        <p className="mt-2 text-sm text-gray-400">This can take a few moments. Please wait.</p>
    </div>
);

const ErrorState: React.FC<{ error: string }> = ({ error }) => (
    <div className="flex flex-col items-center justify-center h-full text-center p-4 bg-red-50 border border-red-200 rounded-lg">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="mt-4 text-lg font-semibold text-red-700">An Error Occurred</p>
        <p className="mt-2 text-sm text-red-500">{error}</p>
    </div>
);

const InitialState: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full text-center border-2 border-dashed border-gray-300 rounded-lg p-8">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="mt-4 text-lg text-gray-500">Your generated designs will appear here.</p>
        <p className="mt-1 text-sm text-gray-400">Fill out the form and click "Generate AI Design" to start.</p>
    </div>
);


export const ImageDisplay: React.FC<ImageDisplayProps> = ({ images, isLoading, error }) => {
  return (
    <div className="flex-grow flex items-center justify-center bg-gray-50/50 rounded-lg min-h-[400px] lg:min-h-full w-full">
        {isLoading && <LoadingState />}
        {!isLoading && error && <ErrorState error={error} />}
        {!isLoading && !error && images && (
            <div className="w-full h-full p-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-fr">
                {images.map(image => (
                    <div key={image.view} className="border rounded-lg p-2 flex flex-col shadow-sm">
                        <h4 className="text-center font-semibold text-gray-700 mb-2">{image.view}</h4>
                        <div className="flex-grow bg-gray-100 rounded">
                           <img 
                                src={image.src} 
                                alt={`Generated architectural drawing: ${image.view}`} 
                                className="w-full h-full object-contain rounded-md" 
                            />
                        </div>
                    </div>
                ))}
              </div>
            </div>
        )}
        {!isLoading && !error && !images && <InitialState />}
    </div>
  );
};