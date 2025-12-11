import axios from "axios";
import.meta.env.VITE_API_URL;

const BASE_URL = import.meta.env.VITE_API_URL;

const GEN_AI_BASE_URL = `${BASE_URL}/api/ai`;

const GenAIAPI = {
    generateInsights: () =>
        axios
            .get(GEN_AI_BASE_URL + "/generate-insight")
            .then((response) => response),
    sendMessage: (message) =>
        axios
            .post(GEN_AI_BASE_URL, message)
            .then((response) => response.data),
};

export default GenAIAPI;