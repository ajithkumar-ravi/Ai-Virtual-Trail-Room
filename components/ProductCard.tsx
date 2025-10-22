import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
    product: Product;
    onSelect: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
    return (
        <div className="bg-base-100 dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden group flex flex-col">
            <div className="relative overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-base-content dark:text-white truncate">{product.name}</h3>
                <p className="text-base text-gray-500 dark:text-gray-400 mt-1">₹{product.price.toLocaleString('en-IN')}</p>
                <button 
                    onClick={() => onSelect(product)}
                    className="w-full mt-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-content bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                >
                    View Details
                </button>
            </div>
        </div>
    );
};