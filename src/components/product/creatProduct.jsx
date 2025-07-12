import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaImage, FaPlus } from 'react-icons/fa';
import { getBaseURL } from "@/utilitis/getBaseURL.js";
import axios from "axios";
import {useCreatProductMutation} from "@/redux/feature/productAPI/product.API.js";
import {useGetAllBrandsQuery} from "@/redux/feature/brandAPI/brandAPI.js";
import {useGetAllCategoryQuery} from "@/redux/feature/categoryAPI/categoryAPI.js";

const CreatProduct = () => {
    const [createProduct] = useCreatProductMutation();
    const { data: brandsData } = useGetAllBrandsQuery();
    const { data: categoriesData } = useGetAllCategoryQuery();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [inputForm, setInputForm] = useState({
        name: "",
        description: "",
        quantity: "",
        imageFile: "",
        status: "",
        brandID: "",
        categoryID: ""
    });

    const brands = brandsData?.data || [];
    const categories = categoriesData?.data || [];

    const handleOnChange = (e) => {
        const { name, value, files, type } = e.target;
        if (type === 'file') {
            setInputForm(prev => ({ ...prev, imageFile: files[0] }));
        } else {
            setInputForm(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            let imageUrl = "";

            if (inputForm.imageFile) {
                const formData = new FormData();
                formData.append("image", inputForm.imageFile);

                const imageUploadResponse = await axios.post(`${getBaseURL()}/api/upload`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });

                imageUrl = imageUploadResponse.data.url;
            }

            const newProduct = {
                name: inputForm.name,
                description: inputForm.description,
                quantity: Number(inputForm.quantity),
                image: imageUrl,
                status: inputForm.status,
                brandID: inputForm.brandID,
                categoryID: inputForm.categoryID
            };

            await createProduct(newProduct).unwrap();
            alert("Product Created Successfully");

            setInputForm({
                name: "",
                description: "",
                quantity: "",
                imageFile: "",
                status: "",
                brandID: "",
                categoryID: ""
            });

        } catch (err) {
            console.log(err);
            alert("Error creating product");
        } finally {
            setIsSubmitting(false);
        }
    };

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

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-2xl mx-auto p-4 md:p-6"
        >
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8 text-center"
            >
                Create New Product
            </motion.h1>

            <motion.form
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                onSubmit={handleSubmit}
                className="bg-white rounded-xl shadow-lg p-4 md:p-8"
            >
                {/* Name Field */}
                <motion.div variants={itemVariants} className="mb-4 md:mb-6">
                    <label htmlFor="name" className="block text-sm md:text-base font-medium text-gray-700 mb-1 md:mb-2">
                        Product Name
                    </label>
                    <input
                        value={inputForm.name}
                        onChange={handleOnChange}
                        type="text"
                        name="name"
                        required
                        className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm md:text-base"
                        placeholder="Enter product name"
                    />
                </motion.div>

                {/* Description Field */}
                <motion.div variants={itemVariants} className="mb-4 md:mb-6">
                    <label htmlFor="description" className="block text-sm md:text-base font-medium text-gray-700 mb-1 md:mb-2">
                        Description
                    </label>
                    <textarea
                        value={inputForm.description}
                        onChange={handleOnChange}
                        name="description"
                        className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm md:text-base"
                        placeholder="Enter product description"
                        rows="3"
                    />
                </motion.div>

                {/* Quantity Field */}
                <motion.div variants={itemVariants} className="mb-4 md:mb-6">
                    <label htmlFor="quantity" className="block text-sm md:text-base font-medium text-gray-700 mb-1 md:mb-2">
                        Quantity
                    </label>
                    <input
                        value={inputForm.quantity}
                        onChange={handleOnChange}
                        type="number"
                        name="quantity"
                        min="0"
                        required
                        className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm md:text-base"
                        placeholder="Enter quantity"
                    />
                </motion.div>

                {/* Image Upload */}
                <motion.div variants={itemVariants} className="mb-4 md:mb-6">
                    <label className="block text-sm md:text-base font-medium text-gray-700 mb-1 md:mb-2">
                        Product Image
                    </label>
                    <label className="flex flex-col items-center justify-center w-full h-28 md:h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-4 pb-5 md:pt-5 md:pb-6">
                            <FaImage className="text-2xl md:text-3xl text-gray-400 mb-1 md:mb-2" />
                            <p className="text-xs md:text-sm text-gray-500">Click to upload image</p>
                            <p className="text-xs text-gray-400">PNG, JPG, SVG (MAX. 5MB)</p>
                        </div>
                        <input
                            type="file"
                            onChange={handleOnChange}
                            name="imageFile"
                            accept="image/*"
                            className="hidden"
                        />
                    </label>
                </motion.div>

                {/* Status Field */}
                <motion.div variants={itemVariants} className="mb-4 md:mb-6">
                    <label className="block text-sm md:text-base font-medium text-gray-700 mb-1 md:mb-2">
                        Status
                    </label>
                    <div className="flex space-x-3 md:space-x-4">
                        {['Active', 'Inactive'].map((status) => (
                            <label key={status} className="flex items-center">
                                <input
                                    type="radio"
                                    name="status"
                                    value={status}
                                    checked={inputForm.status === status}
                                    onChange={handleOnChange}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="ml-1 md:ml-2 text-sm md:text-base text-gray-700">{status}</span>
                            </label>
                        ))}
                    </div>
                </motion.div>

                {/* Brand Selection */}
                <motion.div variants={itemVariants} className="mb-4 md:mb-6">
                    <label className="block text-sm md:text-base font-medium text-gray-700 mb-1 md:mb-2">
                        Brand
                    </label>
                    <select
                        value={inputForm.brandID}
                        onChange={handleOnChange}
                        name="brandID"
                        required
                        className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm md:text-base"
                    >
                        <option value="">Select a brand</option>
                        {brands.map(brand => (
                            <option key={brand._id} value={brand._id}>{brand.name}</option>
                        ))}
                    </select>
                </motion.div>

                {/* Category Selection */}
                <motion.div variants={itemVariants} className="mb-4 md:mb-6">
                    <label className="block text-sm md:text-base font-medium text-gray-700 mb-1 md:mb-2">
                        Category
                    </label>
                    <select
                        value={inputForm.categoryID}
                        onChange={handleOnChange}
                        name="categoryID"
                        required
                        className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm md:text-base"
                    >
                        <option value="">Select a category</option>
                        {categories.map(category => (
                            <option key={category._id} value={category._id}>{category.name}</option>
                        ))}
                    </select>
                </motion.div>

                <motion.div variants={itemVariants} className="flex justify-center">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`flex items-center px-4 py-2 md:px-6 md:py-3 rounded-lg text-white font-medium text-sm md:text-base ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} transition-colors`}
                    >
                        {isSubmitting ? (
                            <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-2 md:mr-3 h-4 w-4 md:h-5 md:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </span>
                        ) : (
                            <span className="flex items-center">
                                <FaPlus className="mr-1 md:mr-2" />
                                Create Product
                            </span>
                        )}
                    </button>
                </motion.div>
            </motion.form>
        </motion.div>
    );
};

export default CreatProduct;