import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";

export default function Layout() {
    const [open, setOpen] = useState(true);

    return (
        <div className="min-h-screen grid grid-cols-[260px_1fr] bg-emerald-950 text-state-100">
            <Sidebar open={open} onClose={() => setOpen(false)} />
            <div className="flex flex-col min-w-0">
                {/* Top bar */}
                <main className="p-4">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}