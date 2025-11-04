import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function FilterBar({ filters, setFilters, options, applyFilters }) {
    return (
        <div className="flex flex-wrap items-center gap-3 mb-4">
            {/* Date range selectors */}
            <div className="flex items-center gap-2 flex-1">
                <DatePicker
                    selected={filters.startDate}
                    onChange={(date) => setFilters({ ...filters, startDate: date })}
                    selectsStart
                    startDate={filters.startDate}
                    endDate={filters.endDate}
                    placeholderText="Start date"
                    className="w-full bg-emerald-950 text-white border border-emerald-700 rounded-md px-3 py-2"
                />
                <DatePicker
                    selected={filters.endDate}
                    onChange={(date) => setFilters({ ...filters, endDate: date })}
                    selectsEnd
                    startDate={filters.startDate}
                    endDate={filters.endDate}
                    minDate={filters.startDate}
                    placeholderText="End date"
                    className="w-full bg-emerald-950 text-white border border-emerald-700 rounded-md px-3 py-2"
                />
            </div>

            {/* Country */}
            <div className="flex-1">
                <select
                    value={filters.country}
                    onChange={(e) => setFilters({ ...filters, country: e.target.value })}
                    className="w-full bg-emerald-950 text-white border border-emerald-700 rounded-md px-3 py-2"
                >
                    <option value="">All Countries</option>
                    {options.countries.map((c) => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
            </div>

            {/* Product Type */}
            <div className="flex-1">
                <select
                    value={filters.productType}
                    onChange={(e) => setFilters({ ...filters, productType: e.target.value })}
                    className="w-full bg-emerald-950 text-white border border-emerald-700 rounded-md px-3 py-2"
                >
                    <option value="">All Types</option>
                    {options.productTypes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                    ))}
                </select>
            </div>

            {/* Brand */}
            <div className="flex-1">
                <select
                    disabled={!filters.productType && options.brands.length === 0}
                    value={filters.brand}
                    onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
                    className={`w-full bg-emerald-950 text-white border border-emerald-700 rounded-md px-3 py-2 ${
                        !filters.productType && options.brands.length === 0
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                    }`}
                >
                    <option value="">All Brands</option>
                    {options.brands.map((b) => (
                        <option key={b} value={b}>{b}</option>
                    ))}
                </select>
            </div>

            {/* Salesman */}
            <div className="flex-1">
                <select
                    value={filters.salesman}
                    onChange={(e) => setFilters({ ...filters, salesman: e.target.value })}
                    className="w-full bg-emerald-950 text-white border border-emerald-700 rounded-md px-3 py-2"
                >
                    <option value="">All Salesmen</option>
                    {options.salesmen.map((s) => (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </select>
            </div>

            {/* Incoterm */}
            <div className="flex-1">
                <select
                    value={filters.incoterm}
                    onChange={(e) => setFilters({ ...filters, incoterm: e.target.value })}
                    className="w-full bg-emerald-950 text-white border border-emerald-700 rounded-md px-3 py-2"
                >
                    <option value="">All Incoterms</option>
                    {options.incoterms.map((i) => (
                        <option key={i} value={i}>{i}</option>
                    ))}
                </select>
            </div>

            {/* Apply Button */}
            <button
                onClick={applyFilters}
                className="bg-emerald-700 text-white px-3 py-2 rounded-md hover:bg-emerald-600 transition"
            >
                Apply
            </button>
        </div>
    );
}
