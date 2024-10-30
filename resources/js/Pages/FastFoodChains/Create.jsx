import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

const Create = ({ onClose }) => {
    const { data, setData, post, errors } = useForm({
        branch_name: '',
        founder: '',
        location: '',
        date_founded: '',
    });

    const [dateError, setDateError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const selectedDate = new Date(data.date_founded).toISOString().split('T')[0];
        const today = new Date().toISOString().split('T')[0];

        if (selectedDate > today) {
            setDateError('Date Founded cannot be in the future.');
            return;
        }

        setDateError('');
        post('/fast_food_chains', {
            onSuccess: () => onClose(),
            onError: () => {},
        });
    };

    return (
        <div className="relative p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-3xl font-bold focus:outline-none"
                style={{
                    padding: '0.25rem 0.5rem',
                    lineHeight: '1',
                    backgroundColor: 'transparent',
                    borderRadius: '50%',
                }}
            >
                &times;
            </button>

            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
                Add New Fast Food Chain
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
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    />
                    {errors.branch_name && <span className="text-red-500 text-sm">{errors.branch_name}</span>}
                </div>

                {/* Founder Field - Allow only letters */}
                <div className="flex flex-col">
                    <label htmlFor="founder" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Founder
                    </label>
                    <input
                        type="text"
                        id="founder"
                        placeholder="Enter Founder"
                        value={data.founder}
                        onChange={(e) => setData('founder', e.target.value.replace(/[^a-zA-Z\s]/g, ''))}
                        required
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
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
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    />
                    {errors.location && <span className="text-red-500 text-sm">{errors.location}</span>}
                </div>

                {/* Date Founded Field with validation */}
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
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    />
                    {dateError && <span className="text-red-500 text-sm">{dateError}</span>}
                    {errors.date_founded && <span className="text-red-500 text-sm">{errors.date_founded}</span>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 mt-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
                >
                    Add Fast Food Chain
                </button>
            </form>
        </div>
    );
};

export default Create;
