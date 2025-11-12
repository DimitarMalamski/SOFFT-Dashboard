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
        setLoading(true);
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
                    if (offer.ssalesPerso?.[0]?.name)
                        sets.salesmen.add(offer.salesPerson[0].name);

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
            .catch((err) => {
                console.error("Error fetching offers:", err);
                setError(err);
                setOffers([]);
                setFilteredOffers([]);
                setOptions({ salesmen: [], productTypes: [], brands: [], incoterms: [], countries: [] });
            })
            .finally(() => setLoading(false));
    }, []);

    // --- Apply filters ---
    const applyFilters = () => {
        const filtered = filterOffersOverview(offers, filters);
        setFilteredOffers(filtered);
    };

    const { productType } = filters;

    // --- handle brand reset when productType changes ---
    useEffect(() => {
        setFilters((prev) => ({ ...prev, brand: "" }));
    }, [productType]);

    return {
        offers,
        filteredOffers,
        filters,
        setFilters,
        options,
        applyFilters,
        loading,
        error
    };
}