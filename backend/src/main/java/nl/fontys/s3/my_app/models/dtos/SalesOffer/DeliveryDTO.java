package nl.fontys.s3.my_app.models.dtos.SalesOffer;

import com.fasterxml.jackson.annotation.JsonProperty;

import nl.fontys.s3.my_app.models.Delivery;

import java.math.BigDecimal;

public class DeliveryDTO {
    private String uuid;
    private AddressDTO fromAddress;
    private AddressDTO toAddress;
    private String incoterm;
    private int transportDays;
    private BigDecimal originalPrice;
    private BigDecimal price;
    private String destinationCountryCode;

    public DeliveryDTO() {
    }

    public DeliveryDTO(Delivery delivery, AddressDTO fromAddress, AddressDTO toAddress, boolean isCustomAddress) {
        this.uuid = delivery.getUuid();
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.incoterm = delivery.getIncoterm();
        this.transportDays = delivery.getTransportDays();
        this.originalPrice = delivery.getOriginalPrice();
        this.price = delivery.getPrice();
        this.destinationCountryCode = delivery.getDestinationCountryCode();
        this.customAddress = isCustomAddress;
    }

    @JsonProperty("isCustomAddress")
    private boolean customAddress;

    public String getUuid() { return uuid; }
    public void setUuid(String uuid) { this.uuid = uuid; }

    public AddressDTO getFromAddress() { return fromAddress; }
    public void setFromAddress(AddressDTO fromAddress) { this.fromAddress = fromAddress; }

    public AddressDTO getToAddress() { return toAddress; }
    public void setToAddress(AddressDTO toAddress) { this.toAddress = toAddress; }

    public String getIncoterm() { return incoterm; }
    public void setIncoterm(String incoterm) { this.incoterm = incoterm; }

    public int getTransportDays() { return transportDays; }
    public void setTransportDays(int transportDays) { this.transportDays = transportDays; }

    public BigDecimal getOriginalPrice() { return originalPrice; }
    public void setOriginalPrice(BigDecimal originalPrice) { this.originalPrice = originalPrice; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public String getDestinationCountryCode() { return destinationCountryCode; }
    public void setDestinationCountryCode(String destinationCountryCode) { this.destinationCountryCode = destinationCountryCode; }

    public boolean isCustomAddress() { return customAddress; }
    public void setCustomAddress(boolean customAddress) { this.customAddress = customAddress; }
}
