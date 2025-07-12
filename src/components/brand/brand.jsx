import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    useDeleteBrandMutation,
    useGetAllBrandsQuery,
    useListByKeywordServiceQuery
} from "@/redux/feature/brandAPI/brandAPI.js";
import { FaEdit, FaTrash, FaPlus, FaSearch, FaEye } from 'react-icons/fa';
import { Link } from "react-router-dom";

const Brand = () => {
    const { data, error, isLoading, refetch } = useGetAllBrandsQuery();
    const [deleteBrand] = useDeleteBrandMutation();
    const [search, setSearch] = useState("");
    const { data: searchData } = useListByKeywordServiceQuery(search, {
        skip: search === ""
    });

    const brandData = search ? (Array.isArray(searchData?.data) ? searchData?.data : []) : (Array.isArray(data?.data) ? data?.data : []);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const rowVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    const HandleDelete = async (id) => {
        try {
            await deleteBrand(id);
            alert("Brand deleted successfully");
            refetch();
        } catch (err) {
            console.log(err);
        }
    };

    if (isLoading) return (
        <div className="flex justify-center items-center h-64">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"
            />
        </div>
    );

    if (error) return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 bg-red-100 text-red-700 rounded-lg"
        >
            Error loading brands: {error.message}
        </motion.div>
    );

    return (
        <div className="p-4 md:p-6 max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl sm:text-3xl font-bold text-gray-800"
                >
                    Brand Management
                </motion.h1>
                <Link to='/creat-brand' className="w-full md:w-auto">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center justify-center w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors"
                    >
                        <FaPlus className="mr-2" />
                        Create Brand
                    </motion.button>
                </Link>
            </div>

            {/* Search Bar */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
            >
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaSearch className="text-gray-400" />
                    </div>
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        type="text"
                        placeholder="Search brands by name or status..."
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
            >
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Logo</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Status</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Created</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Updated</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                        </thead>
                        <motion.tbody
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="bg-white divide-y divide-gray-200"
                        >
                            {brandData?.map((brand) => (
                                <motion.tr
                                    key={brand._id}
                                    variants={rowVariants}
                                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
                                    className="transition-colors duration-150"
                                >
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        {brand.image ? (
                                            <img
                                                src={brand.image}
                                                alt={brand.name}
                                                className="h-10 w-10 rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                <span className="text-blue-600 font-medium">{brand.name.charAt(0)}</span>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{brand.name}</div>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap hidden sm:table-cell">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${brand.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {brand.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                                        {new Date(brand.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                                        {new Date(brand.updatedAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-2">
                                            <Link to={`/brand-list-byproduct/${brand?._id}`}>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className="text-purple-600 hover:text-purple-900"
                                                    aria-label="View"
                                                    title="View Details"
                                                >
                                                    <FaEye />
                                                </motion.button>
                                            </Link>
                                            <Link to={`/edit-brand/${brand?._id}`}>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className="text-blue-600 hover:text-blue-900"
                                                    aria-label="Edit"
                                                    title="Edit"
                                                >
                                                    <FaEdit />
                                                </motion.button>
                                            </Link>
                                            <motion.button
                                                onClick={() => HandleDelete(brand?._id)}
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                className="text-red-600 hover:text-red-900"
                                                aria-label="Delete"
                                                title="Delete"
                                            >
                                                <FaTrash />
                                            </motion.button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </motion.tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
};

export default Brand;