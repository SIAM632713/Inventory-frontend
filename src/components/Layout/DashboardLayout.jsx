import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Layout/Sidebar.jsx";
import Header from "@/components/Layout/Header.jsx";

const DashboardLayout = () => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Mobile sidebar toggle would go here */}
            <Sidebar />
            <div className="flex-1 overflow-x-hidden">
                <Header />
                <main className="p-4 md:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;