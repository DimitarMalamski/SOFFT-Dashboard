package nl.fontys.s3.my_app.Services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import nl.fontys.s3.my_app.models.dtos.SalesOffer.SalesOfferDTO;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class AIService {

    private final RestTemplate restTemplate = new RestTemplate();
    private final SalesOfferService salesOfferService;
    private final ObjectMapper mapper;

    public AIService(SalesOfferService salesOfferService, ObjectMapper mapper) {
        this.salesOfferService = salesOfferService;
        this.mapper = mapper;
    }

    public List<SalesOfferDTO> fetchData(int daysBack) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime start = now.minusDays(daysBack);
        return salesOfferService.getSalesOffersBetween(start, now);
    }

    public String generateInsight() {

        List<SalesOfferDTO> dtos = fetchData(14);

        log.info("Fetched {} sales offers from DB", dtos.size());
        dtos.forEach(dto -> log.info("DTO: {}", dto));

        String dataJson = "";
        try {
            dataJson = mapper.writeValueAsString(dtos);
        } catch (Exception e) {
            e.printStackTrace();
        }

        log.info("FINAL JSON SENT TO AI: {}", dataJson);

        String prompt = """
            You are an AI agent used in a project created for BAS World company.
            Your role is to generate useful insights in text format for the salesman dashboard.
            You will be provided with historical sales data (past 30 days) in JSON format.
            Based on this data, provide a concise, actionable insight highlighting:
            - trends,
            - anomalies,
            - missing values,
            - opportunities to improve sales strategies.
            Keep the response under 500 words. Use only the provided data. Do not invent any entries. If some fields are missing, state them explicitly.
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