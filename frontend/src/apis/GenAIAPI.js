import axios from "axios";
import.meta.env.VITE_API_URL;

const BASE_URL = import.meta.env.VITE_API_URL;

const GEN_AI_BASE_URL = `${BASE_URL}/api/ai/generate-insight`;

const GenAIAPI = {
    generateInsights: () =>
        axios
            .get(GEN_AI_BASE_URL)
            .then((response) => response),
};

export default GenAIAPI;