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


    private Map<String, Integer> productTypeCount(List<SalesOfferDTO> raw) {
        Map<String, Integer> map = new HashMap<>();
        for (var offer : raw) {
            for (var line : offer.getSalesOfferLine()) {
                var p = line.getProduct();
                if (p != null && p.getProductType() != null) {
                    map.merge(p.getProductType(), 1, Integer::sum);
                }
            }
        }
        return map;
    }

    private Map<String, Integer> brandCount(List<SalesOfferDTO> raw) {
        Map<String, Integer> map = new HashMap<>();
        for (var offer : raw) {
            for (var line : offer.getSalesOfferLine()) {
                var p = line.getProduct();
                if (p != null && p.getBrand() != null) {
                    map.merge(p.getBrand(), 1, Integer::sum);
                }
            }
        }
        return map;
    }

    private double avgMileage(List<SalesOfferDTO> raw) {
        int count = 0;
        long sum = 0;
        for (var offer : raw) {
            for (var line : offer.getSalesOfferLine()) {
                var p = line.getProduct();
                if (p != null && p.getMileage() > 0) {
                    sum += p.getMileage();
                    count++;
                }
            }
        }
        return count == 0 ? 0 : (double) sum / count;
    }

    private double avgEnginePower(List<SalesOfferDTO> raw) {
        double sum = 0;
        int count = 0;
        for (var offer : raw) {
            for (var line : offer.getSalesOfferLine()) {
                var p = line.getProduct();
                if (p != null && p.getEnginePower() != null) {
                    sum += p.getEnginePower().doubleValue();
                    count++;
                }
            }
        }
        return count == 0 ? 0 : sum / count;
    }

    private double avgProductAge(List<SalesOfferDTO> raw) {
        double sum = 0;
        int count = 0;
        for (var offer : raw) {
            for (var line : offer.getSalesOfferLine()) {
                var p = line.getProduct();
                if (p != null && p.getProductionDate() != null) {
                    var years = java.time.Period.between(
                            p.getProductionDate(),
                            java.time.LocalDate.now()
                    ).getYears();
                    sum += years;
                    count++;
                }
            }
        }
        return count == 0 ? 0 : sum / count;
    }

    private double avgPrice(List<SalesOfferDTO> raw) {
        double sum = 0;
        int count = 0;
        for (var offer : raw) {
            for (var line : offer.getSalesOfferLine()) {
                var pr = line.getProductPrice();
                if (pr != null && pr.getAmount() != null) {
                    sum += pr.getAmount().doubleValue();
                    count++;
                }
            }
        }
        return count == 0 ? 0 : sum / count;
    }

    private double avgDiscount(List<SalesOfferDTO> raw) {
        double sum = 0;
        int count = 0;

        for (var offer : raw) {
            if (offer.getDiscount() != null &&
                    offer.getDiscount().getPrice() != null &&
                    offer.getDiscount().getPrice().getAmount() != null) {

                sum += offer.getDiscount().getPrice().getAmount().doubleValue();
                count++;
            }
        }
        return count == 0 ? 0 : sum / count;
    }

    private double avgDeliveryCost(List<SalesOfferDTO> raw) {
        double sum = 0;
        int count = 0;

        for (var offer : raw) {
            for (var line : offer.getSalesOfferLine()) {
                var d = line.getDelivery();
                if (d != null && d.getPrice() != null) {
                    sum += d.getPrice().doubleValue();
                    count++;
                }
            }
        }
        return count == 0 ? 0 : sum / count;
    }

    private double avgDeliveryDays(List<SalesOfferDTO> raw) {
        double sum = 0;
        int count = 0;

        for (var offer : raw) {
            for (var line : offer.getSalesOfferLine()) {
                var d = line.getDelivery();
                if (d != null && d.getTransportDays() > 0) {
                    sum += d.getTransportDays();
                    count++;
                }
            }
        }
        return count == 0 ? 0 : sum / count;
    }

    private Map<String,Integer> deliveriesPerCountry(List<SalesOfferDTO> raw) {
        Map<String,Integer> map = new HashMap<>();
        for (var offer : raw) {
            for (var line : offer.getSalesOfferLine()) {
                var d = line.getDelivery();
                if (d != null && d.getDestinationCountryCode() != null) {
                    map.merge(d.getDestinationCountryCode(), 1, Integer::sum);
                }
            }
        }
        return map;
    }

    public Map<String, Object> aggregate(List<SalesOfferDTO> raw) {
        return Map.ofEntries(
                Map.entry("offersPerSalesman", offersPerSalesman(raw)),
                Map.entry("offersPerCountry", offersPerCountry(raw)),
                Map.entry("totalValueOverTime", totalValueOverTime(raw)),
                Map.entry("conversionStats", conversionStats(raw)),
                Map.entry("productTypeCount", productTypeCount(raw)),
                Map.entry("brandCount", brandCount(raw)),
                Map.entry("avgMileage", avgMileage(raw)),
                Map.entry("avgEnginePower", avgEnginePower(raw)),
                Map.entry("avgProductAge", avgProductAge(raw)),
                Map.entry("avgPrice", avgPrice(raw)),
                Map.entry("avgDiscount", avgDiscount(raw)),
                Map.entry("avgDeliveryCost", avgDeliveryCost(raw)),
                Map.entry("avgDeliveryDays", avgDeliveryDays(raw)),
                Map.entry("deliveriesPerCountry", deliveriesPerCountry(raw))
        );
    }
}