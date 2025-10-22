import React from 'react';
import { ContextData } from '../types';

interface TryOnControlsProps {
    contextData: ContextData;
    setContextData: React.Dispatch<React.SetStateAction<ContextData>>;
    onSubmit: () => void;
    isLoading: boolean;
    disabled: boolean;
}

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const fits = ['Slim Fit', 'Regular Fit', 'Loose Fit', 'Oversized'];

export const TryOnControls: React.FC<TryOnControlsProps> = ({ contextData, setContextData, onSubmit, isLoading, disabled }) => {

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        setContextData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="user_size" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Size</label>
                    <select id="user_size" name="user_size" value={contextData.user_size} onChange={handleChange} className="w-full p-2 bg-transparent border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary dark:text-white">
                        {sizes.map(size => <option key={size} value={size} className="text-black dark:text-white bg-white dark:bg-gray-800">{size}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="garment_style_type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Garment Fit</label>
                    <select id="garment_style_type" name="garment_style_type" value={contextData.garment_style_type} onChange={handleChange} className="w-full p-2 bg-transparent border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary dark:text-white">
                        {fits.map(fit => <option key={fit} value={fit} className="text-black dark:text-white bg-white dark:bg-gray-800">{fit}</option>)}
                    </select>
                </div>
            </div>
            <div>
                <label htmlFor="desired_look" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Desired Look (Optional)</label>
                <input 
                    type="text" 
                    id="desired_look" 
                    name="desired_look"
                    value={contextData.desired_look}
                    onChange={handleChange}
                    className="w-full p-2 bg-transparent border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                    placeholder="e.g., Casual, business formal..."
                />
            </div>
            <button
                onClick={onSubmit}
                disabled={isLoading || disabled}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-primary-content bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
            >
                {isLoading ? (
                    <>
                       <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating...
                    </>
                ) : (
                    'Virtually Try On'
                )}
            </button>
        </div>
    );
};