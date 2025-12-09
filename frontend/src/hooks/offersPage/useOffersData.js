import { useEffect, useState } from "react";
import OffersAPI from "../../apis/OffersAPI.js";

export default function useOffersData() {
    const [offers, setOffers] = useState([]);
    const [filteredOffers, setFilteredOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    return {
        offers,
        filteredOffers,
        setFilteredOffers,
        loading,
        error,
    };
}
