package nl.fontys.s3.my_app.models.dtos.SalesOffer;

import com.fasterxml.jackson.annotation.JsonProperty;

public class AddressShortDTO {
    private String uuid;
    private String countryCode;
    private String city;
    private String street; // may be null
    private String zipCode;
    private String area;

    @JsonProperty("contact_address_id")
    private int contactAddressId;

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public String getCountryCode() {
        return countryCode;
    }

    public void setCountryCode(String countryCode) {
        this.countryCode = countryCode;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public int getContactAddressId() {
        return contactAddressId;
    }

    public void setContactAddressId(int contactAddressId) {
        this.contactAddressId = contactAddressId;
    }
}
