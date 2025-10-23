import React, { useState, useEffect } from 'react';
import { ImageUploader } from '../components/ImageUploader';
import { TryOnControls } from '../components/TryOnControls';
import { ResultDisplay } from '../components/ResultDisplay';
import { generateTryOnImage, getFitAssessment } from '../services/geminiService';
import { ContextData, TryOnResult, Product } from '../types';

interface VirtualTryOnPageProps {
    product: Product;
    onBack: () => void;
}

const BackArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);

// Helper function to convert image URL to base64
async function imageUrlToBase64(url: string): Promise<string> {
  // Use a proxy to avoid CORS issues if necessary, but for Unsplash it's often not needed.
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export const VirtualTryOnPage: React.FC<VirtualTryOnPageProps> = ({ product, onBack }) => {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [garmentImage, setGarmentImage] = useState<string | null>(null);
  const [contextData, setContextData] = useState<ContextData>({
    user_size: 'M',
    garment_style_type: 'Slim Fit',
    desired_look: 'Casual, slightly oversized',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<TryOnResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Pre-load the garment image from the product
    const loadGarmentImage = async () => {
        try {
            const base64Image = await imageUrlToBase64(product.image);
            setGarmentImage(base64Image);
        } catch (err) {
            console.error("Failed to load garment image:", err);
            setError("Could not load the product image. Please try another item.");
        }
    };
    loadGarmentImage();
  }, [product]);

  const handleTryOn = async () => {
    if (!userImage || !garmentImage) {
      setError('Please upload your photo to begin.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const generatedImage = await generateTryOnImage(userImage, garmentImage, contextData);
      
      const assessment = await getFitAssessment(userImage, garmentImage, generatedImage, contextData);

      setResult({
        generatedImage,
        ...assessment,
      });

    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
          onClick={onBack}
          className="flex items-center mb-6 px-4 py-2 bg-base-100 dark:bg-gray-700 text-base-content dark:text-gray-200 rounded-lg shadow hover:bg-base-300 dark:hover:bg-gray-600 transition-colors"
      >
          <BackArrowIcon />
          Back to Product
      </button>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Column */}
        <div className="bg-base-100 dark:bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-base-content dark:text-white border-b border-base-300 dark:border-gray-700 pb-3">1. Your Setup</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ImageUploader 
              id="user-image" 
              label="Your Photo" 
              onImageUpload={setUserImage} 
            />
            {/* Garment uploader is now pre-filled */}
            <div className="flex flex-col gap-2">
                <label className="font-semibold text-base-content dark:text-gray-200">Garment Photo</label>
                <div className="relative flex justify-center items-center w-full h-64 border-2 border-dashed rounded-lg bg-base-200 dark:bg-gray-700 dark:border-gray-600">
                    {garmentImage ? (
                        <img src={garmentImage} alt={product.name} className="w-full h-full object-contain rounded-lg p-2" />
                    ) : (
                        <div className="text-sm text-gray-500">Loading garment...</div>
                    )}
                </div>
            </div>
          </div>
          <TryOnControls 
            contextData={contextData}
            setContextData={setContextData}
            onSubmit={handleTryOn}
            isLoading={isLoading}
            disabled={!userImage || !garmentImage}
          />
           {error && (
            <div className="text-red-500 bg-red-100 dark:text-red-300 dark:bg-red-900/50 p-3 rounded-lg">
              <span>{error}</span>
            </div>
          )}
        </div>
        
        {/* Output Column */}
        <div className="bg-base-100 dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-base-content dark:text-white border-b border-base-300 dark:border-gray-700 pb-3 mb-6">2. Virtual Try-On Result</h2>
          <ResultDisplay result={result} isLoading={isLoading} />
        </div>
      </div>
    </>
  );
}