package nl.fontys.s3.my_app.Services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import nl.fontys.s3.my_app.models.dtos.SalesOffer.SalesOfferDTO;

import java.time.LocalDateTime;
import java.util.HashMap;
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

    private Map<String, Integer> offersPerSalesman(List<SalesOfferDTO> raw) {
        Map<String, Integer> map = new HashMap<>();
        for (var offer : raw) {
            if (offer.getSalesPersons() != null) {
                for (var p : offer.getSalesPersons()) {
                    if (p.getName() == null) continue;
                    String name = p.getName().trim();
                    if (name.isEmpty()) continue;
                    map.merge(name, 1, Integer::sum);
                }
            }
        }
        return map;
    }

    private Map<String, Integer> offersPerCountry(List<SalesOfferDTO> raw) {
        Map<String, Integer> map = new HashMap<>();
        for (var offer : raw) {
            try {
                String c = offer.getSalesOfferLine().get(0)
                        .getDelivery().getDestinationCountryCode();
                if (c != null && !c.isBlank()) {
                    map.merge(c.trim(), 1, Integer::sum);
                }
            } catch (Exception ignored) {}
        }
        return map;
    }

    private Map<String, Double> totalValueOverTime(List<SalesOfferDTO> raw) {
        Map<String, Double> map = new HashMap<>();
        for (var offer : raw) {
            double total = offer.getSalesOfferLine().stream()
                    .mapToDouble(l -> l.getProductPrice() != null ?
                            l.getProductPrice().getAmount().doubleValue() : 0)
                    .sum();
            String date = offer.getExpiresAt() != null ?
                    offer.getExpiresAt().toLocalDate().toString() : "Unknown";

            map.merge(date, total, Double::sum);
        }
        return map;
    }

    private Map<String, Object> conversionStats(List<SalesOfferDTO> raw) {
        int total = raw.size();
        int wins = 0;

        for (var offer : raw) {
            if (offer.getStatus() != null && offer.getStatus() == 3) {
                wins++;
            }
        }

        return Map.of(
                "totalOffers", total,
                "wins", wins,
                "conversionRate", total > 0 ? (wins * 100.0 / total) : 0
        );
    }

    public String generateInsight() {

        List<SalesOfferDTO> raw = fetchData(30);

        log.info("Fetched {} sales offers from DB", raw.size());
        raw.forEach(dto -> log.info("DTO: {}", dto));

        Map<String, Object> aggregate = Map.of(
                "offersPerSalesman", offersPerSalesman(raw),
                "offersPerCountry", offersPerCountry(raw),
                "totalValueOverTime", totalValueOverTime(raw),
                "conversionStats", conversionStats(raw)
        );

        String dataJson = "";
        try {
            dataJson = mapper.writeValueAsString(aggregate);
        } catch (Exception e) {
            e.printStackTrace();
        }

        log.info("FINAL JSON SENT TO AI: {}", dataJson);

        String prompt = """
            You are an AI analyst for BAS World.
            The following JSON contains aggregated sales KPIs 
            (for the last 30 days). Using this data ONLY, produce 
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
                "http://localhost:11434/api/generate",
                Map.of("model", "mistral", "prompt", prompt, "stream", false),
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