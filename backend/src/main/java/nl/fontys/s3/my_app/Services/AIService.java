package nl.fontys.s3.my_app.Services;

import lombok.extern.slf4j.Slf4j;
import nl.fontys.s3.my_app.models.dtos.AI.ChatMessageRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import nl.fontys.s3.my_app.models.dtos.SalesOffer.SalesOfferDTO;

import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class AIService {

    private final RestTemplate restTemplate = new RestTemplate();
    private final SalesOfferService salesOfferService;
    private final DataAggregationService dataAggregationService;
    private final ObjectMapper mapper;

    @Value("${ai.ollama.url}")
    private String ollamaUrl;

    public AIService(SalesOfferService salesOfferService, DataAggregationService dataAggregationService, ObjectMapper mapper) {
        this.salesOfferService = salesOfferService;
        this.dataAggregationService = dataAggregationService;
        this.mapper = mapper;
    }

    // private List<SalesOfferDTO> fetchData(int daysBack) {
    //     LocalDateTime now = LocalDateTime.now();
    //     LocalDateTime start = now.minusDays(daysBack);
    //     return salesOfferService.getSalesOffersBetween(start, now);
    // }

    private List<SalesOfferDTO> fetchData(int daysBack) {
        return salesOfferService.getAllSalesOffersDTO().stream().limit(daysBack).toList();
    }

    private Map<String, Object> aggregate(List<SalesOfferDTO> salesOffers) {
        return dataAggregationService.aggregate(salesOffers);
    }

    public String generateInsight() {
        List<SalesOfferDTO> raw = fetchData(50);
        Map<String, Object> aggregatedData = aggregate(raw);

        String dataJson = "";
        try {
            dataJson = mapper.writeValueAsString(aggregatedData);
        } catch (Exception e) {
            e.printStackTrace();
        }

        log.info("FINAL JSON SENT TO AI: {}", dataJson);

        String prompt = """
            You are an AI analyst for BAS World.
            The following JSON contains aggregated sales KPIs
            (for the last 50 days). Using this data ONLY, produce
            a concise insight (max 300 words) covering:

            - trends,
            - anomalies,
            - conversion patterns,
            - opportunities to improve sales,
            - country and salesman performance.

            Do NOT invent data. Do NOT shorten or limit your insights to any smaller period. Only describe patterns you see.

            DATA:
            %s
            """.formatted(dataJson);

        ResponseEntity<String> response = restTemplate.postForEntity(
                ollamaUrl + "/api/generate",
                Map.of("model", "mistral",
                        "prompt", prompt,
                        "stream", false,
                        "options", Map.of("num_ctx", 23000)
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

    public String sendMessage(ChatMessageRequest request) {

        List<SalesOfferDTO> raw = fetchData(50);
        Map<String, Object> aggregatedData = aggregate(raw);

        String rawJson = "";
        try {
            rawJson = mapper.writeValueAsString(aggregatedData);
        } catch (Exception e) {
            e.printStackTrace();
        }

        log.info("Aggregated data: {}", aggregatedData);
        log.info("RawJson: {}", rawJson);

        String prompt = """
            You are an AI sales analyst for BAS World.
            
            User asks:
            "%s"
            
            Use ONLY the aggregated JSON data below to answer.
            Do NOT invent data. If the answer requires unavailable information, say so briefly.
            
            DATA:
            %s
            """.formatted(request.getMessage(), rawJson);

        ResponseEntity<String> response = restTemplate.postForEntity(
                ollamaUrl + "/api/generate",
                Map.of("model", "mistral",
                        "prompt", prompt,
                        "stream", false,
                        "options", Map.of("num_ctx", 23000)
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