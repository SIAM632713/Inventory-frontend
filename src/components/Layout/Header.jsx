import React from "react";
import { motion } from "framer-motion";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "@/context/authContext.jsx";

const Header = () => {
    const navigate = useNavigate();
    const {user, loading, Logout} = useAuth();

    const HandleUserLogout = async () => {
        try {
            await Logout()
            alert("Logout successfully");
            navigate("/login")
        } catch(error) {
            console.log(error);
        }
    }

    if (loading) {
        return (
            <div className="bg-white shadow-sm px-4 py-3 md:px-6 flex justify-between items-center">
                <h2 className="text-lg md:text-xl font-bold text-gray-800">Dashboard</h2>
                <span className="text-sm text-gray-500">Loading...</span>
            </div>
        );
    }

    return (
        <div className="bg-white shadow-sm px-4 py-3 md:px-6 flex flex-col md:flex-row justify-between items-center gap-3">
            <motion.h2
                className="text-lg md:text-xl font-bold text-gray-800 w-full md:w-auto"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                Dashboard
            </motion.h2>

            <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto justify-end">
                {user ? (
                    <>
                        <motion.input
                            type="text"
                            placeholder="Search..."
                            className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1 md:flex-none md:w-64"
                            initial={{opacity: 0, y: -10}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.4, delay: 0.1}}
                        />
                        <div className="flex items-center gap-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <motion.img
                                        src="https://i.pravatar.cc/40"
                                        alt="Avatar"
                                        className="w-8 h-8 md:w-9 md:h-9 rounded-full cursor-pointer"
                                        initial={{opacity: 0, y: -10}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{duration: 0.4, delay: 0.3}}
                                    />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-white shadow-md rounded-md py-2 px-2 w-44 border z-50">
                                    <DropdownMenuLabel className="text-gray-500 px-2">My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator className="border-gray-200"/>
                                    <DropdownMenuItem className="hover:bg-gray-100 px-2 py-1 rounded">Profile</DropdownMenuItem>
                                    <DropdownMenuItem className="hover:bg-gray-100 px-2 py-1 rounded">Settings</DropdownMenuItem>
                                    <DropdownMenuItem className="hover:bg-gray-100 px-2 py-1 rounded text-red-500">Logout</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <motion.button
                                onClick={HandleUserLogout}
                                className="px-3 py-1 md:px-4 md:py-2 bg-blue-500 text-white hover:bg-white hover:text-black hover:border rounded-2xl text-sm md:text-base"
                                initial={{opacity: 0, y: -10}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.4, delay: 0.1}}
                            >
                                LogOut
                            </motion.button>
                        </div>
                    </>
                ) : (
                    <div className="flex gap-2">
                        <Link to="/register">
                            <motion.button
                                className="px-3 py-1 md:px-4 md:py-2 bg-blue-500 text-white hover:bg-white hover:text-black hover:border rounded-2xl text-sm md:text-base"
                                initial={{opacity: 0, y: -10}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.4, delay: 0.1}}
                            >
                                Register
                            </motion.button>
                        </Link>
                        <Link to="/login">
                            <motion.button
                                className="px-3 py-1 md:px-4 md:py-2 bg-blue-500 text-white hover:bg-white hover:text-black hover:border rounded-2xl text-sm md:text-base"
                                initial={{opacity: 0, y: -10}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.4, delay: 0.1}}
                            >
                                Login
                            </motion.button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;