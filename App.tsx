import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { DrawingForm } from './components/DrawingForm';
import { ImageDisplay } from './components/ImageDisplay';
import type { FormData, GeneratedImage } from './types';
import { generateDrawing } from './services/geminiService';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async (formData: FormData) => {
    setIsLoading(true);
    setError(null);
    setGeneratedImages(null);

    const viewsToGenerate = ['Front Elevation', 'Back Elevation', 'Side Elevation', 'Top View', 'Floor Plan'];

    try {
      const imagePromises = viewsToGenerate.map(view => {
        const prompt = createPrompt(formData, view);
        return generateDrawing(prompt).then(src => ({
          view,
          src,
          prompt
        }));
      });

      const results = await Promise.all(imagePromises);
      setGeneratedImages(results);
    } catch (err) {
      if (err instanceof Error) {
        setError(`Failed to generate all drawings: ${err.message}`);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const createPrompt = (data: FormData, viewType: string): string => {
    const { architecturalStyle, roomLayoutPriority, colorScheme, vastuCompliance, ecoFriendlyFeatures, bedrooms, bathrooms, additionalRooms } = data;
    
    let viewSpecificInstructions = '';
    switch(viewType) {
        case 'Floor Plan':
            viewSpecificInstructions = 'Show the complete floor plan view from above with room layouts, dimensions, door and window placements, furniture arrangement suggestions, and clear labeling of all spaces. Architectural blueprint style.';
            break;
        case 'Front Elevation':
        case 'Back Elevation':
            viewSpecificInstructions = `Show the exterior ${viewType.toLowerCase()} with architectural details, materials, windows, doors, roofing, and landscaping elements.`;
            break;
        case 'Top View':
            viewSpecificInstructions = 'Show the complete top/roof view with roofing materials, roof pitch, chimneys, solar panel placement areas, and overall building footprint.';
            break;
        case 'Side Elevation':
            viewSpecificInstructions = 'Show the side elevation with height details, material transitions, and architectural features.';
            break;
    }
    
    const features = [
      vastuCompliance ? 'Follows Vastu Shastra principles for positive energy' : '',
      ecoFriendlyFeatures.length > 0 ? `Eco-friendly features: ${ecoFriendlyFeatures.join(', ')}` : ''
    ].filter(Boolean).join('. ');

    return `Generate a professional architectural ${viewType} drawing for a house with ${architecturalStyle} style.
The layout priority is ${roomLayoutPriority}.
Use a ${colorScheme} color scheme.
The house must have:
- ${bedrooms}
- ${bathrooms}
- Additional rooms: ${additionalRooms.join(', ')}
${features ? `- Special features: ${features}` : ''}

The drawing must be:
- A professional architectural illustration
- Have clean, clear lines and annotations
- Have realistic proportions and scale
- Have high detail and precision
- Ultra high resolution

${viewType}-Specific Instructions:
${viewSpecificInstructions}`;
  };


  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col font-sans">
      <Header />
      <main className="flex-grow container mx-auto p-4 lg:p-8">
         <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-gray-800">Design Your Dream Home</h2>
            <p className="text-gray-500 mt-2">Tell us your preferences and our AI will create the perfect design for you</p>
            <div className="inline-block w-16 h-1 bg-indigo-500 rounded mt-4"></div>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12">
          <DrawingForm onGenerate={handleGenerate} isLoading={isLoading} />
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col">
            <ImageDisplay 
              images={generatedImages} 
              isLoading={isLoading} 
              error={error} 
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
