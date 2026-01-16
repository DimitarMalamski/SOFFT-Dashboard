package nl.fontys.s3.my_app.Services;

import nl.fontys.s3.my_app.models.dtos.AI.ChatMessageRequest;
import org.springframework.beans.factory.annotation.Value;
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
    private final DataAggregationService dataAggregationService;
    private final ObjectMapper mapper;

    public AIService(SalesOfferService salesOfferService, DataAggregationService dataAggregationService, ObjectMapper mapper) {
        this.salesOfferService = salesOfferService;
        this.dataAggregationService = dataAggregationService;
        this.mapper = mapper;
    }

    @Value("${ai.ollama.url}")
    private String ollamaUrl;

    private String cachedAgg30;
    private String cachedAgg50;
    private LocalDateTime lastComputed30 = LocalDateTime.MIN;
    private LocalDateTime lastComputed50 = LocalDateTime.MIN;

     private List<SalesOfferDTO> fetchData(int daysBack) {
         LocalDateTime now = LocalDateTime.now();
         LocalDateTime start = now.minusDays(daysBack);
         return salesOfferService.getSalesOffersBetween(start, now);
     }

//    private List<SalesOfferDTO> fetchData(int daysBack) {
//        return salesOfferService.getAllSalesOffersDTO().stream().limit(daysBack).toList();
//    }

    private Map<String, Object> aggregate(List<SalesOfferDTO> salesOffers) {
        return dataAggregationService.aggregate(salesOffers);
    }

    private String getAggregatedJson(int days) {
        if (days == 30 && lastComputed30.isAfter(LocalDateTime.now().minusMinutes(80))) {
            return cachedAgg30;
        } else if (days == 50 && lastComputed50.isAfter(LocalDateTime.now().minusMinutes(80))) {
            return cachedAgg50;
        }

        List<SalesOfferDTO> raw = fetchData(days);
        Map<String, Object> aggregated = aggregate(raw);

        if (aggregated.isEmpty()) {
            aggregated.put("info", "No sales offers in this period.");
        }

        try {
            String json = mapper.writeValueAsString(aggregated);
            if (days == 30) {
                cachedAgg30 = json;
                lastComputed30 = LocalDateTime.now();
            } else {
                cachedAgg50 = json;
                lastComputed50 = LocalDateTime.now();
            }
            return json;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private JsonNode callOllama(String endpoint, Map<String, Object> body) {
        ResponseEntity<String> response = restTemplate.postForEntity(
                ollamaUrl + endpoint,
                body,
                String.class
        );

        try {
            return mapper.readTree(response.getBody());
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse Ollama response", e);
        }
    }

    public String generateInsight() {
        String data = getAggregatedJson(50);

        String prompt = """
        You are an AI analyst for BAS World.

        The following JSON contains aggregated sales KPIs
        for the last 50 days.

        Using ONLY this data, provide:
        - trends
        - anomalies
        - conversion patterns
        - sales improvement opportunities
        - country and salesman performance

        Do NOT invent data.

        DATA:
        %s
        """.formatted(data);

        JsonNode json = callOllama(
                "/api/generate",
                Map.of(
                        "model", "mistral",
                        "prompt", prompt,
                        "stream", false,
                        "options", Map.of("num_ctx", 16000)
                )
        );

        return json.path("response").asText("No response from AI");
    }

    public String sendMessage(ChatMessageRequest request) {
        String data = getAggregatedJson(30);

        JsonNode json = callOllama(
                "/api/chat",
                Map.of(
                        "model", "mistral",
                        "messages", List.of(
                                Map.of(
                                        "role", "system",
                                        "content", """
                                        You are an AI sales analyst for BAS World.
                                        You may ONLY use the provided aggregated KPIs.
                                        If the answer is not present in the data, say so.
                                        """
                                ),
                                Map.of(
                                        "role", "user",
                                        "content", request.getMessage()
                                ),
                                Map.of(
                                        "role", "user",
                                        "content", "AGGREGATED DATA (30 DAYS):\n" + data
                                )
                        ),
                        "stream", false,
                        "options", Map.of("num_ctx", 16000)
                )
        );

        return json
                .path("message")
                .path("content")
                .asText("No response from AI");
    }
}