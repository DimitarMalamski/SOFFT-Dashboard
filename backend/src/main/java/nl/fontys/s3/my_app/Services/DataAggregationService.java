package nl.fontys.s3.my_app.Services;

import lombok.AllArgsConstructor;
import nl.fontys.s3.my_app.models.dtos.SalesOffer.SalesOfferDTO;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
public class DataAggregationService {

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

    public Map<String, Object> aggregate(List<SalesOfferDTO> raw) {
        return Map.of(
                "offersPerSalesman", offersPerSalesman(raw),
                "offersPerCountry", offersPerCountry(raw),
                "totalValueOverTime", totalValueOverTime(raw),
                "conversionStats", conversionStats(raw)
        );
    }
}