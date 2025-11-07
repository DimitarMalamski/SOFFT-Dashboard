package nl.fontys.s3.my_app.Services;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import nl.fontys.s3.my_app.models.dtos.SalesOffer.SalesOfferDTO;

import java.util.List;
import java.util.Map;

@Service
public class AIService {

        private final RestTemplate restTemplate = new RestTemplate();

        private SalesOfferService salesOfferService;

        public AIService(SalesOfferService salesOfferService) {
            this.salesOfferService = salesOfferService;
        }

        public List<SalesOfferDTO> fetchData() {
            List<SalesOfferDTO> dtos = salesOfferService.getAllSalesOffersDTO();
		    return dtos;
	    }

        public String generateInsight() {

            List<SalesOfferDTO> dtos = fetchData();

            String prompt = "You are an AI agent used in a project created for BAS World company. Your role is to generate useful insights in text format, for salesman who will be using our dashboard. You will be provided with a set of data for the past 7 days." + dtos.toString() + " Based on this data, provide a concise insight that can help the salesman improve their sales strategies. Focus on trends, anomalies, or opportunities that can be leveraged. Keep the response under 100 words.";

            Map<String, Object> request = Map.of(
                "model", "mistral",
                "prompt", prompt,
                "stream", false
            );

            ResponseEntity<String> response = restTemplate.postForEntity(
                "http://localhost:11434/api/generate", request, String.class
            );

            String body = response.getBody();
            if (body == null) {
                return "No response from AI service.";
            }

            String[] lines = body.split("\n");
            String lastLine = lines[lines.length - 1];

            try {
                ObjectMapper mapper = new ObjectMapper();
                JsonNode json = mapper.readTree(lastLine);
                return json.has("response") ? json.get("response").asText() : body;
            } catch (Exception e) {
                return "Error parsing AI response: " + e.getMessage();
            }
        }
}
