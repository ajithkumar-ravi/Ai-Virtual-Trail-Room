import React from 'react';
import { CategoryCard } from '../components/CategoryCard';

interface HomePageProps {
    onSelectCategory: (category: string) => void;
}

const categories = [
    { name: 'T-Shirt', imageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1964&auto=format&fit=crop' },
    { name: 'Shirt', imageUrl: 'https://images.unsplash.com/photo-1596755032483-219d78438aad?q=80&w=1974&auto=format&fit=crop' },
    { name: 'Pants', imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1974&auto=format&fit=crop' },
    { name: 'Saree', imageUrl: 'https://images.unsplash.com/photo-1583573636361-2674226e6a17?q=80&w=1974&auto=format&fit=crop' },
];

export const HomePage: React.FC<HomePageProps> = ({ onSelectCategory }) => {
    return (
        <div className="space-y-12">
            <div className="text-center p-8 bg-base-100 dark:bg-gray-800 rounded-lg shadow-md">
                <h1 className="text-4xl font-bold text-base-content dark:text-white">Welcome to the Future of Fashion</h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Browse our collections and try on clothes virtually from the comfort of your home.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map(category => (
                    <CategoryCard 
                        key={category.name} 
                        title={category.name} 
                        imageUrl={category.imageUrl} 
                        onClick={() => onSelectCategory(category.name)} 
                    />
                ))}
            </div>
            <div className="bg-base-100 dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
                <h2 className="text-3xl font-bold text-base-content dark:text-white mb-4">Discover Your Perfect Fit</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    Tired of guessing sizes? Our groundbreaking AI Virtual Trial Room lets you see how clothes look on you before you buy. Just upload a photo, choose an item, and let our technology create a realistic try-on experience. Shop with confidence and find styles that truly fit you.
                </p>
            </div>
        </div>
    );
};