import React, { useState, useEffect } from "react";
import useProducts from "../hooks/insightsPage/useProducts";
import ProductCard from "../components/Product/ProductCard";

export default function Insights() {
    const {
        products,
        loading,
        error,
        setFilters,
        loadMore,
        hasMore
    } = useProducts();

    const [searchInput, setSearchInput] = useState("");
    const [color, setColor] = useState("");
    const [classType, setClassType] = useState("");

    useEffect(() => {
        setFilters({
            name: searchInput,
            classType,
            color
        });
    }, [searchInput, classType, color]);

    return (
        <div className="p-6 text-white">
            <h1 className="text-2xl font-bold mb-4">Products</h1>

            <div className="mb-8 bg-[#046248] p-6 rounded-2xl border border-[#083d2e] shadow-md">

                <div className="flex flex-col md:flex-row gap-6 items-end">

                    <div className="w-full md:w-1/3">
                        <label className="text-sm text-gray-200 mb-1 block">Search</label>
                        <input
                            type="text"
                            placeholder="Brand or model..."
                            className="w-full px-4 py-2 rounded-lg bg-[#074f3b] text-white
                                    placeholder-gray-300 border border-[#009688]
                                    focus:outline-none focus:ring-2 focus:ring-teal-300 transition"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                    </div>

                    <div className="w-full md:w-1/4">
                        <label className="text-sm text-gray-200 mb-1 block">Class</label>
                        <select
                            className="w-full px-4 py-2 rounded-lg bg-[#074f3b] text-white
                                    border border-[#009688]
                                    focus:outline-none focus:ring-2 focus:ring-teal-300 transition"
                            value={classType}
                            onChange={(e) => setClassType(e.target.value)}
                        >
                            <option value="">All</option>
                            <option value="Truck">Truck</option>
                            <option value="Van">Van</option>
                            <option value="Trailer">Trailer</option>
                        </select>
                    </div>

                    <div className="w-full md:w-1/4">
                        <label className="text-sm text-gray-200 mb-1 block">Color</label>
                        <select
                            className="w-full px-4 py-2 rounded-lg bg-[#074f3b] text-white
                                    border border-[#009688]
                                    focus:outline-none focus:ring-2 focus:ring-teal-300 transition"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                        >
                            <option value="">All</option>
                            <option value="white">White</option>
                            <option value="black">Black</option>
                            <option value="blue">Blue</option>
                            <option value="red">Red</option>
                        </select>
                    </div>

                    <button
                        className="px-6 py-2 rounded-lg border border-[#009688] text-white
                                hover:bg-[#00695c] transition"
                        onClick={() => {
                            setSearchInput("");
                            setClassType("");
                            setColor("");
                        }}
                    >
                        Reset
                    </button>

                </div>
            </div>

            {error && (
                <div className="text-red-400 mb-4">
                    Failed to load products. Try again later.
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map(product => (
                    <ProductCard 
                        key={product.id} 
                        product={product} 
                    />
                ))}
            </div>

            {!loading && hasMore && (
                <div className="flex justify-center mt-6">
                    <button
                        onClick={loadMore}
                        className="bg-emerald-700 hover:bg-emerald-800 px-6 py-2 rounded-lg"
                    >
                        Load More
                    </button>
                </div>
            )}

            {loading && (
                <div className="text-center mt-4">Loading...</div>
            )}
        </div>
    );
}
