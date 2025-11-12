import { useEffect, useState } from "react";
import OffersAPI from "../apis/OffersAPI.js";
import { filterOffers } from "../utils/filterOffers.js";

export default function useOffersData() {
    const [offers, setOffers] = useState([]);
    const [filteredOffers, setFilteredOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        status: "",
        salesperson: "",
        depot: "",
    });

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                setLoading(true);
                const data = await OffersAPI.getOffersByStatus(["Pending", "Declined"]);
                setOffers(data);
                setFilteredOffers(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchOffers();
    }, []);

    useEffect(() => {
        const result = filterOffers(offers, filters);
        setFilteredOffers(result);
    }, [filters, offers]);

    return {
        offers,
        filteredOffers,
        filters,
        setFilters,
        loading,
        error,
    };
}
