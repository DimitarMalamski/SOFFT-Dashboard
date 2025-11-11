import axios from "axios";

const SALES_BASE_URL = "http://localhost:8080/api/salesoffers/sales";

const SalesAPI = {
    getAllSales: () =>
        axios
            .get(SALES_BASE_URL)
            .then(response => response.data.data),
};

export default SalesAPI;