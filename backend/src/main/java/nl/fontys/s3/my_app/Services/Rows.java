package nl.fontys.s3.my_app.Services;

public class Rows {
    public record OfferSalesPersonRow(String offerUuid, String salespersonUuid) {
    }

    public record OfferDepotRow(String offerUuid, Long depotId) {
    }
}
