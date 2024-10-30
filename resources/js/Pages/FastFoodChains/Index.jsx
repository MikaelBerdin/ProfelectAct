import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, usePage, useForm, router } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import Create from './Create';
import Edit from './Edit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSearch, faEdit, faTrash, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

const Index = () => {
    const { fastFoodChains, search } = usePage().props;
    const { data, setData, get } = useForm({
        search: search || '',
    });

    const [sortBy, setSortBy] = useState('');
    const [sortDirection, setSortDirection] = useState('asc');
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedChain, setSelectedChain] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault();
        get('/fast_food_chains', { preserveState: true });
    };

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
        applySort();
    };

    const toggleSortDirection = () => {
        const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        setSortDirection(newDirection);
        applySort(newDirection);
    };

    const applySort = (direction = sortDirection) => {
        router.get('/fast_food_chains', {
            search: data.search,
            sort_by: sortBy,
            sort_direction: direction,
        }, { preserveState: true });
    };

    const openEditModal = (chain) => {
        setSelectedChain(chain);
        setEditModalOpen(true);
    };

    const openDeleteModal = (chain) => {
        setSelectedChain(chain);
        setDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        router.delete(`/fast_food_chains/${selectedChain.id}`, {
            onSuccess: () => setDeleteModalOpen(false),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Fast Food Chains</h2>
            }
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl overflow-hidden">
                        <div className="p-6 bg-gray-100 dark:bg-gray-700 rounded-t-2xl border-b border-gray-200 dark:border-gray-600">

                            {/* Create New Chain Button */}
                            <div className="mb-4 flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
                                <button
                                    onClick={() => setCreateModalOpen(true)}
                                    className="bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-blue-600 dark:to-indigo-600 text-white px-6 py-2 rounded-full shadow-lg hover:from-blue-600 hover:to-indigo-700 transition transform hover:scale-105 flex items-center space-x-2"
                                >
                                    <FontAwesomeIcon icon={faPlus} />
                                    <span>Add New Chain</span>
                                </button>

                                {/* Sort and Search Bar */}
                                <div className="flex flex-col md:flex-row items-center md:space-x-4 w-full md:w-auto space-y-2 md:space-y-0 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-lg p-4 shadow-md">
                                    {/* Sort By Dropdown */}
                                    <div className="flex items-center space-x-2">
                                        <span className="text-gray-700 dark:text-gray-300 font-medium">Sort:</span>
                                        <select
                                            value={sortBy}
                                            onChange={handleSortChange}
                                            className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-lg px-3 py-2 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-indigo-500 transition"
                                        >
                                            <option value="">Choose...</option>
                                            <option value="branch_name">Branch Name</option>
                                            <option value="founder">Founder</option>
                                            <option value="date_founded">Date Founded</option>
                                        </select>
                                        <button
                                            onClick={toggleSortDirection}
                                            className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-indigo-400 transition-transform transform hover:scale-110 px-2"
                                            aria-label="Toggle Sort Direction"
                                        >
                                            {sortDirection === 'asc' ? (
                                                <FontAwesomeIcon icon={faSortUp} />
                                            ) : (
                                                <FontAwesomeIcon icon={faSortDown} />
                                            )}
                                        </button>
                                    </div>

                                    {/* Search Bar */}
                                    <form onSubmit={handleSearch} className="flex items-center space-x-2 w-full md:w-auto">
                                        <input
                                            type="text"
                                            placeholder="Search..."
                                            value={data.search}
                                            onChange={(e) => setData('search', e.target.value)}
                                            className="bg-white dark:bg-gray-900 dark:text-gray-200 rounded-lg p-2 shadow-inner w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-indigo-500 transition"
                                        />
                                        <button
                                            type="submit"
                                            className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition transform hover:scale-110 p-2 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-700 dark:to-indigo-700 rounded-full shadow-lg"
                                            aria-label="Search"
                                        >
                                            <FontAwesomeIcon icon={faSearch} size="lg" />
                                        </button>
                                    </form>
                                </div>
                            </div>

                            {/* Enhanced Chain Table with Hover Animation */}
                            <div className="overflow-x-auto px-4 pb-4">
                                <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow-md divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gradient-to-r from-blue-100 dark:from-gray-700 to-gray-200 dark:to-gray-800">
                                        <tr>
                                            <th className="p-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Branch Name</th>
                                            <th className="p-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Founder</th>
                                            <th className="p-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Location</th>
                                            <th className="p-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Date Founded</th>
                                            <th className="p-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Created By</th>
                                            <th className="p-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Created At</th>
                                            <th className="p-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Updated At</th>
                                            <th className="p-4 text-center text-sm font-semibold text-gray-600 dark:text-gray-300">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
                                        {fastFoodChains.data.map((chain, index) => (
                                            <tr 
                                                key={chain.id} 
                                                className={`hover:bg-blue-50 dark:hover:bg-blue-900 transition duration-300 ease-in-out transform hover:scale-[1.02] ${
                                                    index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-700'
                                                }`}
                                            >
                                                <td className="p-4 text-sm text-gray-700 dark:text-gray-200">{chain.branch_name}</td>
                                                <td className="p-4 text-sm text-gray-700 dark:text-gray-200">{chain.founder}</td>
                                                <td className="p-4 text-sm text-gray-700 dark:text-gray-200">{chain.location}</td>
                                                <td className="p-4 text-sm text-gray-700 dark:text-gray-200">{new Date(chain.date_founded).toLocaleDateString()}</td>
                                                <td className="p-4 text-sm text-gray-700 dark:text-gray-200">{chain.creator?.name || 'N/A'}</td>
                                                <td className="p-4 text-sm text-gray-700 dark:text-gray-200">{new Date(chain.created_at).toLocaleString()}</td>
                                                <td className="p-4 text-sm text-gray-700 dark:text-gray-200">{new Date(chain.updated_at).toLocaleString()}</td>
                                                <td className="p-4 flex justify-center space-x-4">
                                                    <button
                                                        onClick={() => openEditModal(chain)}
                                                        className="bg-yellow-100 text-yellow-600 hover:bg-yellow-200 transition rounded-full p-2 shadow-lg"
                                                        aria-label="Edit"
                                                    >
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </button>
                                                    <button
                                                        onClick={() => openDeleteModal(chain)}
                                                        className="bg-red-100 text-red-600 hover:bg-red-200 transition rounded-full p-2 shadow-lg"
                                                        aria-label="Delete"
                                                    >
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination Links */}
                            <div className="mt-6 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
                                <span className="text-gray-600 dark:text-gray-200">Page {fastFoodChains.current_page} of {fastFoodChains.last_page}</span>
                                <div className="flex space-x-1">
                                    {fastFoodChains.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url}
                                            className={`px-3 py-1 border rounded-full ${link.active ? 'bg-blue-500 dark:bg-blue-600 text-white' : 'text-gray-700 dark:text-gray-100'}`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <Modal show={isCreateModalOpen} onClose={() => setCreateModalOpen(false)} maxWidth="md">
                <Create onClose={() => setCreateModalOpen(false)} />
            </Modal>
            {selectedChain && (
                <Modal show={isEditModalOpen} onClose={() => setEditModalOpen(false)} maxWidth="md">
                    <Edit fastFoodChain={selectedChain} onClose={() => setEditModalOpen(false)} />
                </Modal>
            )}
            <Modal show={isDeleteModalOpen} onClose={() => setDeleteModalOpen(false)} maxWidth="sm">
                <div className="p-6 bg-white dark:bg-gray-800 rounded-md">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Confirm Delete</h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Are you sure you want to delete <strong>{selectedChain?.branch_name}</strong>? This action cannot be undone.
                    </p>
                    <div className="mt-6 flex justify-end space-x-2">
                        <button
                            onClick={() => setDeleteModalOpen(false)}
                            className="px-4 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 transition"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={confirmDelete}
                            className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-600 transition"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
};

export default Index;
