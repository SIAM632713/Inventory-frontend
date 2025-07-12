import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBoxes, FaTags, FaThList, FaBars, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";

const links = [
    { path: "/", label: "Product", icon: <FaBoxes /> },
    { path: "/brand", label: "Brand", icon: <FaTags /> },
    { path: "/category", label: "Category", icon: <FaThList /> },
];

const Sidebar = () => {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <>
            {/* Mobile menu button */}
            <button
                className="md:hidden fixed bottom-4 right-4 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>

            {/* Sidebar */}
            <div className={`fixed md:static inset-y-0 left-0 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out z-40 w-64 min-h-screen bg-[#111827] text-white shadow-lg px-4 py-6`}>
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-2xl font-semibold mb-10 pl-2 tracking-wide"
                >
                    D-inventy
                </motion.div>

                <nav className="flex flex-col gap-2">
                    {links.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-2 rounded-md transition-all ${
                                    isActive ? "bg-blue-600 text-white" : "hover:bg-[#1f2937] text-gray-300"
                                }`
                            }
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.icon}
                            <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                {link.label}
                            </motion.span>
                        </NavLink>
                    ))}
                </nav>
            </div>
        </>
    );
};

export default Sidebar;