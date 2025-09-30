import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
    BarChart3, Tag, CheckCircle, Flag, Activity,
    Settings as SettingsIcon, ChevronsLeft, ChevronsRight, X,
} from "lucide-react";
import logo from "../assets/BAS_logo.svg";

/** Routes shown in the sidebar */
const NAV = [
    { to: "/dashboard", icon: BarChart3,  label: "Overview" },
    { to: "/offers",    icon: Tag,        label: "Offers" },
    { to: "/sales",     icon: CheckCircle,label: "Sales" },
    { to: "/geo",       icon: Flag,       label: "GEO" },
    { to: "/insights",  icon: Activity,   label: "Product insight" },
];

export default function Sidebar({ open = true, onClose = () => {} }) {
    // collapsed = thin icon rail on desktop
    const [collapsed, setCollapsed] = useState(false);

    // ESC closes on mobile
    useEffect(() => {
        if (!open) return;
        const onKey = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    const asideClasses = [
        "fixed md:relative z-30",
        collapsed ? "md:w-[64px] w-[260px]" : "w-[260px]",
        "h-[100dvh] md:h-screen top-0",
        "bg-emerald-900 text-emerald-50 border-r border-emerald-800",
        "flex flex-col",
        "transition-transform duration-200 ease-out md:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full",
    ].join(" ");

    const itemBase = "no-underline group flex items-center gap-3 outline-none";
    const itemPad  = "px-4 py-3";
    const rounding = collapsed ? "rounded-md" : "rounded-r-xl";

    return (
        <>
            {/* Mobile backdrop */}
            <div
                className={[
                    "fixed inset-0 z-20 bg-black/40 backdrop-blur-[1px] md:hidden transition-opacity",
                    open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
                ].join(" ")}
                onClick={onClose}
                aria-hidden
            />

            <aside role="navigation" aria-label="Primary" className={asideClasses}>
                {/* Header: logo + single toggle group */}
                <header className="flex items-center border-b border-emerald-800/70 h-12 px-2">
                    <div className="flex flex-1 items-center justify-center h-full translate-y-[4px]">
                        <img
                            src={logo}
                            alt="BAS World logo"
                            className="max-h-6 object-contain"
                        />
                    </div>

                    <div className="ml-auto flex items-center gap-2">
                        {/* Desktop collapse toggle (only one) */}
                        <button
                            type="button"
                            className="hidden md:inline-flex items-center justify-center h-8 w-8 rounded-md border border-emerald-700/70 hover:bg-emerald-800/50"
                            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                            aria-expanded={!collapsed}
                            onClick={() => setCollapsed(c => !c)}
                        >
                            {collapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
                        </button>

                        {/* Mobile close button */}
                        <button
                            type="button"
                            className="md:hidden inline-flex items-center justify-center h-8 w-8 rounded-md border border-emerald-700/70 hover:bg-emerald-800/50"
                            aria-label="Close menu"
                            onClick={onClose}
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                </header>

                {/* Nav */}
                <nav className="px-2 pt-2 pb-3 flex-1 space-y-1 overflow-y-auto">
                    {NAV.map(({ to, icon, label }) => {
                        const IconComp = icon;
                        const collapsedLayout = collapsed ? "justify-center px-0" : itemPad;

                        return (
                            <NavLink
                                key={to}
                                to={to}
                                onClick={onClose}
                                title={collapsed ? label : undefined}
                                className={({ isActive }) =>
                                    [
                                        itemBase,
                                        rounding,
                                        collapsedLayout,
                                        // Hover/focus styles
                                        "text-emerald-50/90 hover:text-white focus-visible:ring-2 focus-visible:ring-emerald-400/50",
                                        // Active: when expanded, show left rail; when collapsed, use background only
                                        !collapsed && "border-l-4 border-transparent hover:bg-emerald-800/50",
                                        isActive && (collapsed
                                                ? "bg-emerald-800/70 font-semibold"
                                                : "bg-emerald-800/60 border-emerald-300 font-semibold"
                                        ),
                                    ].filter(Boolean).join(" ")
                                }
                            >
                                <IconComp className="h-5 w-5 shrink-0" aria-hidden />
                                {!collapsed ? (
                                    <span className="truncate">{label}</span>
                                ) : (
                                    <span className="sr-only">{label}</span>
                                )}
                            </NavLink>
                        );
                    })}
                </nav>

                {/* Settings pinned */}
                <div className="px-2 pb-3 border-t border-emerald-800/80">
                    <NavLink
                        to="/settings"
                        onClick={onClose}
                        title={collapsed ? "Settings" : undefined}
                        className={({ isActive }) =>
                            [
                                itemBase,
                                rounding,
                                collapsed ? "justify-center px-0 mt-3" : `${itemPad} mt-3`,
                                "text-emerald-50/90 hover:text-white focus-visible:ring-2 focus-visible:ring-emerald-400/50",
                                !collapsed && "border-l-4 border-transparent hover:bg-emerald-800/50",
                                isActive && (collapsed
                                        ? "bg-emerald-800/70 font-semibold"
                                        : "bg-emerald-800/60 border-emerald-300 font-semibold"
                                ),
                            ].filter(Boolean).join(" ")
                        }
                    >
                        <SettingsIcon className="h-5 w-5 shrink-0" aria-hidden />
                        {!collapsed && <span className="truncate">Settings</span>}
                    </NavLink>
                </div>
            </aside>
        </>
    );
}