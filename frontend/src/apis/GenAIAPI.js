import axios from "axios";

const GEN_AI_BASE_URL = "http://localhost:8080/api/ai/generate-insight";

const GenAIAPI = {
    generateInsights: () =>
        axios
            .get(GEN_AI_BASE_URL)
            .then((response) => response),
};

export default GenAIAPI;