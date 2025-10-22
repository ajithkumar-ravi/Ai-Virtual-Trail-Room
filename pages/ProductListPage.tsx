import React from 'react';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';

interface ProductListPageProps {
    category?: string;
    searchQuery?: string;
    products: Product[];
    onSelectProduct: (product: Product) => void;
    onBack: () => void;
}

const BackArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);

export const ProductListPage: React.FC<ProductListPageProps> = ({ category, searchQuery, products, onSelectProduct, onBack }) => {
    const title = searchQuery ? `Search Results for "${searchQuery}"` : `${category}s`;
    
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-base-content dark:text-white">{title}</h1>
                <button
                    onClick={onBack}
                    className="flex items-center px-4 py-2 bg-base-100 dark:bg-gray-700 text-base-content dark:text-gray-200 rounded-lg shadow hover:bg-base-300 dark:hover:bg-gray-600 transition-colors"
                >
                   <BackArrowIcon />
                    Back
                </button>
            </div>
            {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} onSelect={onSelectProduct} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <h2 className="text-2xl font-semibold text-base-content dark:text-white">No Products Found</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">
                        {searchQuery ? `We couldn't find any products matching your search.` : `There are currently no products in this category.`}
                    </p>
                </div>
            )}
        </div>
    );
};
