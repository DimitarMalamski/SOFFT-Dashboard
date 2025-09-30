import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
    BarChart3,
    Tag,
    CheckCircle,
    Flag,
    Activity,
    Settings as SettingsIcon,
    ChevronsLeft,
    ChevronsRight,
    X,
} from "lucide-react";
import logo from "../assets/BAS_logo.svg";

/**
 * Props:
 *  - open: boolean
 *  - onClose: () => void
 */

const NAV = [
    { to: "/dashboard", icon: BarChart3, label: "Overview" },
    { to: "/offers", icon: Tag, label: "Offers" },
    { to: "/sales", icon: CheckCircle, label: "Sales" },
    { to: "/geo", icon: Flag, label: "GEO" },
    { to: "/insights", icon: Activity, label: "Product insight" },
];

export default function Sidebar({ open = true, onClose = () => {} }) {
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        if (!open) return;
        const onKey = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    const asideClasses = [
        "fixed md:relative z-30",
        // width: full on mobile; collapsible on md+
        collapsed ? "md:w-[84px] w-[260px]" : "w-[260px]",
        "h-[100dvh] md:h-screen",
        "top-0",
        "bg-emerald-900 text-emerald-50 border-r border-emerald-800",
        "flex flex-col",
        "transition-transform duration-200 ease-out md:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full",
    ].join(" ");

    const itemBase = "no-underline group flex items-center gap-3 rounded-r-xl outline-none";
    const itemPad = "px-4 py-3";
    const itemFx   = "text-emerald-50/90 hover:text-white hover:bg-emerald-800/50 border-l-4 border-transparent focus-visible:ring-2 focus-visible:ring-emerald-400/50";

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
                {/* Header: Logo + toggles */}
                <header className="flex items-center justify-between border-b border-emerald-800/70 px-3 py-2">
                    <div className="flex items-center gap-2 min-w-0">
                        <img
                            src={logo}
                            alt="Logo"
                            className={collapsed ? "h-6 w-6 object-contain" : "h-7 w-auto object-contain"}
                        />
                    </div>

                    {/* Desktop collapse toggle */}
                    <button
                        type="button"
                        className="hidden md:inline-flex items-center justify-center rounded-md border border-emerald-700/70 px-2 py-1 hover:bg-emerald-800/50"
                        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                        aria-expanded={!collapsed}
                        onClick={() => setCollapsed(c => !c)}
                    >
                        {collapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
                    </button>

                    {/* Mobile close button (uses existing prop) */}
                    <button
                        type="button"
                        className="md:hidden inline-flex items-center justify-center rounded-md border border-emerald-700/70 px-2 py-1 hover:bg-emerald-800/50"
                        aria-label="Close menu"
                        onClick={onClose}
                    >
                        <X className="h-4 w-4" />
                    </button>
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
                                className={({ isActive }) =>
                                    [
                                        itemBase,
                                        collapsedLayout,
                                        itemFx,
                                        isActive && "bg-emerald-800/60 border-emerald-300 font-semibold",
                                    ]
                                        .filter(Boolean)
                                        .join(" ")
                                }
                            >
                                <IconComp className="h-5 w-5 shrink-0" aria-hidden />
                                {!collapsed && <span className="truncate">{label}</span>}
                            </NavLink>
                        );
                    })}
                </nav>

                {/* Settings pinned */}
                <div className="px-2 pb-3 border-t border-emerald-800/80">
                    <NavLink
                        to="/settings"
                        onClick={onClose}
                        className={({ isActive }) =>
                            [
                                itemBase,
                                collapsed ? "justify-center px-0 mt-3" : `${itemPad} mt-3`,
                                itemFx,
                                isActive && "bg-emerald-800/60 border-emerald-300 font-semibold",
                            ]
                                .filter(Boolean)
                                .join(" ")
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