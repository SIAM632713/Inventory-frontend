import React, {useState} from 'react';
import {motion} from "framer-motion";
import {Link} from "react-router-dom";
import {FaEdit, FaPlus, FaSearch, FaTrash} from "react-icons/fa";
import {
    useDeleteProductMutation,
    useGetProductQuery,
    useListByKeywordServiceQuery
} from "@/redux/feature/productAPI/product.API.js";

const Product = () => {
    const {data,error,isLoading,refetch}=useGetProductQuery()
    const [deleteProduct]=useDeleteProductMutation()

    const [search,setsearch]=useState()
    const {data:productSearch}=useListByKeywordServiceQuery(search,{
        skip:search===""
    })

    const productData=search ? (Array.isArray(productSearch?.data) ? productSearch?.data : []) : (Array.isArray(data?.data) ? data?.data : [])


    const HandleonDelete=async (id)=>{
        try {
            await deleteProduct(id).unwrap()
            alert("Product Deleted Successfully")
            refetch()
        }catch(err){
            console.log(err)
        }
    }


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
        <div className="p-4 md:p-6 max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6 gap-4">
                <motion.h1
                    initial={{opacity: 0, y: -20}}
                    animate={{opacity: 1, y: 0}}
                    className="text-2xl md:text-3xl font-bold text-gray-800"
                >
                    Product Management
                </motion.h1>
                <Link to='/creat-product'>
                    <motion.button
                        whileHover={{scale: 1.05}}
                        whileTap={{scale: 0.95}}
                        className="flex items-center px-3 py-1.5 md:px-4 md:py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors text-sm md:text-base"
                    >
                        <FaPlus className="mr-1 md:mr-2"/>
                        Create Product
                    </motion.button>
                </Link>
            </div>

            {/* Search Bar */}
            <motion.div
                initial={{opacity: 0, y: -10}}
                animate={{opacity: 1, y: 0}}
                className="mb-4 md:mb-6"
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
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base"
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
                            <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">Logo</th>
                            <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Created At</th>
                            <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Updated At</th>
                            <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                        </thead>
                        <motion.tbody
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="bg-white divide-y divide-gray-200"
                        >
                            {productData?.map((product) => (
                                <motion.tr
                                    key={product._id}
                                    variants={rowVariants}
                                    whileHover={{scale: 1.02, backgroundColor: 'rgba(59, 130, 246, 0.05)'}}
                                    className="transition-colors duration-150"
                                >
                                    <td className="px-3 py-3 md:px-6 md:py-4 whitespace-nowrap">
                                        {product.image ? (
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="h-8 w-8 md:h-10 md:w-10 rounded-full object-cover"
                                            />
                                        ) : (
                                            <div
                                                className="flex-shrink-0 h-8 w-8 md:h-10 md:w-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                <span
                                                    className="text-blue-600 font-medium text-sm md:text-base">{product.name.charAt(0)}</span>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-3 py-3 md:px-6 md:py-4 whitespace-nowrap">
                                        <div className="text-xs md:text-sm font-medium text-gray-900">{product.name}</div>
                                    </td>
                                    <td className="px-3 py-3 md:px-6 md:py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${product.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {product.status}
                                        </span>
                                    </td>
                                    <td className="px-3 py-3 md:px-6 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500 hidden md:table-cell">
                                        {new Date(product.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-3 py-3 md:px-6 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500 hidden md:table-cell">
                                        {new Date(product.updatedAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-3 py-3 md:px-6 md:py-4 whitespace-nowrap text-xs md:text-sm font-medium">
                                        <div className="flex space-x-1 md:space-x-2">
                                            <Link to={`/update-product/${product?._id}`}>
                                                <motion.button
                                                    whileHover={{scale: 1.1}}
                                                    whileTap={{scale: 0.9}}
                                                    className="text-blue-600 hover:text-blue-900"
                                                    aria-label="Edit"
                                                >
                                                    <FaEdit className="text-sm md:text-base"/>
                                                </motion.button>
                                            </Link>

                                            <motion.button
                                                onClick={() => HandleonDelete(product?._id)}
                                                whileHover={{scale: 1.1}}
                                                whileTap={{scale: 0.9}}
                                                className="text-red-600 hover:text-red-900"
                                                aria-label="Delete"
                                            >
                                                <FaTrash className="text-sm md:text-base"/>
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

export default Product;