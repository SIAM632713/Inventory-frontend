import React, {useState} from 'react';
import { motion } from 'framer-motion';
import {FaSearch} from 'react-icons/fa';
import {useListbyBrandQuery,useListByKeywordServiceQuery} from "@/redux/feature/productAPI/product.API.js";
import {useParams} from "react-router-dom";


const ProductListbyBrand = () => {

    const {brandID}=useParams();
    const {data,error,isLoading} = useListbyBrandQuery(brandID);
    const [search,setsearch]=useState();
    const {data:searchProduct}=useListByKeywordServiceQuery(search,{
        skip:search === ""
    })

    const productData=search ? (Array.isArray(searchProduct?.data) ? searchProduct?.data : []) : (Array.isArray(data?.data) ? data?.data : []);

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
        <div className="p-4 sm:p-6 max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <motion.h1
                    initial={{opacity: 0, y: -20}}
                    animate={{opacity: 1, y: 0}}
                    className="text-2xl sm:text-3xl font-bold text-gray-800"
                >
                    Brand Management
                </motion.h1>
            </div>

            {/* Search Bar */}
            <motion.div
                initial={{opacity: 0, y: -10}}
                animate={{opacity: 1, y: 0}}
                className="mb-6"
            >
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaSearch className="text-gray-400"/>
                    </div>
                    <input
                        value={search}
                        onChange={(e) => setsearch(e.target.value)}
                        type="text"
                        placeholder="Search products..."
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
            </motion.div>

            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                className="bg-white rounded-xl shadow-md overflow-hidden"
            >
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Logo</th>
                            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Status</th>
                            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Created At</th>
                            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Updated At</th>
                        </tr>
                        </thead>
                        <motion.tbody
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="bg-white divide-y divide-gray-200"
                        >
                            {productData?.map((brand) => (
                                <motion.tr
                                    key={brand._id}
                                    variants={rowVariants}
                                    whileHover={{scale: 1.02, backgroundColor: 'rgba(59, 130, 246, 0.05)'}}
                                    className="transition-colors duration-150"
                                >
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                                        {brand.image ? (
                                            <img
                                                src={brand.image}
                                                alt={brand.name}
                                                className="h-10 w-10 rounded-full object-cover"
                                            />
                                        ) : (
                                            <div
                                                className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                <span
                                                    className="text-blue-600 font-medium">{brand.name.charAt(0)}</span>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{brand.name}</div>
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${brand.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {brand.status}
                                        </span>
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                                        {new Date(brand.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                                        {new Date(brand.updatedAt).toLocaleDateString()}
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

export default ProductListbyBrand;