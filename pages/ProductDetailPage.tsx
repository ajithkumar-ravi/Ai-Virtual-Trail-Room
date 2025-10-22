import React from 'react';
import { Product } from '../types';

interface ProductDetailPageProps {
    product: Product;
    onTryOn: (product: Product) => void;
    onBack: () => void;
    wishlist: Product[];
    onAddToWishlist: (product: Product) => void;
    onRemoveFromWishlist: (productId: number) => void;
}

const BackArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);

const TryOnIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104l-2.28 2.28-1.244 4.356 4.356-1.244L15.86 3.22a2.25 2.25 0 013.182 3.182L10.75 15.69l-4.356 1.244 1.244-4.356L12.916 7.5M9.75 3.104l2.28 2.28" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21h9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 21H3" />
     </svg>
);

const ShoppingCartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

const HeartIcon = ({ filled }: { filled: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 mr-3 transition-colors ${filled ? 'text-red-500' : 'text-gray-500'}`} fill={filled ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={filled ? 0 : 2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.672l1.318-1.354a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
    </svg>
);


export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product, onTryOn, onBack, wishlist, onAddToWishlist, onRemoveFromWishlist }) => {
    
    const isInWishlist = wishlist.some(item => item.id === product.id);

    const toggleWishlist = () => {
        if (isInWishlist) {
            onRemoveFromWishlist(product.id);
        } else {
            onAddToWishlist(product);
        }
    };

    return (
        <div className="bg-base-100 dark:bg-gray-800 rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8">
            <button
                onClick={onBack}
                className="flex items-center mb-6 px-4 py-2 bg-base-200 dark:bg-gray-700 text-base-content dark:text-gray-200 rounded-lg shadow hover:bg-base-300 dark:hover:bg-gray-600 transition-colors"
            >
                <BackArrowIcon />
                Back to {product.category}s
            </button>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="flex justify-center items-center bg-base-200 dark:bg-gray-700/50 rounded-lg overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full max-h-[70vh] object-contain" />
                </div>
                <div className="flex flex-col justify-center">
                    <h1 className="text-3xl lg:text-4xl font-bold text-base-content dark:text-white">{product.name}</h1>
                    <p className="text-2xl text-primary font-semibold mt-2">₹{product.price.toLocaleString('en-IN')}</p>
                    <p className="mt-4 text-base text-gray-600 dark:text-gray-300 leading-relaxed">{product.description}</p>
                    
                    <div className="mt-8 space-y-4">
                        <button
                            onClick={() => onTryOn(product)}
                            className="w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-md shadow-sm text-lg font-medium text-primary-content bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                        >
                            <TryOnIcon />
                            Virtually Try On
                        </button>
                        
                        <div className="flex items-center space-x-4">
                            <button
                                className="w-full flex justify-center items-center py-3 px-6 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                            >
                                <ShoppingCartIcon />
                                Buy Now
                            </button>
                            <button
                                onClick={toggleWishlist}
                                className={`w-full flex justify-center items-center py-3 px-6 border rounded-md shadow-sm text-base font-medium transition-colors ${
                                    isInWishlist 
                                    ? 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:border-red-500/30 dark:text-red-400 dark:hover:bg-red-900/40'
                                    : 'bg-base-200 border-gray-300 text-gray-700 hover:bg-base-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-600'
                                }`}
                            >
                                <HeartIcon filled={isInWishlist} />
                                {isInWishlist ? 'In Wishlist' : 'Wishlist'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
