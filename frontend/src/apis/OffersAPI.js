import axios from "axios";
import.meta.env.VITE_API_URL;

const BASE_URL = import.meta.env.VITE_API_URL;
const OFFERS_BASE_URL = `${BASE_URL}/api/salesoffers/sales`;

const OffersAPI = {
    getOffersByStatus: () =>
        axios
            .get(OFFERS_BASE_URL, { params: { statuses: ["Pending", "Declined"] } })
            .then((response) => response.data.data),
};

export default OffersAPI;