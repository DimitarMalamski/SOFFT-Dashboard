import axios from "axios";

const OFFERS_BASE_URL = "http://localhost:8080/api/salesoffers/sales";

const OffersAPI = {
    getOffersByStatus: () =>
        axios
            .get(OFFERS_BASE_URL, { params: { statuses: ["Pending", "Declined"] } })
            .then((response) => response.data.data),
};

export default OffersAPI;