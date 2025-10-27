package nl.fontys.s3.my_app.models.dtos.SalesOffer;

import nl.fontys.s3.my_app.models.Address;

public class AddressDTO {
    private String uuid;
    private String countryCode;
    private String city;
    private String zipCode;
    private String street;
    private String area;

    public AddressDTO(Address address) {
        this.uuid = address.getUuid();
        this.countryCode = address.getCountryCode();
        this.city = address.getCity();
        this.zipCode = address.getZipCode();
        this.street = address.getStreet();
        this.area = address.getArea();
    }

    public AddressDTO() {
    }

    public String getUuid() { return uuid; }
    public void setUuid(String uuid) { this.uuid = uuid; }

    public String getCountryCode() { return countryCode; }
    public void setCountryCode(String countryCode) { this.countryCode = countryCode; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getZipCode() { return zipCode; }
    public void setZipCode(String zipCode) { this.zipCode = zipCode; }

    public String getStreet() { return street; }
    public void setStreet(String street) { this.street = street; }

    public String getArea() { return area; }
    public void setArea(String area) { this.area = area; }
}
