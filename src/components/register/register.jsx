import React, {useState} from "react";
import { motion } from "framer-motion";
import { FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";
import {useAuth} from "@/context/authContext.jsx";
import {Link, useNavigate} from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const {signupWithEmail}=useAuth()

    const HandleonSubmmit=async (e) => {
        e.preventDefault();
        try {
            await signupWithEmail(email, password);
            alert("Sign up successfully");
            setEmail("")
            setPassword("")
            navigate('/login')
        }catch(err){
            console.log(err);
        }
    }

    return (
        <motion.div
            className="flex justify-center items-center min-h-screen bg-gray-100 px-4 py-8"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 60, damping: 15, duration: 0.8 }}
        >
            <motion.div
                className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-md"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 80,
                    damping: 18,
                    delay: 0.3
                }}
            >
                <h2 className="text-xl sm:text-2xl font-semibold text-center mb-6">
                    Please Register
                </h2>

                <form className="space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <label className="block text-sm font-medium mb-1">Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <label className="block text-sm font-medium mb-1">Password:</label>
                        <input
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            type="password"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                        />
                    </motion.div>

                    <motion.button
                        onClick={HandleonSubmmit}
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        Sign up
                    </motion.button>
                </form>

                <motion.div
                    className="my-4 text-center text-gray-500 text-sm sm:text-base"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                >
                    Or sign-up with
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                    <motion.button
                        className="flex items-center justify-center w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition text-sm sm:text-base"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                    >
                        <FaGoogle className="mr-1 sm:mr-2" /> Google
                    </motion.button>

                    <motion.button
                        className="flex items-center justify-center w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-900 transition text-sm sm:text-base"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                    >
                        <FaGithub className="mr-1 sm:mr-2" /> GitHub
                    </motion.button>

                    <motion.button
                        className="flex items-center justify-center w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition text-sm sm:text-base"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.0 }}
                    >
                        <FaFacebook className="mr-1 sm:mr-2" /> Facebook
                    </motion.button>
                </div>

                <motion.div
                    className="mt-6 text-center text-xs sm:text-sm text-gray-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1 }}
                >
                    Have an account?{" "}
                    <Link to="/login" className="text-blue-600 hover:underline">
                        Login
                    </Link>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default Register;