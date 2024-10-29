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
                    <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-lg overflow-hidden">
                        <div className="p-6 bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">

                            {/* Create New Chain Button */}
                            <div className="mb-4 flex justify-between items-center">
                                <button
                                    onClick={() => setCreateModalOpen(true)}
                                    className="bg-blue-500 dark:bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-600 dark:hover:bg-blue-700 transition flex items-center space-x-2"
                                >
                                    <FontAwesomeIcon icon={faPlus} />
                                    <span>Add New Chain</span>
                                </button>

                                {/* Sort and Search Bar */}
                                <div className="flex items-center space-x-4">
                                    {/* Sort By Dropdown */}
                                    <div className="flex items-center space-x-2">
                                        <span className="text-gray-700 dark:text-gray-300 font-medium">Sort:</span>
                                        <select
                                            value={sortBy}
                                            onChange={handleSortChange}
                                            className="bg-gray-200 dark:bg-gray-800 dark:text-gray-200 rounded p-2"
                                        >
                                            <option value="">Choose...</option>
                                            <option value="branch_name">Branch Name</option>
                                            <option value="founder">Founder</option>
                                            <option value="date_founded">Date Founded</option>
                                        </select>
                                        <button
                                            onClick={toggleSortDirection}
                                            className="text-gray-700 dark:text-gray-300 px-2"
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
                                    <form onSubmit={handleSearch} className="flex items-center space-x-2">
                                        <input
                                            type="text"
                                            placeholder="Search..."
                                            value={data.search}
                                            onChange={(e) => setData('search', e.target.value)}
                                            className="bg-gray-200 dark:bg-gray-800 dark:text-gray-200 rounded p-2"
                                        />
                                        <button
                                            type="submit"
                                            className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition"
                                            aria-label="Search"
                                        >
                                            <FontAwesomeIcon icon={faSearch} size="lg" />
                                        </button>
                                    </form>
                                </div>
                            </div>

                            {/* Chain Table */}
                            <div className="overflow-x-auto border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg">
                                <table className="min-w-full bg-white dark:bg-gray-800">
                                    <thead className="bg-gray-200 dark:bg-gray-900">
                                        <tr>
                                            <th className="p-3 text-left font-semibold text-gray-700 dark:text-gray-300">Branch Name</th>
                                            <th className="p-3 text-left font-semibold text-gray-700 dark:text-gray-300">Founder</th>
                                            <th className="p-3 text-left font-semibold text-gray-700 dark:text-gray-300">Location</th>
                                            <th className="p-3 text-left font-semibold text-gray-700 dark:text-gray-300">Date Founded</th>
                                            <th className="p-3 text-left font-semibold text-gray-700 dark:text-gray-300">Created By</th> {/* New Column */}
                                            <th className="p-3 text-left font-semibold text-gray-700 dark:text-gray-300">Created At</th>
                                            <th className="p-3 text-left font-semibold text-gray-700 dark:text-gray-300">Updated At</th>
                                            <th className="p-3 text-left font-semibold text-gray-700 dark:text-gray-300">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {fastFoodChains.data.map((chain) => (
                                            <tr key={chain.id} className="hover:bg-gray-100 dark:hover:bg-gray-600 border-b border-gray-200 dark:border-gray-700">
                                                <td className="p-3 text-gray-800 dark:text-gray-200">{chain.branch_name}</td>
                                                <td className="p-3 text-gray-800 dark:text-gray-200">{chain.founder}</td>
                                                <td className="p-3 text-gray-800 dark:text-gray-200">{chain.location}</td>
                                                <td className="p-3 text-gray-800 dark:text-gray-200">{new Date(chain.date_founded).toLocaleDateString()}</td>
                                                <td className="p-3 text-gray-800 dark:text-gray-200">{chain.creator?.name || 'N/A'}</td> {/* Display creator's name */}
                                                <td className="p-3 text-gray-800 dark:text-gray-200">{new Date(chain.created_at).toLocaleString()}</td>
                                                <td className="p-3 text-gray-800 dark:text-gray-200">{new Date(chain.updated_at).toLocaleString()}</td>
                                                <td className="p-3 flex space-x-2">
                                                    <button
                                                        onClick={() => openEditModal(chain)}
                                                        className="text-yellow-500 hover:text-yellow-600 transition"
                                                        aria-label="Edit"
                                                    >
                                                        <FontAwesomeIcon icon={faEdit} size="lg" />
                                                    </button>
                                                    <button
                                                        onClick={() => openDeleteModal(chain)}
                                                        className="text-red-500 hover:text-red-600 transition"
                                                        aria-label="Delete"
                                                    >
                                                        <FontAwesomeIcon icon={faTrash} size="lg" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination Links */}
                            <div className="mt-4 flex justify-between items-center">
                                <span className="text-gray-600 dark:text-gray-200">Page {fastFoodChains.current_page} of {fastFoodChains.last_page}</span>
                                <div className="flex space-x-1">
                                    {fastFoodChains.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url}
                                            className={`px-3 py-1 border rounded ${link.active ? 'bg-blue-500 dark:bg-blue-600 text-white' : 'text-gray-700 dark:text-gray-100'}`}
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
                            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 transition"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={confirmDelete}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-600 transition"
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
