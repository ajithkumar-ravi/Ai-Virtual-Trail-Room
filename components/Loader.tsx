import React from 'react';

export const Loader: React.FC = () => {
    const messages = [
        "Analyzing your pose...",
        "Warping the fabric digitally...",
        "Matching lighting and shadows...",
        "Stitching the final look...",
        "Consulting our AI stylists...",
    ];
    const [message, setMessage] = React.useState(messages[0]);

    React.useEffect(() => {
        let index = 0;
        const intervalId = setInterval(() => {
            index = (index + 1) % messages.length;
            setMessage(messages[index]);
        }, 2500);

        return () => clearInterval(intervalId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-full text-center text-gray-600 bg-base-100 dark:bg-gray-800 dark:text-gray-400 p-8">
            <svg className="animate-spin h-12 w-12 text-primary mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Creating Your Virtual Try-On</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 transition-opacity duration-500">{message}</p>
        </div>
    );
};