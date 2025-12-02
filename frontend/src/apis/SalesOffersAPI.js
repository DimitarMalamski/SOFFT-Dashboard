import axios from "axios";

const SALE_OFFERS_BASE_URL = "http://localhost:8080/api/salesoffers";

const SalesOffersAPI = {
    getSalesOffers: () => axios.get(`${SALE_OFFERS_BASE_URL}/simple`)
            .then(response => response.data.data),

    getSalesOffersPerCountry: () => axios.get(`${SALE_OFFERS_BASE_URL}/per-country`)
            .then(response => response.data.data),
};

export default SalesOffersAPI;