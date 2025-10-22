import React from 'react';
import { TryOnResult } from '../types';
import { Loader } from './Loader';

interface ResultDisplayProps {
    result: TryOnResult | null;
    isLoading: boolean;
}

const Placeholder = () => (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 dark:text-gray-400 bg-base-200 dark:bg-gray-700/50 rounded-lg p-8">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <h3 className="text-lg font-semibold text-base-content dark:text-gray-300">Your virtual try-on will appear here.</h3>
        <p className="text-sm">Upload your photos, select your preferences, and click "Virtually Try On" to see the magic happen.</p>
    </div>
);

const StyleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
);


export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, isLoading }) => {
    if (isLoading) {
        return <Loader />;
    }

    if (!result) {
        return <Placeholder />;
    }

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <img src={result.generatedImage} alt="Virtual try-on result" className="w-full rounded-lg shadow-lg" />
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-bold dark:text-white">Virtual Fit Assessment</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <thead className="bg-gray-50 dark:bg-gray-700/50">
                            <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Area of Concern</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">AI Recommendation</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800/50 divide-y divide-gray-200 dark:divide-gray-700">
                            {result.fitAssessment.map((item, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{item.area}</td>
                                    <td className="px-4 py-3 whitespace-normal text-sm text-gray-600 dark:text-gray-300">{item.recommendation}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{item.action}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="space-y-3">
                <h3 className="text-xl font-bold dark:text-white">Style Match Recommendations</h3>
                <ul className="space-y-2">
                    {result.styleRecommendations.map((rec, index) => (
                        <li key={index} className="flex items-center p-3 bg-indigo-50 dark:bg-indigo-900/40 rounded-lg">
                            <StyleIcon />
                            <span className="text-gray-800 dark:text-indigo-200">{rec}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};