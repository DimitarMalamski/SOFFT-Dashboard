import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";

export default function Layout() {
    const [open, setOpen] = useState(true);
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="flex flex-col h-dvh bg-emerald-950 text-emerald-50 overflow-hidden">
            {/* Header */}
            <Header title="OVERVIEW" userName="John Doe" />

            {/* Sidebar + Main Content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <Sidebar
                    open={open}
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    onClose={() => setOpen(false)}
                />

                {/* Main */}
                <main
                    id="main"
                    className="flex-1 overflow-y-auto transition-all duration-300 ease-in-out p-6"
                >
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
