import React, { useEffect, useState } from 'react';
import { useForm } from '@inertiajs/react';

const Edit = ({ fastFoodChain, onClose }) => {
    const { data, setData, put, errors } = useForm({
        branch_name: fastFoodChain.branch_name || '',
        founder: fastFoodChain.founder || '',
        location: fastFoodChain.location || '',
        date_founded: fastFoodChain.date_founded || '',
    });

    const [dateError, setDateError] = useState('');

    useEffect(() => {
        setData({
            branch_name: fastFoodChain.branch_name,
            founder: fastFoodChain.founder,
            location: fastFoodChain.location,
            date_founded: fastFoodChain.date_founded,
        });
    }, [fastFoodChain]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const selectedDate = new Date(data.date_founded).toISOString().split('T')[0];
        const today = new Date().toISOString().split('T')[0];

        if (selectedDate > today) {
            setDateError('Date Founded cannot be in the future.');
            return;
        }

        setDateError('');
        put(`/fast_food_chains/${fastFoodChain.id}`, {
            onSuccess: () => onClose(),
        });
    };

    const handleFounderChange = (e) => {
        const value = e.target.value;
        if (/^[a-zA-Z\s]*$/.test(value)) {
            setData('founder', value);
        }
    };

    return (
        <div className="relative p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-xl shadow-lg max-w-md mx-auto">
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-3 right-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 text-2xl font-bold focus:outline-none"
                style={{
                    backgroundColor: 'transparent',
                    borderRadius: '50%',
                    padding: '0.25rem 0.5rem',
                }}
            >
                &times;
            </button>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
                Edit Fast Food Chain
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Branch Name Field */}
                <div className="flex flex-col">
                    <label htmlFor="branch_name" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Branch Name
                    </label>
                    <input
                        type="text"
                        id="branch_name"
                        placeholder="Enter Branch Name"
                        value={data.branch_name}
                        onChange={(e) => setData('branch_name', e.target.value)}
                        required
                        className="w-full p-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                    {errors.branch_name && <span className="text-red-500 text-sm">{errors.branch_name}</span>}
                </div>

                {/* Founder Field with Real-Time Validation */}
                <div className="flex flex-col">
                    <label htmlFor="founder" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Founder
                    </label>
                    <input
                        type="text"
                        id="founder"
                        placeholder="Enter Founder"
                        value={data.founder}
                        onChange={handleFounderChange}
                        required
                        className="w-full p-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                    {errors.founder && <span className="text-red-500 text-sm">{errors.founder}</span>}
                </div>

                {/* Location Field */}
                <div className="flex flex-col">
                    <label htmlFor="location" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Location
                    </label>
                    <input
                        type="text"
                        id="location"
                        placeholder="Enter Location"
                        value={data.location}
                        onChange={(e) => setData('location', e.target.value)}
                        required
                        className="w-full p-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                    {errors.location && <span className="text-red-500 text-sm">{errors.location}</span>}
                </div>

                {/* Date Founded Field with Validation */}
                <div className="flex flex-col">
                    <label htmlFor="date_founded" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Date Founded
                    </label>
                    <input
                        type="date"
                        id="date_founded"
                        value={data.date_founded}
                        onChange={(e) => setData('date_founded', e.target.value)}
                        required
                        className="w-full p-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                    {dateError && <span className="text-red-500 text-sm">{dateError}</span>}
                    {errors.date_founded && <span className="text-red-500 text-sm">{errors.date_founded}</span>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 dark:bg-indigo-700 text-white font-bold py-3 mt-4 rounded-full shadow-lg hover:bg-blue-700 dark:hover:bg-indigo-800 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Save
                </button>
            </form>
        </div>
    );
};

export default Edit;
