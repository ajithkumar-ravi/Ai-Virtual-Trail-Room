import React, { useState } from 'react';

interface ApiKeyModalProps {
    onSave: (apiKey: string) => void;
    onClose: () => void;
}

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ onSave, onClose }) => {
    const [apiKey, setApiKey] = useState('');

    const handleSave = () => {
        if (apiKey.trim()) {
            onSave(apiKey.trim());
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
            <div className="bg-base-100 dark:bg-gray-800 rounded-lg shadow-2xl p-6 w-full max-w-md relative animate-fade-in-up">
                <button 
                    onClick={onClose} 
                    className="absolute top-3 right-3 p-2 rounded-full hover:bg-base-200 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Close modal"
                >
                    <CloseIcon />
                </button>
                <h2 className="text-2xl font-bold mb-4">Set Your API Key</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    To use the Virtual Try-On feature, please provide your Google AI Studio API key. 
                    Your key is stored only in your browser session and is never shared.
                </p>
                <div className="space-y-4">
                    <input
                        type="password"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="Enter your Gemini API key"
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-base-200 dark:bg-gray-700 focus:ring-primary focus:border-primary"
                    />
                     <a 
                        href="https://aistudio.google.com/app/apikey" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                    >
                        Get your API key from Google AI Studio
                    </a>
                </div>
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={handleSave}
                        disabled={!apiKey.trim()}
                        className="px-6 py-2 bg-primary text-primary-content rounded-md font-semibold hover:bg-primary-hover disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
                    >
                        Save and Continue
                    </button>
                </div>
            </div>
        </div>
    );
};
