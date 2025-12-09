import { useEffect, useState } from "react";
import SalesOffersAPI from "../../apis/SalesOffersAPI.js";
import { filterOffersOverview } from "../../utils/overviewPage/filterOffersOverview.js";

export default function useOffersDataOverview() {
    // --- state ---
    const [offers, setOffers] = useState([]);
    const [filteredOffers, setFilteredOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [filters, setFilters] = useState({
        dateRange: "",
        startDate: null,
        endDate: null,
        salesmen: [],
        countries: [],
        productTypes: [],
        brands: [],
        incoterms: [],
    });

    const [options, setOptions] = useState({
        salesmen: [],
        productTypes: [],
        brands: [],
        incoterms: [],
        countries: [],
    });

    useEffect(() => {
        setLoading(true);
        SalesOffersAPI.getSalesOffers()
            .then((data) => {
                console.log("🔥 Incoming offer sample:", data[0]);
                setOffers(data);
                setFilteredOffers(data);

                const sets = {
                    salesmen: new Set(),
                    productTypes: new Set(),
                    brands: new Set(),
                    incoterms: new Set(),
                    countries: new Set(),
                };

                data.forEach((offer) => {
                    offer.salesPerson?.forEach((p) => {
                        const name = p.name?.trim();
                        if (name) sets.salesmen.add(name);
                    });

                    offer.salesOfferLine?.forEach((line) => {
                        if (line.product?.productType)
                            sets.productTypes.add(line.product.productType.toUpperCase());

                        if (line.product?.brand)
                            sets.brands.add(line.product.brand.toUpperCase());

                        if (line.delivery?.incoterm)
                            sets.incoterms.add(line.delivery.incoterm.toUpperCase());

                        if (line.delivery?.destinationCountryCode)
                            sets.countries.add(line.delivery.destinationCountryCode);
                    });
                });

                setOptions({
                    salesmen: [...sets.salesmen],
                    productTypes: [...sets.productTypes],
                    brands: [...sets.brands],
                    incoterms: [...sets.incoterms],
                    countries: [...sets.countries],
                });
            })
            .catch((err) => {
                setError(err);
                setOffers([]);
                setFilteredOffers([]);
            })
            .finally(() => setLoading(false));
    }, []);

    const applyFilters = () => {
        const filtered = filterOffersOverview(offers, filters);
        setFilteredOffers(filtered);
    };

    const resetFilter = () => {
        setFilters({
            dateRange: "",
            startDate: null,
            endDate: null,
            salesmen: [],
            countries: [],
            productTypes: [],
            brands: [],
            incoterms: [],
        });

        setFilteredOffers(offers);
    };

    // const { productType } = filters;
    //
    // // --- handle brand reset when productType changes ---
    // useEffect(() => {
    //     setFilters((prev) => ({ ...prev, brand: "" }));
    // }, [productType]);

    return {
        offers,
        filteredOffers,
        filters,
        setFilters,
        options,
        applyFilters,
        resetFilter,
        loading,
        error
    };
}