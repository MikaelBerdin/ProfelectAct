import React from 'react';

export default function PrimaryButton({ children, className = '', ...props }) {
    return (
        <button
            {...props}
            className={`px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-900 text-white font-semibold rounded-md shadow-sm transition duration-150 ease-in-out ${className}`}
        >
            {children}
        </button>
    );
}
