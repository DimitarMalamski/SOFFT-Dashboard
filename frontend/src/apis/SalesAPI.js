import axios from "axios";

const SALES_BASE_URL = "http://localhost:8080/api/salesoffers/sales";

const SalesAPI = {
    getAllSales: async (statuses = ["Approved", "Completed"]) => {
        try {
            const params = new URLSearchParams();
            statuses.forEach(status => params.append("statuses", status));

            const response = await axios.get(`${SALES_BASE_URL}?${params.toString()}`);
            return response.data.data;
        } catch (error) {
            console.error("Error fetching sales data:", error);
            throw error;
        }
    },
};

export default SalesAPI;