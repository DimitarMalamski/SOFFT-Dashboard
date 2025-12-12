import React from "react";

export default function ProductCard({ product }) {
    const address = product.location?.address;

    return (
        <div className="bg-emerald-800 rounded-xl p-4 shadow hover:shadow-xl transition-all duration-300">

            <h2 className="text-lg font-semibold leading-tight">
                {product.brand} {product.model}
            </h2>
            <p className="text-sm opacity-80 mb-2">{product.productType}</p>

            <div className="text-sm space-y-1">
                <p><strong>Color:</strong> {product.color}</p>
                <p><strong>Mileage:</strong> {product.mileage} km</p>
                <p><strong>Engine Power:</strong> {product.enginePower} HP</p>
            </div>

            <hr className="my-3 border-white/10" />

            <div className="text-sm">
                <p className="font-semibold">Seller:</p>
                <p>{product.seller?.companyName}</p>
                <p>Depot: {product.seller?.depotId}</p>
            </div>

            {address && (
                <>
                    <hr className="my-3 border-white/10" />
                    <p className="text-sm font-semibold">Address:</p>
                    <p className="text-sm">{address.street}</p>
                    <p className="text-sm">{address.city}</p>
                    <p className="text-sm">{address.zipCode}</p>
                </>
            )}
        </div>
    );
}
