import { useEffect, useState } from "react";
import SalesOffersAPI from "../apis/SalesOffersAPI.js";

export default function useOffersData() {
    // --- state ---
    const [offers, setOffers] = useState([]);
    const [filteredOffers, setFilteredOffers] = useState([]);

    const [filters, setFilters] = useState({
        dateRange: "",
        startDate: null,
        endDate: null,
        productType: "",
        brand: "",
        salesman: "",
        incoterm: "",
        country: "",
    });

    const [options, setOptions] = useState({
        salesmen: [],
        productTypes: [],
        brands: [],
        incoterms: [],
        countries: [],
    });

    // --- Fetch data on mount ---
    useEffect(() => {
        SalesOffersAPI.getSalesOffers()
            .then((data) => {
                setOffers(data);
                setFilteredOffers(data);

                // extract unique dropdown values
                const sets = {
                    salesmen: new Set(),
                    productTypes: new Set(),
                    brands: new Set(),
                    incoterms: new Set(),
                    countries: new Set(),
                };

                data.forEach((offer) => {
                    if (offer.salesPersons?.[0]?.name)
                        sets.salesmen.add(offer.salesPersons[0].name);

                    if (offer.salesOfferLine?.[0]?.product?.productType)
                        sets.productTypes.add(
                            offer.salesOfferLine[0].product.productType.toUpperCase()
                        );

                    if (offer.salesOfferLine?.[0]?.product?.brand)
                        sets.brands.add(offer.salesOfferLine[0].product.brand.toUpperCase());

                    if (offer.salesOfferLine?.[0]?.delivery?.incoterm)
                        sets.incoterms.add(
                            offer.salesOfferLine[0].delivery.incoterm.toUpperCase()
                        );

                    if (offer.salesOfferLine?.[0]?.delivery?.destinationCountryCode)
                        sets.countries.add(
                            offer.salesOfferLine[0].delivery.destinationCountryCode
                        );
                });

                setOptions({
                    salesmen: [...sets.salesmen],
                    productTypes: [...sets.productTypes],
                    brands: [...sets.brands],
                    incoterms: [...sets.incoterms],
                    countries: [...sets.countries],
                });
            })
            .catch((err) => console.error("Error fetching offers:", err));
    }, []);

    // --- Apply filters ---
    const applyFilters = () => {
        const filtered = offers.filter((offer) => {
            const matchesSalesman =
                !filters.salesman ||
                offer.salesPersons?.some((p) =>
                    p.name?.toLowerCase().includes(filters.salesman.toLowerCase())
                );

            const matchesProductType =
                !filters.productType ||
                offer.salesOfferLine?.some((line) =>
                    line.product?.productType
                        ?.toLowerCase()
                        .includes(filters.productType.toLowerCase())
                );

            const matchesBrand =
                !filters.brand ||
                offer.salesOfferLine?.some((line) =>
                    line.product?.brand
                        ?.toLowerCase()
                        .includes(filters.brand.toLowerCase())
                );

            const matchesIncoterm =
                !filters.incoterm ||
                offer.salesOfferLine?.some((line) =>
                    line.delivery?.incoterm
                        ?.toUpperCase()
                        .includes(filters.incoterm.toUpperCase())
                );

            const matchesCountry =
                !filters.country ||
                offer.salesOfferLine?.some((line) =>
                    line.delivery?.destinationCountryCode
                        ?.toUpperCase()
                        .includes(filters.country.toUpperCase())
                );

            let matchesDate = true;
            const offerDate = offer.expiresAt ? new Date(offer.expiresAt) : null;

            if (filters.startDate && filters.endDate && offerDate) {
                matchesDate =
                    offerDate >= new Date(filters.startDate) &&
                    offerDate <= new Date(filters.endDate);
            } else if (filters.dateRange && offerDate) {
                const now = new Date();
                const days = parseInt(filters.dateRange.replace("d", ""), 10);
                const cutoff = new Date(now.setDate(now.getDate() - days));
                matchesDate = offerDate >= cutoff;
            }

            return (
                matchesSalesman &&
                matchesProductType &&
                matchesBrand &&
                matchesIncoterm &&
                matchesCountry &&
                matchesDate
            );
        });

        setFilteredOffers(filtered);
    };

    // --- handle brand reset when productType changes ---
    useEffect(() => {
        setFilters((prev) => ({ ...prev, brand: "" }));
    }, [filters.productType]);

    return {
        offers,
        filteredOffers,
        filters,
        setFilters,
        options,
        applyFilters,
    };
}