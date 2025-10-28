package nl.fontys.s3.my_app.models.dtos.SalesOffer;

public class SalesOffersPerCountryDTO {
    private String countryCode;
    private Long offerCount;

    public SalesOffersPerCountryDTO(String countryCode, Long offerCount) {
        this.countryCode = countryCode;
        this.offerCount = offerCount;
    }
    public String getCountryCode() {
        return countryCode;
    }
    public void setCountryCode(String countryCode) {
        this.countryCode = countryCode;
    }
    public Long getOfferCount() {
        return offerCount;
    }
    public void setOfferCount(Long offerCount) {
        this.offerCount = offerCount;
    }
}
