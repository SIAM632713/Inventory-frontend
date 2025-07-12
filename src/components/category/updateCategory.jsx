import React, { useState } from 'react';
import {useUpdateCategoryMutation} from "@/redux/feature/categoryAPI/categoryAPI.js";
import { motion } from 'framer-motion';
import {FaImage, FaPlus} from 'react-icons/fa';
import {getBaseURL} from "@/utilitis/getBaseURL.js";
import axios from "axios";
import {useParams} from "react-router-dom";

const UpdateCategory = () => {

    const {id}=useParams()
    const [updateCategory]=useUpdateCategoryMutation()

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [inputForm, setinputForm] = useState({
        name: "",
        imageFile:"",
        status:""
    });

    const handleOnChange = (e) => {
        const { name, value, files, type } = e.target;
        if (type === 'file') {
            setinputForm(prev => ({ ...prev, imageFile: files[0] }));
        } else {
            setinputForm(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit =async (e) => {
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

            const editData={
                name:inputForm.name,
                image:imageUrl,
                status:inputForm.status,
            }

            await updateCategory({id,editData}).unwrap()
            alert("Category Updated Successfully")
            setinputForm({
                name: "",
                imageFile:"",
                status:""
            })
        }catch(err) {
            console.log(err);
        }finally {
            setIsSubmitting(false);
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
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            className="max-w-2xl mx-auto p-4 sm:p-6"
        >
            <motion.h1
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8 text-center"
            >
                Update Category
            </motion.h1>

            <motion.form
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="bg-white rounded-xl shadow-lg p-6 sm:p-8"
            >
                {/* Name Field */}
                <motion.div variants={itemVariants} className="mb-4 sm:mb-6">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Category Name
                    </label>
                    <input
                        value={inputForm.name}
                        onChange={handleOnChange}
                        type="text"
                        name="name"
                        required
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="Enter category name"
                    />
                </motion.div>

                {/* Image Upload */}
                <motion.div variants={itemVariants} className="mb-4 sm:mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category Logo
                    </label>
                    <label
                        className="flex flex-col items-center justify-center w-full h-28 sm:h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-4 sm:pt-5 pb-4 sm:pb-6">
                            <FaImage className="text-2xl sm:text-3xl text-gray-400 mb-1 sm:mb-2"/>
                            <p className="text-xs sm:text-sm text-gray-500">Click to upload logo</p>
                            <p className="text-xs text-gray-400 mt-1">PNG, JPG, SVG (MAX. 5MB)</p>
                        </div>
                        <input
                            type="file"
                            onChange={handleOnChange}
                            name="imageFile"
                            accept="image/*"
                            className="hidden"
                        />
                    </label>
                    {inputForm.imageFile && (
                        <p className="mt-2 text-xs sm:text-sm text-green-600 truncate">
                            Selected: {inputForm.imageFile.name}
                        </p>
                    )}
                </motion.div>

                {/* Status Field */}
                <motion.div variants={itemVariants} className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                    </label>
                    <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
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
                                <span className="ml-2 text-gray-700">{status}</span>
                            </label>
                        ))}
                    </div>
                </motion.div>

                <motion.div variants={itemVariants} className="flex justify-center">
                    <button
                        onClick={handleSubmit}
                        type="submit"
                        disabled={isSubmitting}
                        className={`flex items-center justify-center w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-white font-medium ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} transition-colors`}
                    >
                        {isSubmitting ? (
                            <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white"
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                            strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor"
                                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </span>
                        ) : (
                            <span className="flex items-center">
                                <FaPlus className="mr-1 sm:mr-2"/>
                                Update Category
                            </span>
                        )}
                    </button>
                </motion.div>
            </motion.form>
        </motion.div>
    );
};

export default UpdateCategory;