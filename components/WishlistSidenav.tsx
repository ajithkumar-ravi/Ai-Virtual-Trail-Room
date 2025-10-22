import React from 'react';
import { Product } from '../types';

interface WishlistSidenavProps {
    isOpen: boolean;
    onClose: () => void;
    wishlist: Product[];
    onRemoveFromWishlist: (productId: number) => void;
    onSelectProduct: (product: Product) => void;
}

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

export const WishlistSidenav: React.FC<WishlistSidenavProps> = ({ isOpen, onClose, wishlist, onRemoveFromWishlist, onSelectProduct }) => {
    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            ></div>

            {/* Sidenav */}
            <div
                className={`fixed top-0 right-0 h-full w-full max-w-sm bg-base-100 dark:bg-gray-800 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-base-300 dark:border-gray-700">
                        <h2 className="text-xl font-bold">Your Wishlist</h2>
                        <button onClick={onClose} className="p-2 rounded-full hover:bg-base-200 dark:hover:bg-gray-700 transition-colors">
                            <CloseIcon />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-grow overflow-y-auto p-4">
                        {wishlist.length > 0 ? (
                            <ul className="space-y-4">
                                {wishlist.map(product => (
                                    <li key={product.id} className="flex items-center gap-4 p-2 rounded-lg bg-base-200 dark:bg-gray-700/50">
                                        <img 
                                            src={product.image} 
                                            alt={product.name} 
                                            className="w-20 h-20 object-cover rounded-md cursor-pointer"
                                            onClick={() => onSelectProduct(product)}
                                        />
                                        <div className="flex-grow" onClick={() => onSelectProduct(product)}>
                                            <h3 className="font-semibold text-sm truncate cursor-pointer hover:text-primary">{product.name}</h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">₹{product.price.toLocaleString('en-IN')}</p>
                                        </div>
                                        <button 
                                            onClick={() => onRemoveFromWishlist(product.id)}
                                            className="p-2 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
                                            aria-label="Remove from wishlist"
                                        >
                                            <TrashIcon />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 dark:text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.672l1.318-1.354a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
                                </svg>
                                <h3 className="text-lg font-semibold text-base-content dark:text-gray-300">Your wishlist is empty.</h3>
                                <p className="text-sm mt-1">Add items you love by clicking the heart icon.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
