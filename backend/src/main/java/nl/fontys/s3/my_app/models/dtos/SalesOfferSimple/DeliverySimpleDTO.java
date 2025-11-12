package nl.fontys.s3.my_app.models.dtos.SalesOfferSimple;

public class DeliverySimpleDTO {
    private String incoterm;
    private String destinationCountryCode;

    public DeliverySimpleDTO() {
    }

    public DeliverySimpleDTO(String incoterm, String destinationCountryCode) {
        this.incoterm = incoterm;
        this.destinationCountryCode = destinationCountryCode;
    }

    public String getIncoterm() {
        return incoterm;
    }
    public void setIncoterm(String incoterm) {
        this.incoterm = incoterm;
    }
    public String getDestinationCountryCode() {
        return destinationCountryCode;
    }
    public void setDestinationCountryCode(String destinationCountryCode) {
        this.destinationCountryCode = destinationCountryCode;
    }
    
}
