package nl.fontys.s3.my_app.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.UUID;

@Entity
@Table(name = "address", schema = "dbo")
public class Address {

    @Id
    @Column(name = "uuid", nullable = false, columnDefinition = "uniqueidentifier")
    private UUID uuid;

    @Column(name = "company_name", length = 255)
    private String companyName;

    @Column(name = "country_code", length = 4)
    private String countryCode;

    @Column(name = "city", length = 128)
    private String city;

    @Column(name = "street", length = 255)
    private String street;

    @Column(name = "zip_code", length = 32)
    private String zipCode;

    @Column(name = "area", length = 64)
    private String area;

    @Column(name = "contact_address_id")
    private Integer contactAddressId;

    // Getters and Setters
    public UUID getUuid() {
        return uuid;
    }

    public void setUuid(UUID uuid) {
        this.uuid = uuid;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
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

    public Integer getContactAddressId() {
        return contactAddressId;
    }

    public void setContactAddressId(Integer contactAddressId) {
        this.contactAddressId = contactAddressId;
    }
}
