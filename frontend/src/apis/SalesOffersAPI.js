import axios from "axios";
import.meta.env.VITE_API_URL;

const BASE_URL = import.meta.env.VITE_API_URL;
const SALE_OFFERS_BASE_URL = `${BASE_URL}/api/salesoffers`;

const SalesOffersAPI = {
    getSalesOffers: () => axios.get(`${SALE_OFFERS_BASE_URL}/simple`)
            .then(response => response.data.data),

    getSalesOffersPerCountry: () => axios.get(`${SALE_OFFERS_BASE_URL}/per-country`)
            .then(response => response.data.data),
};

export default SalesOffersAPI;