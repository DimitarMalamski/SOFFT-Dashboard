package nl.fontys.s3.my_app.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.math.BigDecimal;

@Entity
@Table(name = "delivery", schema = "dbo")
public class Delivery {

    @Id
    @Column(name = "uuid", nullable = false, columnDefinition = "char(36)")
    private String uuid;

    @Column(name = "incoterm", length = 16)
    private String incoterm;

    @Column(name = "transport_days")
    private Integer transportDays;

    @Column(name = "original_price", precision = 14, scale = 2)
    private BigDecimal originalPrice;

    @Column(name = "price", precision = 14, scale = 2)
    private BigDecimal price;

    @Column(name = "destination_country_code", length = 4)
    private String destinationCountryCode;

    @Column(name = "is_custom_address")
    private Boolean isCustomAddress;

    @Column(name = "from_address_uuid", columnDefinition = "char(36)")
    private String fromAddressUuid;

    @Column(name = "to_address_uuid", columnDefinition = "char(36)")
    private String toAddressUuid;

    @Column(name = "shipping_loading_country_code", length = 4)
    private String shippingLoadingCountryCode;

    @Column(name = "shipping_loading_city", length = 128)
    private String shippingLoadingCity;

    @Column(name = "shipping_loading_street", length = 255)
    private String shippingLoadingStreet;

    @Column(name = "shipping_loading_zip_code", length = 32)
    private String shippingLoadingZipCode;

    @Column(name = "shipping_dest_country_code", length = 4)
    private String shippingDestCountryCode;

    @Column(name = "shipping_dest_city", length = 128)
    private String shippingDestCity;

    @Column(name = "shipping_dest_street", length = 255)
    private String shippingDestStreet;

    @Column(name = "shipping_dest_zip_code", length = 32)
    private String shippingDestZipCode;

    // Getters and Setters
    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public String getIncoterm() {
        return incoterm;
    }

    public void setIncoterm(String incoterm) {
        this.incoterm = incoterm;
    }

    public Integer getTransportDays() {
        return transportDays;
    }

    public void setTransportDays(Integer transportDays) {
        this.transportDays = transportDays;
    }

    public BigDecimal getOriginalPrice() {
        return originalPrice;
    }

    public void setOriginalPrice(BigDecimal originalPrice) {
        this.originalPrice = originalPrice;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getDestinationCountryCode() {
        return destinationCountryCode;
    }

    public void setDestinationCountryCode(String destinationCountryCode) {
        this.destinationCountryCode = destinationCountryCode;
    }

    public Boolean getIsCustomAddress() {
        return isCustomAddress;
    }

    public void setIsCustomAddress(Boolean isCustomAddress) {
        this.isCustomAddress = isCustomAddress;
    }

    public String getFromAddressUuid() {
        return fromAddressUuid;
    }

    public void setFromAddressUuid(String fromAddressUuid) {
        this.fromAddressUuid = fromAddressUuid;
    }

    public String getToAddressUuid() {
        return toAddressUuid;
    }

    public void setToAddressUuid(String toAddressUuid) {
        this.toAddressUuid = toAddressUuid;
    }

    public String getShippingLoadingCountryCode() {
        return shippingLoadingCountryCode;
    }

    public void setShippingLoadingCountryCode(String shippingLoadingCountryCode) {
        this.shippingLoadingCountryCode = shippingLoadingCountryCode;
    }

    public String getShippingLoadingCity() {
        return shippingLoadingCity;
    }

    public void setShippingLoadingCity(String shippingLoadingCity) {
        this.shippingLoadingCity = shippingLoadingCity;
    }

    public String getShippingLoadingStreet() {
        return shippingLoadingStreet;
    }

    public void setShippingLoadingStreet(String shippingLoadingStreet) {
        this.shippingLoadingStreet = shippingLoadingStreet;
    }

    public String getShippingLoadingZipCode() {
        return shippingLoadingZipCode;
    }

    public void setShippingLoadingZipCode(String shippingLoadingZipCode) {
        this.shippingLoadingZipCode = shippingLoadingZipCode;
    }

    public String getShippingDestCountryCode() {
        return shippingDestCountryCode;
    }

    public void setShippingDestCountryCode(String shippingDestCountryCode) {
        this.shippingDestCountryCode = shippingDestCountryCode;
    }

    public String getShippingDestCity() {
        return shippingDestCity;
    }

    public void setShippingDestCity(String shippingDestCity) {
        this.shippingDestCity = shippingDestCity;
    }

    public String getShippingDestStreet() {
        return shippingDestStreet;
    }

    public void setShippingDestStreet(String shippingDestStreet) {
        this.shippingDestStreet = shippingDestStreet;
    }

    public String getShippingDestZipCode() {
        return shippingDestZipCode;
    }

    public void setShippingDestZipCode(String shippingDestZipCode) {
        this.shippingDestZipCode = shippingDestZipCode;
    }
}
