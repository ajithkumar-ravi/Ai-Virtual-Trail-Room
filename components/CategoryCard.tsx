import React from 'react';

interface CategoryCardProps {
    title: string;
    imageUrl: string;
    onClick: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ title, imageUrl, onClick }) => {
    return (
        <div 
            className="relative rounded-lg overflow-hidden shadow-lg cursor-pointer group transform hover:-translate-y-1 transition-transform duration-300"
            onClick={onClick}
        >
            <img src={imageUrl} alt={title} className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300" />
            <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                <h3 className="text-white text-3xl font-bold tracking-wider">{title}</h3>
            </div>
        </div>
    );
};
