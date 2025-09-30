import axios from "axios";

const OFFERS_BASE_URL = "http://localhost:8080/offers";

const OffersAPI = {
    getOffersBySearchQuery: (searchQuery = "") =>
        axios
            .get(OFFERS_BASE_URL, {params: {searchQuery}})
            .then(response => response.data.offers),
    getOffers: () => axios.get(`${OFFERS_BASE_URL}`)
            .then(response => response.data.offers),
};

export default OffersAPI;


// This is an example implementation of a module responsible for communication with the backend API to fetch offers.