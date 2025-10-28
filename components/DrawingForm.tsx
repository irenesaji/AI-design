import React, { useState } from 'react';
import type { FormData } from '../types';

interface DrawingFormProps {
  onGenerate: (formData: FormData) => void;
  isLoading: boolean;
}

const Section: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode; className?: string }> = ({ title, icon, children, className = '' }) => (
    <div className={`bg-white p-6 rounded-lg shadow-lg ${className}`}>
        <div className="flex items-center mb-4">
            <div className="text-indigo-500 mr-3">{icon}</div>
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
        <div className="space-y-4">{children}</div>
    </div>
);

const StyleCard: React.FC<{ title: string; description: string; icon: React.ReactNode; isSelected: boolean; onSelect: () => void; }> = ({ title, description, icon, isSelected, onSelect }) => (
    <div onClick={onSelect} className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${isSelected ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-500' : 'border-gray-200 bg-white hover:border-indigo-400'}`}>
        <div className="flex items-center">
            <div className="text-gray-500 mr-4">{icon}</div>
            <div>
                <p className="font-semibold text-gray-800">{title}</p>
                <p className="text-sm text-gray-500">{description}</p>
            </div>
        </div>
    </div>
);

const ColorPalette: React.FC<{ name: string; colors: string[]; isSelected: boolean; onSelect: () => void; }> = ({ name, colors, isSelected, onSelect }) => (
    <div onClick={onSelect} className={`p-3 border rounded-lg cursor-pointer transition-all duration-200 flex items-center justify-between ${isSelected ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-500' : 'border-gray-200 bg-white hover:border-indigo-400'}`}>
        <span className="font-medium text-gray-700">{name}</span>
        <div className="flex space-x-1.5">
            {colors.map(color => <div key={color} className={`w-5 h-5 rounded-full`} style={{ backgroundColor: color }}></div>)}
        </div>
    </div>
);


const Checkbox: React.FC<{ id: string; label: string; checked: boolean; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; }> = ({ id, label, checked, onChange }) => (
    <label htmlFor={id} className="flex items-center space-x-3 cursor-pointer">
        <input id={id} type="checkbox" checked={checked} onChange={onChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
        <span className="text-gray-700">{label}</span>
    </label>
);


export const DrawingForm: React.FC<DrawingFormProps> = ({ onGenerate, isLoading }) => {
  const [formData, setFormData] = useState<FormData>({
    architecturalStyle: 'Modern Minimalist',
    roomLayoutPriority: 'Living Room',
    colorScheme: 'Neutral Elegance',
    vastuCompliance: true,
    ecoFriendlyFeatures: ['Solar panels', 'Rainwater harvesting'],
    bedrooms: '3 Bedrooms',
    bathrooms: '2 Bathrooms',
    additionalRooms: ['Kitchen', 'Living Room', 'Dining Room', 'Balcony/Terrace'],
  });

  const handleStyleChange = (style: string) => setFormData(prev => ({ ...prev, architecturalStyle: style }));
  const handleColorChange = (scheme: string) => setFormData(prev => ({ ...prev, colorScheme: scheme }));

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, category: 'ecoFriendlyFeatures' | 'additionalRooms') => {
      const { id, checked } = e.target;
      setFormData(prev => {
          const currentItems = prev[category];
          const newItems = checked
              ? [...currentItems, id]
              : currentItems.filter(item => item !== id);
          return { ...prev, [category]: newItems };
      });
  };

   const handleSingleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setFormData(prev => ({ ...prev, [id]: checked }));
  };


  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(formData);
  };
  
  const architecturalStyles = [
      { id: 'Modern Minimalist', title: 'Modern Minimalist', description: 'Clean lines, open spaces, neutral colors', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
      { id: 'Traditional Indian', title: 'Traditional Indian', description: 'Classic architecture, warm colors, cultural elements', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg> },
      { id: 'Luxury Contemporary', title: 'Luxury Contemporary', description: 'Premium finishes, sophisticated design, high-end materials', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16v4m-2-2h4m5 11v4m-2-2h4M12 3v4m-2-2h4m0 7.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" /></svg> },
      { id: 'Eco-Friendly', title: 'Eco-Friendly', description: 'Sustainable materials, green technology, natural lighting', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2a1 1 0 011 1v8a1 1 0 01-1 1h-2a1 1 0 01-1-1zm-6 0V8a1 1 0 011-1h2a1 1 0 011 1v8a1 1 0 01-1 1H8a1 1 0 01-1-1z" /></svg> },
  ];

  const colorSchemes = [
      { id: 'Neutral Elegance', name: 'Neutral Elegance', colors: ['#F3F4F6', '#E5E7EB', '#D1D5DB', '#6B7280'] },
      { id: 'Warm Earth', name: 'Warm Earth', colors: ['#FEF3C7', '#FBBF24', '#D97706', '#92400E'] },
      { id: 'Cool Blues', name: 'Cool Blues', colors: ['#DBEAFE', '#93C5FD', '#3B82F6', '#1E40AF'] },
      { id: 'Vibrant Accent', name: 'Vibrant Accent', colors: ['#FCE7F3', '#F472B6', '#EC4899', '#9D174D'] },
  ];

  const additionalRoomOptions = ['Kitchen', 'Living Room', 'Dining Room', 'Study/Office Room', 'Balcony/Terrace', 'Garage/Parking'];
  const ecoFriendlyOptions = ['Solar panels', 'Rainwater harvesting', 'Natural ventilation'];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Section title="Design Preferences" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>}>
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-600">Architectural Style</h4>
            {architecturalStyles.map(style => <StyleCard key={style.id} {...style} isSelected={formData.architecturalStyle === style.id} onSelect={() => handleStyleChange(style.id)} />)}
          </div>
          <div>
            <label htmlFor="roomLayoutPriority" className="text-sm font-semibold text-gray-600 block mb-2">Room Layout Priority</label>
            <select id="roomLayoutPriority" value={formData.roomLayoutPriority} onChange={handleSelectChange} className="w-full bg-white border border-gray-300 text-gray-700 rounded-md p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200">
                <option>Living Room</option>
                <option>Kitchen</option>
                <option>Master Bedroom</option>
                <option>Outdoor Space</option>
            </select>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-600">Color Scheme</h4>
            {colorSchemes.map(scheme => <ColorPalette key={scheme.id} {...scheme} isSelected={formData.colorScheme === scheme.id} onSelect={() => handleColorChange(scheme.id)} />)}
          </div>
        </Section>
        
        <div className="space-y-6">
            <Section title="Special Features" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16v4m-2-2h4m5 11v4m-2-2h4M12 3v4m-2-2h4m0 7.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" /></svg>}>
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Vastu Compliance</h4>
                    <Checkbox id="vastuCompliance" label="Follow Vastu Shastra principles for positive energy" checked={formData.vastuCompliance} onChange={handleSingleCheckboxChange} />
                </div>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Eco-Friendly Features</h4>
                    {ecoFriendlyOptions.map(opt => <Checkbox key={opt} id={opt} label={opt} checked={formData.ecoFriendlyFeatures.includes(opt)} onChange={(e) => handleCheckboxChange(e, 'ecoFriendlyFeatures')} />)}
                </div>
            </Section>
            
            <button type="submit" disabled={isLoading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out disabled:bg-indigo-400 disabled:cursor-not-allowed flex items-center justify-center text-lg shadow-lg hover:shadow-indigo-500/50">
                {isLoading ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        Generating...
                    </>
                ) : '✨ Generate AI Design'}
            </button>
        </div>
      </div>
      <Section title="Room Specifications" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14v6m-3-3h6M3 10h2a2 2 0 012 2v6a2 2 0 01-2 2H3a2 2 0 01-2-2v-6a2 2 0 012-2zM3 6h18M10 6V4a2 2 0 012-2h0a2 2 0 012 2v2m-4 0h4" /></svg>} className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="bedrooms" className="text-sm font-semibold text-gray-600 block mb-2">Number of Bedrooms</label>
                    <select id="bedrooms" value={formData.bedrooms} onChange={handleSelectChange} className="w-full bg-white border border-gray-300 text-gray-700 rounded-md p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200">
                        {[1, 2, 3, 4, 5].map(n => <option key={n}>{`${n} Bedroom${n > 1 ? 's' : ''}`}</option>)}
                    </select>
                </div>
                 <div>
                    <label htmlFor="bathrooms" className="text-sm font-semibold text-gray-600 block mb-2">Number of Bathrooms</label>
                    <select id="bathrooms" value={formData.bathrooms} onChange={handleSelectChange} className="w-full bg-white border border-gray-300 text-gray-700 rounded-md p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200">
                        {[1, 2, 3, 4, 5].map(n => <option key={n}>{`${n} Bathroom${n > 1 ? 's' : ''}`}</option>)}
                    </select>
                </div>
            </div>
            <div>
                <h4 className="text-sm font-semibold text-gray-600 block mb-2">Additional Rooms</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {additionalRoomOptions.map(opt => <Checkbox key={opt} id={opt} label={opt} checked={formData.additionalRooms.includes(opt)} onChange={(e) => handleCheckboxChange(e, 'additionalRooms')} />)}
                </div>
            </div>
      </Section>
    </form>
  );
};