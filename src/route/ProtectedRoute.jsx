import React from 'react';
import {useAuth} from "@/context/authContext.jsx";
import {Navigate} from "react-router-dom";

const ProtectedRoute = ({children}) => {

    const {user,loading}=useAuth()

    if(loading){
        return <div className="text-center py-10 text-lg">Loading...</div>;
    }

    if(!user){
        return <Navigate to="/login" replace />
    }
    return children
};

export default ProtectedRoute;