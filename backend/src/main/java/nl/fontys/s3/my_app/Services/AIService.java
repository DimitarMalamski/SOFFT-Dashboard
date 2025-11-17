package nl.fontys.s3.my_app.Services;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import nl.fontys.s3.my_app.models.dtos.SalesOffer.SalesOfferDTO;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
public class AIService {

    private final RestTemplate restTemplate = new RestTemplate();

    private final SalesOfferService salesOfferService;

    public AIService(SalesOfferService salesOfferService) {
            this.salesOfferService = salesOfferService;
    }

    public List<SalesOfferDTO> fetchData(int daysBack) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime start = now.minusDays(daysBack);
        return salesOfferService.getSalesOffersBetween(start, now);
    }

    public String generateInsight() {

        List<SalesOfferDTO> dtos = fetchData(30);

        ObjectMapper mapper = new ObjectMapper();
        String dataJson = "";
        try {
            dataJson = mapper.writeValueAsString(dtos);
        } catch (Exception e) {
            e.printStackTrace();
        }

        String prompt = """
            You are an AI agent used in a project created for BAS World company.
            Your role is to generate useful insights in text format for the salesman dashboard.
            You will be provided with historical sales data (past 30 days) in JSON format.
            Based on this data, provide a concise, actionable insight highlighting:
            - trends,
            - anomalies,
            - missing values,
            - opportunities to improve sales strategies.
            Keep the response under 500 words.
            Here is the data:
            %s
        """.formatted(dataJson);

        ResponseEntity<String> response = restTemplate.postForEntity(
                "http://localhost:11434/api/generate", Map.of(
                        "model", "mistral",
                        "prompt", prompt,
                        "stream", false
                ),
                String.class
        );

        String body = response.getBody();
        if (body == null) return "No response from AI service.";

        try {
            JsonNode json = new ObjectMapper().readTree(body);
            return json.has("response") ? json.get("response").asText() : body;
        } catch (Exception e) {
            return "Error parsing AI response: " + e.getMessage();
        }
    }
}