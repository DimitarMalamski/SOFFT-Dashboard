import mockData from "../mock-data/mock-sales-offers.json";

const MockOffersAPI = {
  getOffers: () => Promise.resolve(mockData.data)
};

export default MockOffersAPI;
